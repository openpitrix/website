---
title: "部署 Nginx 到 Kubernetes"
---

 Nginx 是一个高性能的 HTTP 和反向代理服务器，同时也是一个 IMAP/POP3/SMTP 代理服务器。本指南以开发者角色为例，引导用户通过 OpenPitrix 控制台上传并部署 Nginx 到您的 Kubernetes 环境中去，帮助您快速上手 OpenPitrix。

## 前提条件

正式开始前，需要准备好以下资源：
 
 - 已有 OpenPitrix 普通用户账号，普通用户由管理员提供，参见 [用户管理](../user-management/#创建用户)。

 - 已有 Nginx 应用上架应用商店，若没有请参考 [Helm Chart 开发快速入门](../helm-developer-quick-start) 准备 Nginx 应用配置包并提交。
 
 - 已有 Kubernetes 集群环境，本示例以 KubeSphere 作为运行环境，需要提前准备好 KubeSphere 集群，参见 [KubeSphere 安装指南](../https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/)。


## 创建环境

进入 **我的环境** 标签页，点击右侧 **创建** 按钮，填写 Kubernetes 运行环境的基本信息，详见 [运行环境管理](../runtime-management/#创建运行环境)。

![](/create-runtime-kubernetes.png)

- 云服务商：选择 Kubernetes。
- 凭证（Credential）： 填写 Kubernetes 环境下 ~/.kube/config 或 /etc/kubernetes/admin.conf 中内容。
- 命名空间（Namespace）： 填写由小写字母和中划线组成的字符串。


## 部署应用

### 第一步：查看应用

点击 **商店**，找到开发者发布的 Nginx 应用，点击 **部署** 进入部署详情页。

![查看应用](/app-kubernetes.png)

### 第二步：部署应用

点击 **部署** 进入部署详情页，输入应用的名字，选择所需的应用版本，选择刚创建的 Kubernetes 运行环境 “test-runtime-k8s”，在 **2.部署设置** 中，可以对 values.yaml 文件进行编辑，该文件可以为 chart 及其任何依赖项提供值，例如，在 Service 中如果需要将应用暴露给外网访问，则需要修改 type 为 LoadBalancer 或 NodePort。若服务的类型选择 LoadBalancer 的方式暴露服务，需要有云服务厂商的 LoadBalancer 插件支持，创建后需要将公网 IP 绑定 LoadBalancer 即可访问。本示例以 NodePort 方式为例，将 Service type 修改为 NodePort。

配置完成后点击 **确定**。

> 名字小写字母开头，最长14个字符（支持数字/小写字母/连字符），否则将无法部署。

![填写部署应用信息](/deploy-cluster-kubernetes.png)

### 第三步：查看部署情况

**集群** 中可以查看刚刚部署应用的集群实例，当集群状态显示为活跃时表示创建成功，部署在集群中各节点上的 Pod 也可通过节点列表页查看，如果 Pod 状态显示 “运行中” 则表示该 Pod 运行正常，包括 Deployements、StatefulSets 和 DaemonSets 三种类型的 Pod。

![查看集群节点](/k8s-pod-cluster-details.png)

同样，也可以进入 Kubernetes 环境查看应用的部署情况。由于本实例部署在 KubeSphere 中，因此可以很方便地通过 KubeSphere 控制台查看 Pod 和 Service 的部署情况。登录 KubeSphere 控制台，点击 **应用负载**，查看 **部署** 和 **服务**，可以看到上一步部署的 nginx 的运行状态和详情。

![查看部署](/pod-nginx-kubesphere.png)

![查看服务](/svc-nginx-kubesphere.png)

查看服务的详情及 http 对应 80 端口所映射的 NodePort，此处是 30486。可以通过端口转发的方式，来访问 nginx 服务。

![服务详情](/svc-details.png)

### 第四步：验证部署

通过浏览器使用公网 IP 和 节点端口（NodePort）即可访问 nginx。同样，若使用的是 LoadBalancer 方式，将公网 IP 绑定 LoadBalancer 即可访问。

> 如果主机的公网 IP 有防火墙，应在防火墙放行对应的端口，否则外网无法访问。

![验证 nginx](/nginx-home.png)
