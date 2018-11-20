---
title: "Helm Chart 模式"
---

## 第一步：准备 Helm 客户端

执行以下命令，将自动下载安装最新版本的 Helm 客户端，支持在 Linux 上安装 ：

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

> 说明：更多安装方式请参考 [helm 安装文档](https://github.com/helm/helm/blob/master/docs/install.md#installing-the-helm-client)。

## 第二步：准备 OpenPitrix 安装包

下载 OpenPitrix 安装包并解压，此命令会自动下载最新版本的 OpenPitrix 在 Kubernetes 运行环境上的安装包：

```bash
$ curl -L https://git.io/GetOpenPitrix | sh -
```

进入解压完成后的文件夹，执行命令时应替换 “${version}” 为实际的下载版本号：

```bash
$ cd openpitrix-${version}-kubernetes/
```

## 第三步: 安装 OpenPitrix

OpenPitrix 管理的多云环境可以是 VM-based 的云平台，如 QingCloud、AWS 等，也可以是容器管理平台，如 Kubernetes 等。以下分两种情况说明安装步骤：

### 无需管理 VM-based 平台

如果只需要管理 Kubernetes 运行环境，参考如下执行安装脚本，升级基础服务，启动 Dashboard 服务。如果需要同时管理 Kubernetes 和 VM-based 运行环境，请跳过此步，参考 [需要管理 VM-based 平台](../helm-chart/#需要管理-vm-based-平台)。


```bash
$ cd kubernetes/helm/openpitrix

$ helm install . -n openpitrix --namespace openpitrix-system
```


> 说明：可以修改 values.yaml 文件来指定特定的版本及其他参数。



### 需要管理 VM-based 平台

如果需要同时管理 Kubernetes 和 VM-based 运行环境，则参考如下步骤部署：

1、安装openpitrix

```bash
$ cd kubernetes/helm/openpitrix

$ helm install . -n openpitrix --namespace openpitrix-system
```


2、查看 Pilot 服务，Pilot 用于接受来自集群服务的指令和信息的组件，如创建集群等，并可以传递指令给 Frontgate，它还接收来自 Frontgate 上传上来的信息。以下可以看到两个端口，依次是 https 和 http 协议的端口，Pilot 服务 http 协议的 9114 端口对应的端口是 30119，因此 Pilot 服务的端口需要暴露给外部访问（可能需要端口转发和防火墙放行该端口）：

```bash
$ kubectl get service openpitrix-pilot-service -n openpitrix-system
$ root@i-tjwio1m2:/opt/openpitrix-v0.1.9-kubernetes/kubernetes# kubectl get service openpitrix-pilot-service -n openpitrix-system
NAME                       TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
openpitrix-pilot-service   NodePort   10.96.224.102   <none>        9110:31866/TCP, 9114:30119/TCP   5m
```

3、修改 values.yaml 文件中的配置 `global_config` 下的 `pilot_ip` 和 `pilot_port`。由于 Pilot 是需要公网访问，所以需要保证在外网能访问上述的 Pilot 服务，然后执行如下命令：

```bash
$ helm upgrade openpitrix .
```