---
title: "Kubernetes 模式"
---

## 第一步: 准备环境

[Kubernetes](https://kubernetes.io/) 环境可以选用以下三种之一:

* **已有的物理机搭建或虚拟机搭建的 Kubernetes 环境**

> 注：Kubernetes 版本 >= Kubernetes 1.7.4，并需要安装 [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 工具。

* **[KubeSphere](https://kubesphere.io) 容器管理平台**

KubeSphere 是在目前主流容器调度平台 [Kubernetes](https://kubernetes.io) 之上构建的 **企业级分布式多租户容器管理平台**，为用户提供简单易用的操作界面以及向导式操作方式，KubeSphere 提供了在生产环境集群部署的全栈化容器部署与管理平台。

* **[Kubernetes on QingCloud AppCenter](https://docs.qingcloud.com/product/container/k8s)**

青云 QingCloud 提供的支持一键部署的 Kubernetes 集群环境，同时集成了 Kubesphere 容器管理平台。

> 注：网络插件请选用 calico 或 hostnic。

## 第二步: 准备 OpenPitrix 安装包

1. 下载 OpenPitrix 安装包并解压，此命令会自动下载最新版本的 OpenPitrix 在 Kubernetes 平台上的安装包：

```bash
$ curl -L https://git.io/GetOpenPitrix | sh -
``` 

2. 进入解压完成后的文件夹：

```bash
$ cd openpitrix-${OPENPITRIX_VERSION}-kubernetes/
```

## 第三步: 安装 OpenPitrix

OpenPitrix 管理的多云环境可以是 vm-based 的云平台，如 QingCloud、AWS 等，也可以是容器平台，如 Kubernetes 等。以下分两种情况说明安装步骤：

### 无需管理 vm-based 平台

如果只需要管理 Kubernetes 运行环境，可参考如下执行安装脚本，升级基础服务，启动 Dashboard 服务：

```bash
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s
```

deploy-k8s.sh 用法说明: 

```
deploy-k8s.sh [-n NAMESPACE] [-v VERSION] COMMAND
```
>  描述:
> -  -n NAMESPACE： 部署到 Kubernetes 指定的 namespace 下。
> -  -v VERSION  ： 将要部署的版本，默认是最新的稳定版。
> -  -r REQUESTS ： 部署的 container 资源 requests 大小，默认是100。
> -  -l LIMITS   ： 部署的 container 资源 limits 大小，默认是500。
> -  -b          ： 将要部署基础模块，包括数据库，etcd，OpenPitrix 基础服务。
> -  -m          ： 将要部署 Pilot 服务，用来管理多云环境。
> -  -d          ： 将要执行数据库初始化或升级操作。
> -  -s          ： 将要部署图形界面 Dashboard 服务。


### 需要管理 vm-based 平台

如果需要管理 Kubernetes 运行环境和 IaaS 运行环境，则参考如下步骤部署：

1. 执行安装脚本，升级基础服务，启动 Dashboard 服务，启动 Pilot 服务：

```
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s -m
```

2. 查看 Pilot 服务，Pilot 用于接受来自集群服务的指令和信息的组件，如创建集群等，并可以传递指令给 Frontgate，它还接收来自 Frontgate 上传上来的信息。这里看到 Pilot 服务的 9114 端口对应的 NodePort 是 30119：

```bash
$ kubectl get service openpitrix-pilot-service -n openpitrix-system
root@i-tjwio1m2:/opt/openpitrix-v0.1.9-kubernetes/kubernetes# kubectl get service openpitrix-pilot-service -n openpitrix-system
NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
openpitrix-pilot-service   NodePort   10.96.224.102   <none>        9110:31866/TCP,9114:30119/TCP   5m
```

3. 修改 etcd 中配置，同时修改 Pilot 的 IP 和 PORT，即修改 `${IP}` 和 `{PORT}` 为实际环境中的节点 IP 和端口号。IP 可以是任意 Kubernetes 节点的 IP，PORT 是上步的结果，比如是 30119 ：

```
$ kubernetes/scripts/put-global-config.sh -i ${IP} -p {PORT}
```

## 第四步: 验证

1. 查看 Dashboard 服务

```
$ kubectl get service openpitrix-dashboard -n openpitrix-system
NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
openpitrix-dashboard   NodePort   10.96.41.130   <none>        80:31879/TCP   5m
```

您可以通过浏览器，使用集群中任一节点的 IP 地址和上面命令结果的端口号访问 Dashboard 服务，如：[http://139.198.121.143:31879](http://139.198.121.143:31879)，即可进入 OpenPitrix 主页面。

![OpenPitrix 主页](/dashboard-kubernetes.png)

可通过右上角 Sign In 进入登录页面。

| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin	| passw0rd | 
| 开发者	| dev| passw0rd | 
| 普通用户 | normal| passw0rd | 


2. 查看 Api Gateway 服务
```
$ kubectl get service openpitrix-api-gateway -n openpitrix-system
NAME                     TYPE       CLUSTER-IP    EXTERNAL-IP    PORT(S)          AGE
openpitrix-api-gateway   NodePort   10.96.66.66   <none>         9100:30441/TCP   5m
```

您可以通过浏览器，使用集群中任一节点的 IP 地址和上面命令结果的端口号访问 OpenPitrix API 界面，如：http://139.198.121.143:30441/swagger-ui/。

![swagger 页面](/swagger-kubernetes.png)
    
## 升级

升级操作数据库和 Etcd 服务中已有数据会保留，无需担心数据丢失。

### 一. 无需管理 vm-based 平台

执行脚本，升级基础服务，升级 Dashboard 服务：

```bash
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s
```

### 二. 需要管理 vm-based 平台

执行脚本，升级基础服务，升级 Dashboard 服务，升级 Pilot 服务：

```
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s -m
```