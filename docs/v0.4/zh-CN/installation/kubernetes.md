---
title: "Kubernetes 模式"
---

## 第一步: 准备环境

### 主机环境

Kubernetes 模式需要准备 `至少 1 台` 满足最小资源要求的主机节点，并准备好相应的 Kubernetes 存储服务端。

**最小配置**

|   CPU  |  Memory |  磁盘  |
|--------|---------|-------|
|  2 核  |    2 G  |  60 G |

### 软件环境

Kubernetes 模式需提前安装 Kubernetes 环境且配置了存储服务端，并创建了相应的存储类型，详见 [部署 OpenPitrix - 前提条件](https://openpitrix.io/docs/v0.4/zh-CN/installation/installation-guide#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)。

## 第二步: 准备 OpenPitrix 安装包

1. 下载 [OpenPitrix v0.4.1](https://github.com/openpitrix/openpitrix/releases/download/v0.4.1/openpitrix-v0.4.1-kubernetes.tar.gz) 的 Kubernetes 运行环境上的安装包并解压，例如下载至 Ubuntu 系统：

```bash
$ wget https://github.com/openpitrix/openpitrix/releases/download/v0.4.1/openpitrix-v0.4.1-kubernetes.tar.gz
``` 

2. 解压文件并进入 `scripts` 目录：

```bash
tar -zxf openpitrix-v0.4.1-kubernetes.tar.gz && cd openpitrix-v0.4.1-kubernetes/kubernetes/scripts
```

## 第三步: 安装 OpenPitrix

OpenPitrix 管理的多云环境可以是 VM-based 的云平台，如 QingCloud、阿里云、AWS 等，也可以是容器管理平台，如 KubeSphere、 Kubernetes 等，参考如下步骤部署：

<!-- ### 无需管理 VM-based 平台

如果需要将 OP 部署在 KubeSphere 且只需要管 Kubernetes 运行环境，参考如下执行安装脚本，升级基础服务，启动 Dashboard 服务。如果需要同时管理 Kubernetes 和 VM-based 运行环境，请跳过此步，参考 [需要管理 VM-based 平台](../kubernetes/#需要管理-vm-based-平台)。

```bash
$ ./deploy-k8s.sh -n openpitrix-system -b -d -s -u
``` -->

1. 执行安装脚本，升级基础服务，启动 Dashboard 服务，启动 Pilot 服务：

```
$ ./deploy-k8s.sh -n openpitrix-system -a
```

deploy-k8s.sh 用法说明: 

```
deploy-k8s.sh [-n NAMESPACE] [-v VERSION] COMMAND
```
>  描述:
> -  -n NAMESPACE   ： 部署到 Kubernetes 指定的 namespace 下；
> -  -v VERSION     ： 将要部署的版本，默认是最新的稳定版；
> -  -r REQUESTS    ： 部署的 container 资源 requests 大小，参数形式为 cpu=100,memory=200, 默认值: cpu=100,memory=100；
> -  -l LIMITS      ： 部署的 container 资源 limits 大小，参数形式为 cpu=100,memory=200, 默认值: cpu=500,memory=500；
> -  -j JOB REPLICA ： Job 服务 replica 数量；
> -  -t TASK REPLICA： Task 服务 replica 数量；
> -  -o HOST        ： Ingress 中用到的 hostname (域名)；
> -  -p PROVIDER    ： 云平台的 provider plugin，例如：**qingcloud、aws、kubernetes、aliyun**，若需要支持这四种，请填 `all`；
> -  -b             ： 将要部署基础模块和服务；
> -  -m             ： 将要部署 metadata 服务；
> -  -c             ： 将要部署 dbctrl；
> -  -d             ： 把日志级别设置成 “debug”；
> -  -u             ： 将要部署图形界面 UI/Dashboard 服务；
> -  -i             ： 将要部署 Ingress 服务；
> -  -s             ： 将要部署存储服务，包括 etcd 和 MySQL；
> -  -a             ： 将要部署以上所有的模块和服务；


2. 查看 Pilot 服务，以下可以看到两个端口，依次是 https 和 http 协议的端口，Pilot 服务 http 协议的 9114 端口对应的端口是 30119，需要将端口 30119 暴露给集群外部访问（可能需要端口转发和防火墙放行该端口，确保流量能够通过该端口）：

> 提示：例如在 QingCloud 平台配置端口转发和防火墙规则，则可以参考 [云平台配置端口转发和防火墙](https://openpitrix.io/docs/v0.4/zh-CN/appendix/qingcloud-manipulation)。

> 说明：Pilot 用于接受来自集群服务的指令和信息的组件，如创建集群等，并可以传递指令给 Frontgate，它还接收来自 Frontgate 上传上来的信息。

```bash
$ kubectl get service openpitrix-pilot-service -n openpitrix-system
NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
openpitrix-pilot-service   NodePort   10.96.224.102   <none>        9110:31866/TCP, 9114:30119/TCP   5m
```

3. 修改 `global_config.yaml` 文件中的配置 `global_config` 下的 `pilot_ip` 和 `pilot_port` 为您实际的公网 IP (EIP) 和 Pilot 服务的端口号 (NodePort)。

```bash
pilot:
  ip: 139.198.111.111   // 此处替换为您的公网 IP
  port: 30119          // 替换为您实际的 Pilot 服务端口
  ···
```

4. 执行以下命令更新 etcd 中的配置，需要保证在外网能访问到上述的 Pilot 服务：

```
$ ./update-global-config.sh -v 0.4.1 -n openpitrix-system
```

## 第四步: 验证

1. 查看 Pods 的状态，如下图所示表示 Pods 状态正常。

```bash
 $ kubectl get pods -n openpitrix-system
NAME                                                        READY   STATUS      RESTARTS   AGE
global-config-watcher-68ffbd57f9-gx5qw                      1/1     Running     0          9h
openpitrix-account-service-deployment-77c59bd58b-pwqd4      1/1     Running     5          9h
openpitrix-am-db-init-job-np98f                             0/1     Completed   0          9h
openpitrix-am-service-deployment-775bd96cf4-mwjpg           1/1     Running     0          9h
openpitrix-api-gateway-deployment-7c4fd4949c-5nxk6          1/1     Running     0          9h
openpitrix-app-db-ctrl-job-hvw2m                            0/1     Completed   0          9h
openpitrix-app-manager-deployment-7558858f94-f4jz5          1/1     Running     0          9h
openpitrix-attachment-db-ctrl-job-jb9mr                     0/1     Completed   0          9h
openpitrix-attachment-manager-deployment-86f799bc4c-v9psz   1/1     Running     0          9h
openpitrix-category-manager-deployment-796756f7-8r8k7       1/1     Running     0          9h
openpitrix-cluster-db-ctrl-job-tckdv                        0/1     Completed   0          9h
openpitrix-cluster-manager-deployment-b54d558d5-4wlgr       1/1     Running     0          9h
openpitrix-dashboard-deployment-5df748665c-qpj7c            1/1     Running     0          9h
openpitrix-db-deployment-684db56447-669xm                   1/1     Running     0          9h
openpitrix-db-init-job-78hpk                                0/1     Completed   0          9h
openpitrix-etcd-deployment-7c4f8b6844-ptbnv                 1/1     Running     0          9h
openpitrix-iam-db-ctrl-job-2b5f8                            0/1     Completed   5          9h
openpitrix-im-db-ctrl-job-wjpmw                             0/1     Completed   0          9h
openpitrix-im-db-init-job-gl2sr                             0/1     Completed   0          9h
openpitrix-im-service-deployment-5ff897759b-kj2p9           1/1     Running     0          9h
openpitrix-isv-db-ctrl-job-zrgkl                            0/1     Completed   0          9h
openpitrix-isv-manager-deployment-779d4dc596-srh5n          1/1     Running     0          9h
openpitrix-job-db-ctrl-job-pxkqz                            0/1     Completed   4          9h
openpitrix-job-manager-deployment-6f4f5f765d-d8dkg          1/1     Running     0          9h
openpitrix-minio-deployment-78dd6bc9c6-vtbxr                1/1     Running     0          9h
openpitrix-notification-db-ctrl-job-6q7f9                   0/1     Completed   5          9h
openpitrix-notification-db-init-job-ppzr6                   0/1     Completed   0          9h
openpitrix-notification-deployment-67cf55786d-hppxh         1/1     Running     5          9h
openpitrix-pilot-deployment-856bdf59f6-5fc84                1/1     Running     0          9h
openpitrix-repo-db-ctrl-job-lh7pw                           0/1     Completed   0          9h
openpitrix-repo-indexer-deployment-67b84dc78c-jvvk6         1/1     Running     0          9h
openpitrix-repo-manager-deployment-79f87bff94-49x9s         1/1     Running     0          9h
openpitrix-rp-aliyun-deployment-59f997bb47-qvvjk            1/1     Running     0          9h
openpitrix-rp-aws-deployment-7479c58c85-nfsqz               1/1     Running     0          9h
openpitrix-rp-kubernetes-deployment-56bb587d55-wbcn5        1/1     Running     0          9h
openpitrix-rp-manager-deployment-567756dd6d-tq6ch           1/1     Running     0          9h
openpitrix-rp-qingcloud-deployment-6df7648ccf-ttcq2         1/1     Running     0          9h
openpitrix-runtime-db-ctrl-job-79cp5                        0/1     Completed   4          9h
openpitrix-runtime-manager-deployment-68b96f958b-b999w      1/1     Running     0          9h
openpitrix-task-db-ctrl-job-6l7cz                           0/1     Completed   3          9h
openpitrix-task-manager-deployment-5d745c7bfc-g57zf         1/1     Running     0          9h
```

2. 查看 Dashboard 服务暴露的端口。

```bash
$ kubectl get service openpitrix-dashboard -n openpitrix-system
NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                        AGE
openpitrix-dashboard   NodePort   10.233.21.57   <none>        80:31195/TCP,30300:30300/TCP   1h
```

您可以通过浏览器，使用集群中任一节点的 IP 地址和端口号即 `<NodeIP>:<NodePort>` 可在集群内部访问 Dashboard，如 `http://192.168.100.10:31195`。

若需要在外网访问，在云平台需要在端口转发规则中将上述的**内网端口** 31195 转发到**源端口** 31195，然后在防火墙开放这个**源端口**，确保外网流量可以通过该端口。

> 提示：例如在 QingCloud 平台配置端口转发和防火墙规则，则可以参考 [云平台配置端口转发和防火墙](https://openpitrix.io/docs/v0.4/zh-CN/appendix/qingcloud-manipulation)。

然后可以通过 `<EIP>:<NodePort>` 的方式访问控制台，如：`http://139.198.111.111:31195`，即可进入 OpenPitrix dashboard。


![](https://pek3b.qingstor.com/kubesphere-docs/png/20190612182143.png)


3. OpenPitrix 部署成功后，点击右上角 **登录**，可使用下表管理员默认的用户名和密码登录 OpenPitrix 控制台体验，建议先参考 [快速入门](https://openpitrix.io/docs/v0.4/zh-CN/getting-start/introduction) 的示例文档，将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| 将生成在 `kubernetes/iam-config/admin-password.txt` 文件中，强烈建议您登陆后修改初始密码 | 

4. 查看 API Gateway 服务。

```
$ kubectl get service openpitrix-api-gateway -n openpitrix-system
NAME                     TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
openpitrix-api-gateway   NodePort   10.233.37.35   <none>        9100:31627/TCP   1h
```

同上，可通过端口转发和开放防火墙后，即可在公网访问 Swagger UI 界面，如：`http://139.198.111.111:31627/swagger-ui/`。OpenPitrix API 文档请参考 [API](https://openpitrix.io/api)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190612182534.png)
    
<!-- ## 升级

更新代码后，仅需要执行脚本即可升级环境。由于在第三步安装时提供了两种安装方式，因此升级也应根据第三步所选的安装方式进行升级。升级操作会保留数据库和 Etcd 服务中已有的数据，无需担心数据丢失。

###  无需管理 VM-based 平台

执行脚本，升级基础服务，升级 Dashboard 服务：

```bash
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -b -d -s -u
```

###  需要管理 VM-based 平台

执行脚本，升级基础服务，升级 Dashboard 服务，升级 Pilot 服务：

```bash
$ kubernetes/scripts/deploy-k8s.sh -n openpitrix-system -a
``` -->

## 清理环境

若需要卸载 OpenPitrix 清理环境，在 script 目录下执行 clean.sh 脚本，停止并删除 OpenPitrix 所有服务，删除 openpitrix-system 的 namespace，请谨慎操作。

```bash
$ ./clean.sh -n openpitrix-system 
```
