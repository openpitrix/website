---
title: "部署 WordPress 到 Kubernetes"
---

WordPress 是使用 PHP 语言开发的博客平台，用户可以把 WordPress 当作一个内容管理系统（CMS）来使用。本指南以开发者角色为例，引导用户通过 OpenPitrix 控制台上传并部署一个后端为 MariaDB 数据库的 WordPress 博客网站到您的 Kubernetes 环境中去，帮助您快速上手 OpenPitrix。

## 前提条件

正式开始前，需要准备好以下资源：
 
 - 已有 OpenPitrix 开发者账号，开发者账号由管理员提供，参见 [用户管理](../user-management/#创建用户)。
 
 - 已有 Kubernetes 集群环境，本示例以 Kubernetes 作为运行环境。

## 创建仓库

以开发者角色登录 OpenPitrix，进入 **仓库** 标签页，点击右侧 **创建** 按钮，填写仓库的基本信息，详见 [仓库管理](../repo-management)。

![](/create-repo-kubernetes.png)

- 名称：为您的仓库起一个简洁明了的名称，便于用户浏览和搜索。
- 可见性：即该仓库设置为公有还是私有仓库。所有用户都能使用公有仓库，即所有用户都可以上传应用配置包，而私有仓库仅属于创建者。
- 云环境提供商：选择 Kubernetes，意味着当前仓库中的应用可以部署到 Kubernetes。
- URL：选择 HTTP，填写 http://kubernetes-charts.storage.googleapis.com ，这只是一个 helm 官方的仓库。

> 若由于网络原因无法访问，可使用青云 QingCloud 提供的：https://helm-chart-repo.pek3a.qingstor.com/kubernetes-charts/

创建好的仓库，点击进去查看，可以发现里面的应用已经被自动导入，如果后续仓库内的应用有更新，可以通过 **触发索引** 操作更新

![](/trigger-indexer-kubernetes.png)

## 创建环境

进入 **我的环境** 标签页，点击右侧 **创建** 按钮，填写 Kubernetes 运行环境的基本信息，详见 [运行环境管理](../runtime-management/#创建运行环境)。

![](/create-runtime-kubernetes.png)

- 云服务商：选择 Kubernetes。
- 凭证（Credential）： 填写 Kubernetes 环境下 ~/.kube/config 或 /etc/kubernetes/admin.conf 中内容。
- 命名空间（Namespace）： 填写由小写字母和中划线组成的字符串。


## 部署应用

### 第一步：安装 Helm

> 如若已经安装 Helm 可跳过此步骤

1. 下载 OpenPitrix 安装包并解压。

```bash
$ curl -L https://git.io/GetOpenPitrix | sh -
```
> 此命令会自动下载最新版本的 OpenPitrix 在 Kubernetes 平台上的安装包。

2. 进入 openpitrix-${OPENPITRIX_VERSION}-kubernetes 文件夹。

```bash
$ cd openpitrix-${OPENPITRIX_VERSION}-kubernetes/
```

3. 安装 Helm。

```bash
$ kubernetes/scripts/init-helm.sh
```

### 第二步：准备应用

通过 **我的应用** 找到 Wordpress 应用，或者通过 **我的仓库**，进入刚创建的仓库详情页找到 Wordpress 应用。

![](/app-kubernetes.png)

### 第三步：部署应用

点击**部署**进入部署详情页，输入应用的名字，选择所需的应用版本，选择刚创建的 Kubernetes 运行环境 “test-runtime-k8s”，点击确定。

> 名字只能采用小写字母加中划线组合的字符串

![](/deploy-cluster-kubernetes.png)

### 第四步：查看部署情况

**集群** 中可以查看刚刚部署应用的集群实例，当集群状态显示为活跃时表示创建成功，部署在集群中各节点上的 Pod 也可通过节点列表页查看，如果 Pod 状态显示 “运行中” 则表示该 Pod 运行正常，包括 Deployements、StatefulSets 和 DaemonSets 三种类型的 Pod。

![](/k8s-pod-cluster-details.png)

![](/k8s-cluster-pod-mariadb.png)

同样，也可以进入 Kubernetes 环境查看应用的部署情况。