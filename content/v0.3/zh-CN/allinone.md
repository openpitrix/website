---
title: "All-in-One 模式"
---

## 第一步: 准备环境

### 主机环境

您可以参考以下节点规格准备一台符合要求的主机节点开始 `all-in-one` 模式的部署。

| 操作系统 | 最小配置 | 推荐配置 |
| --- | --- | --- |
| Ubuntu 16.04 LTS 64bit | CPU：8 核 <br/> 内存：12 G <br/> 磁盘：40 G | CPU：16 核 <br/> 内存：32 G <br/> 磁盘：100 G |
| CentOS 7.4 64bit | CPU：8 核 <br/> 内存：12 G <br/> 磁盘：40 G | CPU：16 核 <br/> 内存：32 G <br/> 磁盘：100 G |

### 软件环境

`All-in-One` 模式需要依赖以下软件，请预先在主机中安装符合以下版本要求的软件:

| 软件需求 | 最低版本 |
| --- | --- |
| [Docker](https://docs.docker.com/install/) | 18.03.0-ce |
| [Docker-Compose](https://docs.docker.com/compose/install/) | 1.21.0 |
| [Git](https://git-scm.com/downloads) | 1.8.3 |
| [Make](https://www.gnu.org/software/make/) | 3.81 |

## 第二步: 准备 OpenPitrix 源码文件

将 GitHub 上的代码仓库克隆到本地。

```bash
$ git clone https://github.com/openpitrix/openpitrix
```

## 第三步: 部署 OpenPitrix

进入 openpitrix 目录，编译项目。

```bash
$ cd openpitrix
$ make build
$ make compose-up
```

## 第四步: 验证

1. 查看容器暴露的端口，确保 OpenPitrix 相关的镜像都已经成功创建：

```bash
$ docker container ls | grep dashboard
07d9b0e2b5bf   openpitrix/dashboard   "npm run prod:serve"   22 hours ago   Up 22 hours    0.0.0.0:8000->8000/tcp    openpitrix-dashboard
```

2. 以上显示 dashboard 对外暴露的是 8000 端口，因此可通过公网 IP 和端口访问查看 OpenPitrix 主页，如 [http://139.198.121.143:8000](http://139.198.121.143:8000) 。

> 若公网 IP 有防火墙，请在防火墙添加规则放行对应的端口，外部才能够访问。

![OpenPitrix 主页](/dashboard.png)

OpenPitrix 部署成功后，可以使用以下的管理员默认的用户名和密码登录 OpenPitrix 控制台体验，参见 [用户管理](../user-management) 创建开发者和普通用户的角色，[快速入门](../user-quick-start) 将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| passw0rd | 


3. 查看 Api Gateway 服务

```
$ docker container ls | grep openpitrix-api-gateway
d3b0a453df30    9de90f80eae9   "api-gateway"   6 days ago   Up 6 days    0.0.0.0:9100->9100/tcp   openpitrix-api-gateway
```

同样，查看 OpenPitrix API 界面，可通过公网 IP 和端口转发的方式，如 [http://139.198.121.143:9100/swagger-ui/](http://139.198.121.143:9100/swagger-ui/) 。

![swagger 页面](/swagger-kubernetes.png)


## 升级

更新代码后，可使用以下命令升级环境：

```bash
$ make compose-update
```