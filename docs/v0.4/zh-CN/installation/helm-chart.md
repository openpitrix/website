---
title: "Helm Chart 模式"
---

Helm Chart 模式是将 OpenPitrix 的 Heml Chart 部署至 Kubernetes 集群中。

## 第一步: 准备环境

### 主机环境

Kubernetes 模式需要准备 `至少 1 台` 满足最小资源要求的主机节点，并准备好相应的 Kubernetes 存储服务端。

**最小配置**

|   CPU  |  Memory |  磁盘  |
|--------|---------|-------|
|  2 核  |    2 G  |  60 G |

### 软件环境

- 需提前准备好 [Kubernetes](https://kubernetes.io/) 环境，且 Kuberntes 环境已安装配置了存储服务端，并创建了相应的存储类型，详见 [部署 OpenPitrix - 前提条件](https://openpitrix.io/docs/v0.4/zh-CN/installation/installation-guide)。
- [Helm](https://helm.sh/) 客户端和 Tiller。

### 准备 Helm 客户端和 Tiller

以下安装方式仅供参考，请以 [Helm 和 Tiller 官方安装文档](https://github.com/helm/helm/blob/master/docs/install.md#installing-the-helm-client)  为标准。

#### 安装 Helm 客户端

执行以下命令，将自动下载安装最新版本的 Helm 客户端，支持在 Linux 上安装：

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

#### 安装 Tiller 服务端

Helm Tiller 是 Helm 的 Server，Tiller 有多种安装方式，比如本地安装或以 Pod 形式部署到 Kubernetes 集群中。本文以 Pod 安装为例，安装 Tiller 的最简单方式是执行 `helm init` 命令，该命令会检查 helm 本地环境设置是否正确，helm init 会连接 kubectl 默认连接的 Kubernetes 集群（可以通过 `kubectl config view` 查看），一旦连接集群成功，Tiller 会被安装到 kube-system namespace 中。

1、执行以下命令，将会在当前目录下创建 helm 文件夹即 `~/.helm`，以 Kubernetes Deployment 部署 Tiller：

```bash
$ helm init
```

2、检查 Tiller 是否成功安装：

```bash
$ kubectl get po -n kube-system
NAME                             READY   STATUS   RESTARTS   AGE
tiller-deploy-1046433508-rj51m   1/1     Running  0          3m
```

## 第二步：准备 OpenPitrix 安装包

1、下载 OpenPitrix 的 Helm Chart 安装包。

```bash
$ wget https://github.com/openpitrix/helm-chart/releases/download/v0.4.0/openpitrix-helm-chart-v0.4.0.tar.gz
```

注意，若系统提示还未安装 wget 工具，则执行以下命令安装。

- Ubuntu 下安装 wget

```bash
$ sudo apt-get update  
$ sudo apt-get install wget  
```
- CentOS 下安装 wget

```bash
$ yum install wget
```

2、解压安装包并进入安装目录。

```bash
$ tar -zxf openpitrix-helm-chart-v0.4.0.tar.gz && cd openpitrix
```

## 第三步: 安装 OpenPitrix

OpenPitrix 管理的多云环境可以是 VM-based 的云平台，如 QingCloud、阿里云、AWS 等，也可以是容器管理平台，如 Kubernetes、KubeSphere 等。参考如下步骤部署：

1、通过 Helm 安装 OpenPitrix。

```bash
$ helm install . -n openpitrix --namespace openpitrix-system
```


2、查看 Pilot 服务，以下可以看到两个端口 (NodePort)，依次是 https 和 http 协议的端口，例如以下返回的 http 协议的端口是 30119，需要将 Pilot 服务的端口 30119 暴露给外部访问 (可能需要配置端口转发和防火墙规则，保证外网流量能够通过该端口)。

> 提示：例如在 QingCloud 平台配置端口转发和防火墙规则，则可以参考 [云平台配置端口转发和防火墙](https://openpitrix.io/docs/v0.4/zh-CN/appendix/qingcloud-manipulation)。

> 说明：Pilot 用于接受来自集群服务的指令和信息的组件，如创建集群等，并可以传递指令给 Frontgate，它还接收来自 Frontgate 上传上来的信息。

```bash
$ kubectl get service openpitrix-pilot-service -n openpitrix-system
NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
openpitrix-pilot-service   NodePort   10.96.224.102   <none>        9110:31866/TCP, 9114:30119/TCP   5m
```

3、修改 `values.yaml` 文件中的配置 `global_config` 下的 `pilot_ip` 和 `pilot_port` 为您实际的公网 IP (EIP) 和 Pilot 服务的端口号 (NodePort)。

```bash
global_config:
  pilot_ip: 139.198.111.111   // 此处替换为您的公网 IP
  pilot_port: 30119          // 替换为您实际的 Pilot 服务端口
  ···
```

4、Helm 使用 upgrade 命令来更新已安装的 release，由于上一步修改了配置文件，因此执行以下命令更新 Release：

```bash
$ helm upgrade openpitrix .
Release "openpitrix" has been upgraded. Happy Helming!
```

5、验证安装，执行以下命令查看 OpenPitrix 下所有 Pod 的运行状态，只有 STATUS 都显示为 `Running` 或 `Completed` 时说明 OpenPitrix 安装成功 (安装和初始化预计需要几分钟)。

```bash
$ kubectl get pod -n openpitrix-system 
```

## 第四步：访问 OpenPitrix

### 访问 Dashboard 界面

1、查看 Dashboard 服务，若需要通过外网访问，可能需要进行端口转发和防火墙放行等操作，确保外网流量能够通过如下的 31879 端口。

```bash
$ kubectl get svc -n openpitrix-system | grep openpitrix-dashboard
NAME                           TYPE       CLUSTER-IP    EXTERNAL-IP     PORT(S)               AGE
openpitrix-dashboard          NodePort    10.233.33.118   <none>        80:31879/TCP          4m
```


2、您可以通过浏览器，使用集群中任一节点的 IP 地址和端口号即 `<NodeIP>:<NodePort>` 访问 Dashboard，如 `http://192.168.100.10:31879`。

若需要在外网访问，在云平台需要在端口转发规则中将上述的**内网端口** 31879 转发到**源端口** 31879，然后在防火墙开放这个**源端口**，确保外网流量可以通过该端口。

> 提示：例如在 QingCloud 平台配置端口转发和防火墙规则，则可以参考 [云平台配置端口转发和防火墙](https://openpitrix.io/docs/v0.4/zh-CN/appendix/qingcloud-manipulation)。

然后可以通过 `<EIP>:<NodePort>` 的方式访问控制台，如：`http://139.198.111.111:31879`，即可进入 OpenPitrix dashboard。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190612182143.png)

3、OpenPitrix 部署成功后，点击右上角 **登录**，可使用下表管理员默认的用户名和密码登录 OpenPitrix 控制台体验，建议先参考 [快速入门](https://openpitrix.io/docs/v0.4/zh-CN/getting-start/introduction) 的示例文档，将帮助您快速上手 OpenPitrix。


| 角色 |	用户名 |	初始密码 |
|-----|-----|-----|
| 管理员	| admin@op.com 	| 在后台 `helm-chart/openpitrix/` 执行 `cat values.yaml | grep iam_account` 查看密码，强烈建议您登陆后修改初始密码 | 

### 访问 API 界面

1、查看 API Gateway 服务。

```
$ kubectl get service openpitrix-api-gateway -n openpitrix-system
NAME                     TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE
openpitrix-api-gateway   NodePort   10.233.8.57   <none>        9100:31304/TCP   31m
```

2、同上，可通过端口转发和开放防火墙后，可以通过浏览器访问 OpenPitrix API 界面，如：`http://139.198.111.111:31304/swagger-ui/`。OpenPitrix API 文档请参考 [API](https://openpitrix.io/api)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190612182534.png)

## 卸载

执行卸载命令将从环境中删除 OpenPitrix 的所有服务，包括 NameSpace 和 Release。卸载操作不可逆，请谨慎操作。

```bash
$ kubectl delete ns openpitrix-system
$ helm delete --purge openpitrix
```