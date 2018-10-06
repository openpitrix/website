---
title: "All-in-One 模式"
---

## 第一步: 准备环境

`All-in-One` 模式需要依赖以下软件，请预先在主机中安装符合以下版本要求的软件:

| 软件需求 | 最低版本 |
| --- | --- |
| [Docker](https://docs.docker.com/install/) | 18.03.0-ce |
| [Docker-Compose](https://docs.docker.com/compose/install/) | 1.21.0 |
| [Git](https://git-scm.com/downloads) | 1.9.1 |
| [Make](https://www.gnu.org/software/make/) | 3.81 |

## 第二步: 准备 OpenPitrix 源码文件

```bash
$ git clone https://github.com/openpitrix/openpitrix
```

## 第三步: 部署 OpenPitrix

```bash
$ cd openpitrix
$ make build
$ make compose-up
```

## 第四步: 验证

1. 查看服务情况，确保 OpenPitrix 相关的镜像都已经成功创建：

```bash
$ docker ps
```

2. 可通过公网 IP 和端口转发的方式访问查看 OpenPitrix 主页，如 [http://139.198.121.143:8000](http://139.198.121.143:8000) 。

> 若公网 IP 有防火墙，请在防火墙添加规则放行对应的端口，外部才能够访问。

![OpenPitrix 主页](/dashboard.png)

OpenPitrix 部署成功后，可以使用以下的管理员默认的用户名和密码登录 OpenPitrix 控制台体验，参见 [用户管理](../user-management) 创建开发者和普通用户的角色，[快速入门](../user-quick-start) 将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| passw0rd | 

> 说明：若以 Kubernetes 模式部署 OpenPitrix，则密码将生成在 `kubernetes/iam-config/admin-password.txt` 文件中。

3. 查看 Api Gateway 服务

```
$ kubectl get service openpitrix-api-gateway -n openpitrix-system
NAME                     TYPE       CLUSTER-IP    EXTERNAL-IP    PORT(S)          AGE
openpitrix-api-gateway   NodePort   10.96.66.66   <none>         9100:30441/TCP   5m
```

同样，查看 OpenPitrix API 界面，可通过公网 IP 和端口转发的方式，如 [http://139.198.121.143:30441/swagger-ui/](http://139.198.121.143:30441/swagger-ui/) 。

![swagger 页面](/swagger-kubernetes.png)


## 升级

更新代码后，可使用以下命令升级环境：

```bash
$ make compose-update
```