---
title: "部署 OpenPitrix"
---

OpenPitrix v0.4 支持 **`All-in-one`** 、 **`Kubernetes`** 和 **`Helm Chart`** 三种部署模式。

> 提示：若已经安装了 OpenPitrix v0.3，需要先卸载 v0.3 然后再安装 v0.4 版本。

### All-in-One 模式

[All-in-One 模式](../allinone) 即单节点部署，需要预先安装 Docker、Docker-Compose、Make 等依赖软件，仅建议您用来测试或熟悉部署流程和了解 OpenPitrix 功能特性，在正式使用环境建议使用 `Kubernetes` 模式，请参考下文的 `Kubernetes` 模式。

### Kubernetes 模式

[Kubernetes 模式](../kubernetes) 是将 OpenPitrix 部署到 Kubernetes 集群环境中，部署完成后 OpenPitrix 可作为基于 Kubernetes 的一个应用管理系统，提供应用的全生命周期管理。

### Helm-Chart 模式

[Helm-Chart 模式](../helm-chart) 是将 OpenPitrix 以 Helm Chart 的方式部署到 Kubernetes 集群环境中，需要预先安装 Helm Client 和 Tiller。


### 前提条件

注意，Kubernetes 模式和 Helm-Chart 模式需提前准备好 [Kubernetes](https://kubernetes.io/) 环境，Kubernetes 版本 >= `Kubernetes 1.7.4`，并需要安装 [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 工具。另外，Kubernetes 集群需已安装配置好存储服务端，并创建了相应的存储类型，支持在集群中创建 PVC，可执行 `kubectl get sc` 查看存储类型。

> Kubernetes 环境可以选用以下三种之一:
> * **[KubeSphere](https://kubesphere.io) 容器管理平台 (推荐)**
> 
> KubeSphere 是在目前主流容器调度平台 [Kubernetes](https://kubernetes.io) 之上构建的 **企业级分布式多租户容器管理平台**，为用户提供简单易用的操作界面以及向导式操作方式，KubeSphere 提供了在生产环境集群部署的全栈化容器部署与管理平台，且 KubeSphere 提供一键部署的方式，提供在 Kubernetes 中最优的存储和网络解决方案，帮助用户快速部署环境，并且 KubeSphere 已集成了 Helm Client 和 Tiller，方便 Helm Chart 模式安装。详见 [KubeSphere 安装指南](https://docs.kubesphere.io/)。
> 
> * **[Kubernetes on QingCloud AppCenter](https://docs.qingcloud.com/product/container/k8s)**
> 
> QingCloud 提供的支持一键部署的 Kubernetes 集群环境，同时集成了 KubeSphere 容器管理平台。
> 
> 注：网络插件请选用 Calico 或 Hostnic。
> 
> * **已有的物理机搭建或虚拟机搭建的 Kubernetes 环境**
