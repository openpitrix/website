---
title: "开发实例"
---

WordPress 是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。在本指南中，会向开发者展示一个 Wordpress 应用的开发实例。

## 制作映像

WordPress 后端存储需要依赖数据库，实例使用的 MySQL 数据库，该应用需要创建2个 docker 映像

### 制作 mysql 映像

mysql 映像 Dockerfile 内容

```text
FROM mysql:5.6

COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/drone /usr/local/bin/
COPY --from=openpitrix/openpitrix:metadata /usr/bin/nsenter /usr/bin/
```

> 由于应用实例主机需要和 OpenPitrix 调度系统进行通信，所以在主机内需要安装 drone 和 nsenter 两个可执行文件

制作 mysql 映像并上传

```bash
docker build -t ${registry}/mysql .
docker push ${registry}/mysql
```

### 制作 wordpress 映像

准备 wordpress 映像所需要的配置文件，这些文件会监听 metadata service 的变化从而更新自己应用的配置文件。这些文件后缀名为 toml 和 tmpl。

toml 文件中 src 代表模版文件名，dest 即应用的配置文件，这个配置文件会根据 src 模版刷新 dest 内容，keys 即进程 confd 监控青云 metadata service 关于该节点所在集群信息的更新，有变化则更新，如果模版中需要用到某个 key 的信息，则需要监听这个 key，也可以直接监听根目录”/”。reload_cmd 则是配置文件被刷新后的操作，脚本开发者自行提供脚本，如果不需要触发动作可以去掉 reload_cmd 这一行。toml 文件里可加上权限控制 比如 uid，gid，mode 等。

tmpl 模版文件决定应用配置文件内容。

```bash
$ cat conf.d/mysql_hostname.toml 
[template]
src = "mysql_hostname.tmpl"
dest = "/opt/openpitrix/conf/mysql_hostname"
keys = [
   "/",
]
$ cat templates/mysql_hostname.tmpl 
{{range $dir := lsdir "/hosts/Mysql/"}}{{$ip := printf "/hosts/Mysql/%s/ip" $dir}}{{getv $ip}}{{end}}
```

wordpress 映像 Dockerfile 内容

```text
FROM wordpress

RUN mkdir -p /etc/confd/conf.d/
RUN mkdir -p /etc/confd/templates/
COPY conf.d/* /etc/confd/conf.d/
COPY templates/* /etc/confd/templates/

COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/drone /usr/local/bin/
COPY --from=openpitrix/openpitrix:metadata /usr/bin/nsenter /usr/bin/nsenter
```

制作 wordpress 映像并上传
```bash
docker build -t ${registry}/wordpress .
docker push ${registry}/wordpress
```

## 准备应用配置包

### 准备 OpenPitrix 客户端工具

```bash
$ curl -L https://git.io/GetOpenPitrixBin | sh -
$ cd openpitrix-${OPENPITRIX_VERSION}-bin/
$ cp * /usr/local/bin/
```

### 创建应用目录

```bash
$ mkdir Wordpress
```

其中 cluster.json.tmpl，config.json，package.json 这三个配置文件是必须的

### Wordpress/cluster.json.tmpl 文件内容

```tmpl
{
    "name": "{{.cluster.name}}",
    "description": "{{.cluster.description}}",
    "subnet": "{{.cluster.subnet}}",
    "nodes": [
        {
            "role": "Mysql",
            "container": {
                "type": "docker",
                "image": "${registry}/mysql"
            },
            "count": 1,
            "cpu": "{{.cluster.Mysql.cpu}}",
            "memory": "{{.cluster.Mysql.memory}}",
            "services": {
                "start": {
                    "cmd": "MYSQL_ROOT_PASSWORD=wordpress MYSQL_ROOT_HOST=% docker-entrypoint.sh mysqld & sleep 10"
                }
            }
        },
        {
            "role": "Wordpress",
            "container": {
                "type": "docker",
                "image": "${registry}/wordpress"
            },
            "count": 1,
            "cpu": "{{.cluster.Wordpress.cpu}}",
            "memory": "{{.cluster.Wordpress.memory}}",
            "services": {
                "start": {
                    "order": 1,
                    "cmd": "WORDPRESS_DB_PASSWORD=wordpress WORDPRESS_DB_HOST=`cat /opt/openpitrix/conf/mysql_hostname` docker-entrypoint.sh apache2-foreground & sleep 10"
                }
            }
        }
    ]
}
```

### Wordpress/config.json 文件内容

```json
{
    "type": "array",
    "properties": [
        {
            "key": "cluster",
            "description": "WORDPRESS properties",
            "type": "array",
            "properties": [
                {
                    "key": "name",
                    "label": "name",
                    "description": "The name of the WORDPRESS service",
                    "type": "string",
                    "default": "Wordpress",
                    "required": false
                },
                {
                    "key": "description",
                    "label": "description",
                    "description": "The description of the WORDPRESS service",
                    "type": "string",
                    "default": "",
                    "required": false
                },
                {
                    "key": "subnet",
                    "label": "Subnet",
                    "description": "Choose a subnet to join",
                    "type": "string",
                    "default": "",
                    "required": true
                },
                {
                    "key": "Mysql",
                    "label": "Mysql",
                    "description": "MySql properties",
                    "type": "array",
                    "properties": [
                        {
                            "key": "cpu",
                            "label": "CPU",
                            "description": "CPUs of each node",
                            "type": "integer",
                            "default": 1,
                            "range": [1,2,4,8,16],
                            "required": true
                        },
                        {
                            "key": "memory",
                            "label": "Memory",
                            "description": "memory of each node (in MB)",
                            "type": "integer",
                            "default": 2048,
                            "range": [2048,8192,16384,32768,49152],
                            "required": true
                        }
                    ]
                },
                {
                    "key": "Wordpress",
                    "label": "Wordpress",
                    "description": "Wordpress properties",
                    "type": "array",
                    "properties": [
                        {
                            "key": "cpu",
                            "label": "CPU",
                            "description": "CPUs of each node",
                            "type": "integer",
                            "default": 1,
                            "range": [1,2,4],
                            "required": true
                        },
                        {
                            "key": "memory",
                            "label": "Memory",
                            "description": "memory of each node (in MB)",
                            "type": "integer",
                            "default": 1024,
                            "range": [1024,2048,4096],
                            "required": true
                        }
                    ]
                }
            ]
        }
    ]
}
```

### Wordpress/package.json 文件内容

```json
{
  "api_version":"v1",
  "name":"Wordpress",
  "version":"0.1.0",
  "app_version":"4.9.7",
  "keywords": [
    "wordpress",
    "blog",
    "http",
    "web",
    "application",
    "php",
    "cms"
  ],
  "description":"Web publishing platform for building blogs and websites.",
  "icon": "https://openpitrix.pek3a.qingstor.com/icon/wordpress_icon.png",
  "home": "http://www.wordpress.com/", 
  "maintainers": [
    {
      "email": "openpitrix@yunify.com",
      "name": "openpitrix"
    }
  ],
  "screenshots": [
    "https://openpitrix.pek3a.qingstor.com/icon/wordpress_snapshot1.png",
    "https://openpitrix.pek3a.qingstor.com/icon/wordpress_snapshot2.png"
  ] 
}
```

### 打包

```bash
$ op package Wordpress
$ op index --url http://openpitrix.pek3a.qingstor.com/package/ .
```

> url 填写具体仓库的地址

### 上传到仓库

请参见**OpenPitrix 应用开发**文档