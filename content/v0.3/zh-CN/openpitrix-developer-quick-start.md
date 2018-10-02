---
title: "应用开发快速入门"
---

OpenPitrix 提供便捷的开发方式，通过以下四步即可开发一个可以部署到基于 VM 的云运行时环境的应用。

## 一. 准备映像

开发应用首先需要将应用程序与该程序的依赖打包成映像，目前 OpenPitrix 支持 Docker 映像。

### 制作 Docker 映像

由于需要实现配置变更，不能直接使用已有的 docker 映像，需要进行一些改造，docker 映像默认启动的进程不能是应用本身的进程，而应该是 drone，由 drone 启动服务，并实现配置变更。

1. 将 drone 和 [nsenter](http://www.man7.org/linux/man-pages/man1/nsenter.1.html) 添加到映像
    
    * drone 是 OpenPitrix 的 Agent 服务，与 OpenPitrix 调度系统进行交互
    * nsenter 用来在 Docker 内进入 Host 执行一些指令，比如挂载硬盘、ssh 免密登录等

    可在制作 Docker 映像时从 openpitrix/openpitrix:metadata 映像中拷贝获取这两个可执行文件：

    ```bash
    $ COPY --from=openpitrix/openpitrix:metadata /usr/local/bin/drone /usr/local/bin/
    $ COPY --from=openpitrix/openpitrix:metadata /usr/bin/nsenter /usr/bin/
    ```

2. 将应用以及应用依赖的基础包添加到映像

    根据实际情况进行安装

3. 创建模板文件

    开发一些必须的模版文件，这些文件会监听 metadata service 的变化从而更新自己应用的配置文件。这些文件后缀名为 toml 和 tmpl，其中后缀名为 toml 的文件位于 /etc/confd/conf.d/ 目录下，后缀名为 tmpl 的文件位于 /etc/confd/templates/ 目录下。样例：
    
    **/etc/confd/conf.d/zoo.cfg.toml**
    
    ```toml
    [template]
    src = "zoo.cfg.tmpl"
    dest = "/opt/zookeeper/conf/zoo.cfg"
    keys = [
      "/",
    ]
    reload_cmd = "/opt/zookeeper/bin/restart-server.sh"
    ```
    
    toml 文件中 src 代表模版文件名，dest 即应用的配置文件，这个配置文件会根据 src 模版刷新 dest 内容，keys 即进程 confd 监控青云 metadata service 关于该节点所在集群信息的更新，有变化则更新，如果模版中需要用到某个 key 的信息，则需要监听这个 key，也可以直接监听根目录”/”。reload_cmd 则是配置文件被刷新后的操作，脚本开发者自行提供脚本，如果不需要触发动作可以去掉 reload_cmd 这一行。toml 文件里可加上权限控制 比如 uid，gid，mode 等。
    
    **/etc/confd/templates/zoo.cfg.tmpl**
    
    ```tmpl
    tickTime=2000
    initLimit=1ini0
    syncLimit=5
    dataDir=/zk_data/zookeeper
    clientPort=2181
    maxClientCnxns=1000
    {{range $instance := lsdir "/hosts/node"}}{{$sid := printf "/hosts/node/%s/sid" $instance}}{{$ip := printf "/hosts/node/%s/ip" $instance}}server.{{getv $sid}}={{getv $ip}}:2888:3888{{end}}
    ```
    
    tmpl 模版文件决定应用配置文件内容。drone 读取 metadata service 刷新这些变量的值，如此例 range 这一行是读取该节点所在集群节点的 IP 和 server ID 信息，然后刷新为如下信息：
    
    ```text
    server.1=192.168.100.2:2888:3888
    server.2=192.168.100.3:2888:3888
    server.3=192.168.100.4:2888:3888
    ```
    
    了解更多参见 [libconfd](https://github.com/openpitrix/libconfd)

## 二. 准备应用仓库

应用仓库用于存放开发好的应用配置包以及索引文件 `index.yaml`，步骤请参考[仓库创建](../repo-guide)

## 三. 准备应用配置包

应用配置包是一组根据应用开发模版规范描述应用实例的文件组成，描述内容包括应用实例基础架构、生命周期及监控告警等，比如说创建应用实例时需要的参数，每个参数的可选项，以及各个节点的映像等。详情请参看 [应用规范](../openpitrix-specification)

## 四. 上传及生成应用

具体步骤参看 [OpenPitrix 应用开发](../openpitrix-repo)

## WordPress 实战

WordPress 是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。在本指南中，会向开发者展示一个 Wordpress 应用的开发实例。

### 制作映像

WordPress 后端存储需要依赖数据库，实例使用的 MySQL 数据库，该应用需要创建2个 docker 映像

#### 制作 mysql 映像

**Dockerfile**

```dockerfile
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

#### 制作 wordpress 映像

准备 wordpress 映像所需要的配置文件，这些文件会监听 metadata service 的变化从而更新自己应用的配置文件。这些文件后缀名为 toml 和 tmpl。

**conf.d/mysql_hostname.toml**

```toml
[template]
src = "mysql_hostname.tmpl"
dest = "/opt/openpitrix/conf/mysql_hostname"
keys = [
   "/",
]
```

**templates/mysql_hostname.tmpl**

```tmpl
{{range $dir := lsdir "/hosts/Mysql/"}}{{$ip := printf "/hosts/Mysql/%s/ip" $dir}}{{getv $ip}}{{end}}
```

**Dockerfile**

```dockerfile
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

### 准备应用配置包

#### 准备 OpenPitrix 客户端工具

```bash
$ curl -L https://git.io/GetOpenPitrixBin | sh -
$ cd openpitrix-${OPENPITRIX_VERSION}-bin/
$ cp * /usr/local/bin/
```

#### 创建应用目录

```bash
$ mkdir Wordpress
```

#### 准备配置文件

其中 cluster.json.tmpl，config.json，package.json 这三个配置文件是必须的

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

#### 上传及生成应用

具体步骤参看 [OpenPitrix 应用开发](../openpitrix-repo)