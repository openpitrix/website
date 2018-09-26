---
title: "部署 WordPress 到 Kubernetes"
---

WordPress 是使用 PHP 语言开发的博客平台，用户可以把 WordPress 当作一个内容管理系统（CMS）来使用。在本指南中，将引导用户通过 OpenPitrix 控制台部署一个后端为 Mariadb 数据库的 WordPress 博客网站到您的 Kubernetes 环境中去，帮助您快速入门 OpenPitrix。

## 创建仓库

以开发者角色登录 OpenPitrix，进入**我的仓库**标签页，点击右侧**创建**按钮

![](/create-repo-kubernetes.png)

URL 填写 http://kubernetes-charts.storage.googleapis.com ，这只是一个 helm 官方的仓库。
> 若国内无法访问，可使用青云 QingCloud 提供的：https://helm-chart-repo.pek3a.qingstor.com/kubernetes-charts/

**云环境提供商（Runtime Provider）** 选择 Kubernetes，意味着当前仓库中的应用可以部署到 Kubernetes。

创建好的仓库，点击进去查看，可以发现里面的应用已经被自动导入，如果后续仓库内的应用有更新，可以通过**触发索引**操作更新

![](/trigger-indexer-kubernetes.png)

## 创建环境

以普通用户角色登录 OpenPitrix，进入**我的环境**标签页，点击右侧**创建**按钮

![](/create-runtime-kubernetes.png)

* **云环境提供商（Provider）** 选择 Kubernetes。
* **凭证（Credential）** 填写 Kubernetes 环境下 ~/.kube/config 或 /etc/kubernetes/admin.conf 中内容。
* **命名空间（Namespace）** 填写由小写字母和中划线组成的字符串。


## 部署应用

### 准备 Kubernetes 平台环境：安装 Helm

> 如若已经安装 Helm 可跳过此步骤

1. 下载 OpenPitrix 安装包并解压
```bash
$ curl -L https://git.io/GetOpenPitrix | sh -
```
> 此命令会自动下载最新版本的 OpenPitrix 在 Kubernetes 平台上的安装包。

2. 进入 openpitrix-${OPENPITRIX_VERSION}-kubernetes 文件夹
```bash
$ cd openpitrix-${OPENPITRIX_VERSION}-kubernetes/
```

3. 安装 Helm
```bash
$ kubernetes/scripts/init-helm.sh
```

### 准备应用

通过**我的应用**找到 Wordpress 应用，或者通过**我的仓库**，进入刚创建的仓库详情页找到 Wordpress 应用

![](/app-kubernetes.png)

### 部署应用

点击**部署**进入部署详情页，输入名字，选择所需的应用版本，选择刚创建的 Kubernetes，点击确定

> 名字只能采用小写字母加中划线组合的字符串

![](/deploy-cluster-kubernetes.png)

### 查看部署情况

**运维中心** 中可以查看刚刚部署的应用实例，当集群状态显示为 active 时表示创建成功。

可以进入 Kubernetes 环境查看部署情况。