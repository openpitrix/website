---
title: "All-in-One 模式"
---

All-in-One 模式部署由 [Docker-Compose](https://github.com/docker/compose) 的方式启动运行项目，Compose 能够定义和运行多个 Docker 容器的应用，允许用户通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project），通过子命令可对项目中的一组容器进行便捷地生命周期管理。

## 第一步: 准备环境

### 主机环境

需要准备一台满足最小资源要求的主机节点开始 `all-in-one` 模式的部署。

|   CPU  |  Memory |  磁盘  |
|--------|---------|-------|
|  1 核  |    1 G  |  10 G |

### 软件环境

`All-in-One` 模式需要依赖以下软件，请预先在主机中安装符合以下版本要求的软件:

| 软件需求 | 最低版本 |
| --- | --- |
| [Docker](https://docs.docker.com/install/) | 18.03.0-ce |
| [Docker-Compose](https://docs.docker.com/compose/install/) | 1.21.0 |
| [Make](https://www.gnu.org/software/make/) | 3.81 |

> 说明：若主机已安装 Kubernetes 环境，可能会造成 docker 容器之间网络不通。

## 第二步: 准备 OpenPitrix 安装包

1. 可通过 wget 命令从 GitHub 指定的 URL 下载指定版本的安装文件。

>以下载 v0.3.1 的安装包为例，若希望下载其它版本的安装包和源代码，查看 [OpenPitrix Releases](https://github.com/openpitrix/openpitrix/releases/)。

```bash
$ wget  https://github.com/openpitrix/openpitrix/releases/download/v0.3.1/openpitrix-v0.3.1-docker-compose.tar.gz
```
2. 解压安装包：

```bash
$ tar -zxf openpitrix-v0.3.1-docker-compose.tar.gz
```

## 第三步: 部署 OpenPitrix

进入 openpitrix 目录，编译项目。该过程需要拉取多个 OpenPitrix 的 docker 镜像，拉取镜像和安装速度与网络也有关系，需要等待几分钟。

```bash
$ cd openpitrix-v0.3.1-docker-compose/
$ make
```

## 第四步: 验证

1. 查看所有容器的运行状况，正常情况下所有容器状态应该如下所示，确保 OpenPitrix 相关的镜像都已经成功创建：

```bash
$ docker-compose ps
Name                          Command                  State                           Ports                     
--------------------------------------------------------------------------------------------------------------
openpitrix-api-gateway        api-gateway                      Up             0.0.0.0:9100->9100/tcp                        
openpitrix-app-db-ctrl        flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-app-manager        app-manager                      Up                                                           
openpitrix-category-manager   category-manager                 Up                                                           
openpitrix-cluster-db-ctrl    flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-cluster-manager    cluster-manager                  Up                                                           
openpitrix-dashboard          npm run prod:serve               Up             0.0.0.0:8000->8000/tcp                        
openpitrix-db                 docker-entrypoint.sh --low ...   Up             0.0.0.0:13306->3306/tcp                       
openpitrix-db-init            sh -c /flyway/sql/ddl/ddl_ ...   Exit 0                                                       
openpitrix-etcd               etcd --data-dir /data --li ...   Up             0.0.0.0:12379->2379/tcp, 2380/tcp             
openpitrix-iam-db-ctrl        flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-iam-service        iam-service                      Up                                                           
openpitrix-job-db-ctrl        flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-job-manager        job-manager                      Up                                                           
openpitrix-minio              sh -c mkdir -p /data/openp ...   Up (healthy)   0.0.0.0:19000->9000/tcp                       
openpitrix-pilot-service      pilot -config=/opt/openpit ...   Up             0.0.0.0:9110->9110/tcp, 0.0.0.0:9114->9114/tcp
openpitrix-repo-db-ctrl       flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-repo-indexer       repo-indexer                     Up                                                           
openpitrix-repo-manager       repo-manager                     Up                                                           
openpitrix-runtime-db-ctrl    flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-runtime-manager    runtime-manager                  Up                                                           
openpitrix-task-db-ctrl       flyway -url=jdbc:mysql://o ...   Exit 0                                                       
openpitrix-task-manager       task-manager                     Up    
```

2. 以上显示 dashboard 对外暴露的是 8000 端口，因此可通过公网 IP 和端口访问查看 OpenPitrix 主页，如 `http://139.198.121.143:8000`。

> 若公网 IP 有防火墙，请在防火墙添加规则放行对应的端口，外部才能够访问。

![OpenPitrix 主页](/dashboard.png)

OpenPitrix 部署成功后，可以使用以下的管理员默认的用户名和密码登录 OpenPitrix 控制台体验，参见 [用户管理](../../user-guide/user-management) 创建开发者和普通用户的角色，[快速入门](../../getting-start/introduction) 将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| passw0rd | 


3. 查看 Api Gateway 服务

以上显示 api-gateway 对外暴露的是 9100 端口，同样，查看 OpenPitrix API 界面，可通过公网 IP 和端口转发的方式，如 `http://139.198.121.143:9100/swagger-ui/`。

![swagger 页面](/swagger-kubernetes.png)


## 清理环境

在项目文件目录下，执行以下命令，停止并删除 OpenPitrix 所有服务。

```bash
$ docker compose-down
```
