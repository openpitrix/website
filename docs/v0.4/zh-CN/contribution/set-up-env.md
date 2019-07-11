---
title: "搭建开发环境"
---

本文档说明如何搭建本地开发环境以及如何运行项目和查看项目页面。

## 第一步: 准备环境

### 主机环境

主机应满足以下的最小资源要求：

|   CPU  |  Memory |  磁盘  |
|--------|---------|-------|
|  1 核  |    1 G  |  10 G |

### 软件环境

搭建本地开发环境需要依赖以下软件，请预先在主机中安装符合以下版本要求的软件:

| 软件需求 | 最低版本 |
| --- | --- |
| [Docker](https://docs.docker.com/install/) | 18.03.0-ce |
| [Docker-Compose](https://docs.docker.com/compose/install/) | 1.21.0 |
| [Git](https://git-scm.com/downloads) | 1.8.3 |
| [Make](https://www.gnu.org/software/make/) | 3.81 |

## 第二步: 准备 OpenPitrix 源码文件

将 GitHub 上的代码仓库克隆到本地，将克隆 OpenPitrix 最新的代码。

```bash
$ git clone https://github.com/openpitrix/openpitrix
```

## 第三步: 运行项目

进入 openpitrix 目录，编译项目。

```bash
$ cd openpitrix
$ make build
$ make compose-up
```

## 第四步: 查看页面

1. 查看容器暴露的端口，确保 OpenPitrix 相关的镜像都已经成功创建：

```bash
$ docker container ls | grep dashboard
07d9b0e2b5bf   openpitrix/dashboard   "npm run prod:serve"   22 hours ago   Up 22 hours    0.0.0.0:8000->8000/tcp    openpitrix-dashboard
```

2. 以上显示 dashboard 对外暴露的是 8000 端口，因此可通过公网 IP 和端口访问查看 OpenPitrix 主页，如 `http://139.198.121.143:8000`。

> 若公网 IP 有防火墙，请在防火墙添加规则放行对应的端口，外部才能够访问。

![OpenPitrix 主页](/dashboard.png)

OpenPitrix 部署成功后，可以使用以下的管理员默认的用户名和密码登录 OpenPitrix 控制台体验，参见 [用户管理](../manual-guide/user-management) 创建开发者和普通用户的角色，[快速入门](../getting-start/introduction) 将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| passw0rd | 


3. 查看 Api Gateway 服务

```bash
$ docker container ls | grep openpitrix-api-gateway
d3b0a453df30    9de90f80eae9   "api-gateway"   6 days ago   Up 6 days    0.0.0.0:9100->9100/tcp   openpitrix-api-gateway
```

同样，查看 OpenPitrix API 界面，可通过公网 IP 和端口转发的方式，如 `http://139.198.121.143:9100/swagger-ui/`。

![swagger 页面](/swagger-kubernetes.png)

## 修改前端代码

### 第一步：Clone 源代码

执行以下命令，克隆 Dashboard 最新的源代码。

```bash
git clone https://github.com/openpitrix/dashboard.git
```

### 第二步：构建 Docker 镜像

修改代码完成开发后，执行以下命令构建 Docker 镜像。

```bash
docker build -t openpitrix/dashboard .
```

### 第三步：升级

更新代码后，在 openpitrix/openpitrix 项目下，可使用 make 命令升级环境：

```bash
$ make compose-update
```

## 清理环境

在项目文件目录下，执行以下命令，停止并删除 OpenPitrix 所有服务。

```bash
$ docker compose-down
```

