---
title: "应用开发快速入门"
---

OpenPitrix 为开发者提供便捷的开发方式，基于 OpenPitrix 开发规范，通过以下开发示例即可开发一个 Wordpress 应用，支持上传到平台并部署到基于 VM 的云运行时环境，帮助开发者熟悉 OpenPitrix 应用开发的规范和流程。

## 制作镜像

WordPress 后端存储需要依赖数据库，实例使用的 MySQL 数据库，该应用需要创建 2 个 docker 镜像。

### 第一步：制作 mysql 镜像

由于需要实现配置变更及管理组件的自动升级，不能直接使用已有的 docker 镜像，需要进行一些改造，Docker 镜像默认启动的进程不能是应用本身的进程，而应该是 [supervisor](http://supervisord.org/)，由 supervisor 来启动 drone 服务。

1、将 drone 和 [nsenter](http://www.man7.org/linux/man-pages/man1/nsenter.1.html) 添加到镜像，然后安装 supervisor 并进行适当的配置。
    
* drone 是 OpenPitrix 的 Agent 服务，与 OpenPitrix 调度系统进行交互。
* nsenter 用来在 Docker 内进入 Host 执行一些指令，比如挂载硬盘、ssh 免密登录等。
* supervisor 用来为 drone 的自动升级提供支持服务。

可在制作 Docker 镜像时从 `openpitrix/openpitrix:metadata` 镜像中拷贝获取 drone 和 nsenter 这两个可执行文件以及 supervisor 相关的启动脚本：

**Dockerfile**

```dockerfile
FROM mysql:5.6

COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/drone /usr/local/bin/
COPY --from=openpitrix/openpitrix:metadata /usr/bin/nsenter /usr/bin/

RUN apt-get update && apt-get install -y supervisor
COPY --from=openpitrix/openpitrix:metadata /etc/supervisor.d/drone.ini /etc/supervisor/conf.d/drone.conf
COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/start-drone.sh /usr/local/bin/start-drone.sh

COPY start-supervisord.sh /usr/local/bin/
ENTRYPOINT ["start-supervisord.sh"]
```

其中 start-supervisord.sh 的内容如下：

```sh
#!/bin/sh

exec supervisord -n
```

2、制作 MySQL 镜像并上传到镜像仓库，请预先准备好 Docker 镜像仓库（ ${registry} 替换为您实际的镜像仓库的名字）。

```bash
$ docker build -t ${registry}/mysql .
$ docker push ${registry}/mysql
```

### 第二步：制作 Wordpress 镜像

1、创建模板文件。制作镜像需要开发一些必须的模版文件，这些文件会监听 metadata service 的变化从而更新自己应用的配置文件。这些文件后缀名为 toml 和 tmpl，其中后缀名为 toml 的文件位于 `/etc/confd/conf.d/` 目录下，后缀名为 tmpl 的文件位于 `/etc/confd/templates/` 目录下。


**conf.d/mysql_hostname.toml**

```toml
[template]
src = "mysql_hostname.tmpl"
dest = "/opt/openpitrix/conf/mysql_hostname"
keys = [
   "/",
]
```

> 说明：toml 文件中, src 代表模版文件名，dest 即应用的配置文件，这个配置文件会根据 src 模版刷新 dest 内容，keys 即进程 confd 监控青云 metadata service 关于该节点所在集群信息的更新，有变化则更新，如果模版中需要用到某个 key 的信息，则需要监听这个 key，也可以直接监听根目录”/”。reload_cmd 则是配置文件被刷新后的操作，脚本开发者自行提供脚本，如果不需要触发动作可以去掉 reload_cmd 这一行。toml 文件里可加上权限控制 比如 uid，gid，mode 等。


**templates/mysql_hostname.tmpl**

```tmpl
{{range $dir := lsdir "/hosts/Mysql/"}}{{$ip := printf "/hosts/Mysql/%s/ip" $dir}}{{getv $ip}}{{end}}
```
说明：tmpl 模版文件决定应用配置文件内容。drone 读取 metadata service 并刷新这些变量的值，如此例 range 这一行是读取 Mysql 节点的 IP 信息。了解更多参见 [libconfd](https://github.com/openpitrix/libconfd)。

2、新建目录，并将上一步准备的两个模板文件拷贝到 `/etc/confd/` 目录下。然后，可在制作 Docker 镜像时从 `openpitrix/openpitrix:metadata` 镜像中拷贝获取 drone 和 nsenter 可执行文件以及 supervisor 相关的启动脚本：

**Dockerfile**

```dockerfile
FROM wordpress

COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/drone /usr/local/bin/
COPY --from=openpitrix/openpitrix:metadata /usr/bin/nsenter /usr/bin/

RUN apt-get update && apt-get install -y supervisor
COPY --from=openpitrix/openpitrix:metadata /etc/supervisor.d/drone.ini /etc/supervisor/conf.d/drone.conf
COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/start-drone.sh /usr/local/bin/start-drone.sh

COPY start-supervisord.sh /usr/local/bin/
ENTRYPOINT ["start-supervisord.sh"]

RUN mkdir -p /etc/confd/conf.d/
RUN mkdir -p /etc/confd/templates/
COPY conf.d/* /etc/confd/conf.d/
COPY templates/* /etc/confd/templates/
```

3、制作 Wordpress 镜像并上传到镜像仓库，请预先准备好 Docker 镜像仓库（ ${registry} 替换为您实际的镜像仓库的名字）。

```bash
$ docker build -t ${registry}/wordpress .
$ docker push ${registry}/wordpress
```

## 准备应用配置包

### 第一步：准备 OpenPitrix 客户端工具

以下命令默认下载最新的客户端工具，拷贝文件到指定的 bin 目录。以 v0.2.3 为例，执行命令时应替换为实际的下载版本号：

```bash
$ curl -L https://git.io/GetOpenPitrixBin | sh -
$ cd openpitrix-v0.2.3-bin/
$ cp * /usr/local/bin/
```

### 第二步：创建应用目录

```bash
$ mkdir Wordpress
```

### 第三步：准备配置文件

其中 cluster.json.tmpl，config.json，package.json 这三个配置文件是必须的，详见 [开发模板规范](../openpitrix-specification)。

**Wordpress/cluster.json.tmpl**

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

**Wordpress/config.json**

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

**Wordpress/package.json**

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

### 第四步：打包应用

回到 Wordpress 上级目录，执行打包命令：

```
$ op package Wordpress
Successfully packaged app and saved it to: /root/test/Wordpress-0.1.0.tgz

$ ls
Wordpress  Wordpress-0.1.0.tgz
```

打包后，可以看到将生成一个 Wordpress-0.1.0.tgz 配置包，然后将该配置包上传到 OpenPitrix 平台，参见 [开发者 - 上传应用](../ISV-quick-start/#第二步：上传应用)。

