---
title: "Kubernetes 模式"
---

## 第一步: 准备环境

### 主机环境

您可以参考以下节点规格 准备 `至少 1 台` 符合要求的主机节点开始 `Kubernetes 模式` 的部署。

| 操作系统 | 最小配置 | 推荐配置 |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 核 <br/> 内存：12 G <br/> 磁盘：40 G | CPU：16 核 <br/> 内存：32 G <br/> 磁盘：100 G |
| CentOS 7.4 64bit | CPU：8 核 <br/> 内存：12 G <br/> 磁盘：40 G | CPU：16 核 <br/> 内存：32 G <br/> 磁盘：100 G |

### 软件环境

[Kubernetes](https://kubernetes.io/) 环境可以选用以下三种之一:

> 注意：
> 1. Kubernetes 版本 >= Kubernetes 1.7.4，并需要安装 [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 工具。
> 2. Kubernetes 集群需已安装配置好存储服务端，并创建了相应的存储类型，支持在集群中创建 PVC。可执行 `kubectl get sc` 查看存储类型。

* **[KubeSphere](https://kubesphere.io) 容器管理平台**

KubeSphere 是在目前主流容器调度平台 [Kubernetes](https://kubernetes.io) 之上构建的 **企业级分布式多租户容器管理平台**，为用户提供简单易用的操作界面以及向导式操作方式，KubeSphere 提供了在生产环境集群部署的全栈化容器部署与管理平台，且 KubeSphere 提供一键部署的方式，提供在 Kubernetes 中最优的存储和网络解决方案，帮助用户快速部署环境，参见 [KubeSphere 安装指南](https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/)。

* **[Kubernetes on QingCloud AppCenter](https://docs.qingcloud.com/product/container/k8s)**

QingCloud 提供的支持一键部署的 Kubernetes 集群环境，同时集成了 KubeSphere 容器管理平台。

> 注：网络插件请选用 Calico 或 Hostnic。

* **已有的物理机搭建或虚拟机搭建的 Kubernetes 环境**


## 第二步: 准备 OpenPitrix 安装包

1. 下载 OpenPitrix 安装包并解压，此命令会自动下载最新版本的 OpenPitrix 在 Kubernetes 运行环境上的安装包：

```bash
$ curl -L https://git.io/GetOpenPitrix | sh -
``` 

2. 进入解压完成后的文件夹，执行命令时应替换 “${version}” 为实际的下载版本号：

```bash
$ cd openpitrix-${version}-kubernetes/
```

## 第三步: 安装 OpenPitrix

OpenPitrix 管理的多云环境可以是 VM-based 的云平台，如 QingCloud、AWS 等，也可以是容器管理平台，如 Kubernetes 等。以下分两种情况说明安装步骤：

### 无需管理 VM-based 平台

如果只需要管理 Kubernetes 运行环境，参考如下执行安装脚本，升级基础服务，启动 Dashboard 服务。如果需要同时管理 Kubernetes 和 VM-based 运行环境，请跳过此步，参考 [需要管理 VM-based 平台](../kubernetes/#需要管理-vm-based-平台)。

```bash
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s -u
```

deploy-k8s.sh 用法说明: 

```
deploy-k8s.sh [-n NAMESPACE] [-v VERSION] COMMAND
```
>  描述:
> -  -n NAMESPACE   ： 部署到 Kubernetes 指定的 namespace 下。
> -  -v VERSION     ： 将要部署的版本，默认是最新的稳定版。
> -  -r REQUESTS    ： 部署的 container 资源 requests 大小，参数形式为 cpu=100,memory=200, 默认值: cpu=100,memory=100。
> -  -l LIMITS      ： 部署的 container 资源 limits 大小，参数形式为 cpu=100,memory=200, 默认值: cpu=500,memory=500。
> -  -j JOB REPLICA ： Job 服务 replica 数量。
> -  -t TASK REPLICA： Task 服务 replica 数量。
> -  -b             ： 将要部署基础模块和服务。
> -  -m             ： 将要部署 Pilot 服务，用来管理多云环境。
> -  -d             ： 将要执行数据库初始化或升级操作。
> -  -u             ： 将要部署图形界面 UI/Dashboard 服务。
> -  -s             ： 将要部署存储服务，包括 etcd 和 MySQL。
> -  -a             ： 将要部署以上所有的模块和服务。

### 需要管理 VM-based 平台

如果需要同时管理 Kubernetes 和 VM-based 运行环境，则参考如下步骤部署：

1. 执行安装脚本，升级基础服务，启动 Dashboard 服务，启动 Pilot 服务：

```
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -a
```

2. 查看 Pilot 服务，Pilot 用于接受来自集群服务的指令和信息的组件，如创建集群等，并可以传递指令给 Frontgate，它还接收来自 Frontgate 上传上来的信息。以下可以看到两个端口，依次是 https 和 http 协议的端口，Pilot 服务 http 协议的 9114 端口对应的端口是 30119，因此 Pilot 服务的端口需要暴露给外部访问（可能需要端口转发和防火墙放行该端口）：

```bash
$ kubectl get service openpitrix-pilot-service -n openpitrix-system
root@i-tjwio1m2:/opt/openpitrix-v0.1.9-kubernetes/kubernetes# kubectl get service openpitrix-pilot-service -n openpitrix-system
NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
openpitrix-pilot-service   NodePort   10.96.224.102   <none>        9110:31866/TCP, 9114:30119/TCP   5m
```

3. 执行以下命令修改 etcd 中配置，同时修改 Pilot 的 IP 和 PORT。由于 Pilot 是需要公网访问，所以需要保证在外网能访问上述的 Pilot 服务，然后通过下面的命令修改 `${EIP}` 和 `{PORT}`，即外网通过 `${EIP}:${PORT}` 访问 (如通过端口转发的方式) 到集群任意一节点的 Pilot 服务的 NodePort，如上述 30119：

```
$ kubernetes/scripts/put-global-config.sh -n openpitrix-system -i ${EIP} -p {PORT}
```

## 第四步: 验证

1. 查看 Pods 的状态，如下图所示表示 Pods 状态正常。
 ```
 $ kubectl get pods -n openpitrix-system
 NAME                                                      READY     STATUS      RESTARTS   AGE
 openpitrix-api-gateway-deployment-99fc6b46f-qj885         1/1       Running     0          12m
 openpitrix-app-db-ctrl-job-2rd22                          0/1       Completed   0          12m
 openpitrix-app-manager-deployment-577dc77dd-ksp6s         1/1       Running     0          12m
 openpitrix-category-manager-deployment-799c45c777-r7qpm   1/1       Running     0          12m
 openpitrix-cluster-db-ctrl-job-vsczz                      0/1       Completed   1          12m
 openpitrix-cluster-manager-deployment-5c776bcfd9-spvmt    1/1       Running     0          12m
 openpitrix-dashboard-deployment-7477795dd6-fb5d2          1/1       Running     0          12m
 openpitrix-db-deployment-68b6dcf746-7f2kn                 1/1       Running     0          12m
 openpitrix-db-init-job-7gc8c                              0/1       Completed   0          12m
 openpitrix-etcd-deployment-68c98bfff8-x8pgp               1/1       Running     0          12m
 openpitrix-iam-db-ctrl-job-pk6zm                          0/1       Completed   0          12m
 openpitrix-iam-service-deployment-7b8c65dcfb-bhxcg        1/1       Running     2          12m
 openpitrix-job-db-ctrl-job-4mv26                          0/1       Completed   0          12m
 openpitrix-job-manager-deployment-54c5595f8d-kpcg2        1/1       Running     0          12m
 openpitrix-minio-deployment-57bff9dd9-l8djn               1/1       Running     0          12m
 openpitrix-repo-db-ctrl-job-kgghr                         0/1       Completed   0          12m
 openpitrix-repo-indexer-deployment-6885f6597c-j6l89       1/1       Running     0          12m
 openpitrix-repo-manager-deployment-79cbd56746-5n697       1/1       Running     0          12m
 openpitrix-runtime-db-ctrl-job-8m9kv                      0/1       Completed   0          12m
 openpitrix-runtime-manager-deployment-6c674966bd-4kz8g    1/1       Running     0          12m
 openpitrix-task-db-ctrl-job-cxlwt                         0/1       Completed   0          12m
 openpitrix-task-manager-deployment-867ccb7559-8ldpd       1/1       Running     0          12m
 ```

2. 查看 Dashboard 服务

```
$ kubectl get service openpitrix-dashboard -n openpitrix-system
NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
openpitrix-dashboard   NodePort   10.96.41.130   <none>        80:31879/TCP   5m
```

您可以通过浏览器，使用集群中任一节点的 IP 地址和端口号即 <NodeIP>:<NodePort> 访问 Dashboard，如 http://192.168.100.10:31879。也可以通过公网 IP 并将端口转发后访问控制台，如：http://139.198.121.143:31879，即可进入 OpenPitrix 主页面。

![OpenPitrix 主页](/dashboard-kubernetes.png)

> 若公网 IP 有防火墙，请在防火墙添加规则放行对应的端口，外部才能够访问。

OpenPitrix 部署成功后，点击右上角 **登录**，可使用以下的管理员默认的用户名和密码登录 OpenPitrix 控制台体验，参见 [用户管理](../../user-guide/user-management) 创建开发者和普通用户的角色，[快速入门](../../getting-guide/introduction) 将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| 将生成在 `kubernetes/iam-config/admin-password.txt` 文件中，建议您登陆后修改初始密码 | 

3. 查看 Api Gateway 服务

```
$ kubectl get service openpitrix-api-gateway -n openpitrix-system
NAME                     TYPE       CLUSTER-IP    EXTERNAL-IP    PORT(S)          AGE
openpitrix-api-gateway   NodePort   10.96.66.66   <none>         9100:30441/TCP   5m
```

同上，您也可以通过浏览器访问 OpenPitrix API 界面，如：[http://139.198.121.143:30441/swagger-ui/](http://139.198.121.143:30441/swagger-ui)。

![swagger 页面](/swaggerUI-kubernetes.png)
    
## 升级

更新代码后，仅需要执行脚本即可升级环境。由于在第三步安装时提供了两种安装方式，因此升级也应根据第三步所选的安装方式进行升级。升级操作会保留数据库和 Etcd 服务中已有的数据，无需担心数据丢失。

###  无需管理 VM-based 平台

执行脚本，升级基础服务，升级 Dashboard 服务：

```bash
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s -u
```

###  需要管理 VM-based 平台

执行脚本，升级基础服务，升级 Dashboard 服务，升级 Pilot 服务：

```
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -a
```