---
title: "运行环境管理"
---

## 简介

运行环境即云的运行时环境，它可以是 AWS、QingCloud、Aliyun、Kubernetes、OpenStack、VMware 等，可以是公有云，也可以是私有云。通过创建运行环境可以让 OpenPitrix 有权限访问这些云平台，从而实现多云环境下的应用部署和管理。

## 查看运行环境

所有权限级别的用户都能够查看和添加运行环境。通过 OpenPitrix 应用中心下选择 **我的环境**，即可添加运行环境。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620151052.png)

## 创建运行环境

1、以创建 QingCloud 运行环境为例，点击 「添加」，将弹出创建运行环境的窗口。

> 注意，部署应用至 QingCloud 云运行环境的前提是该环境必须已预先创建了 VPC 和私有网络，且 VPC 已绑定了公网 IP，详见 [VPC 专属私有网络](https://docs.qingcloud.com/product/network/vpc)。


2、在添加 QingCloud 环境页面参考如下步骤添加 API 密钥信息作为**授权信息**。

> 获取 QingCloud API 密钥 ID：
> - 登录 [QingCloud 控制台](https://console.qingcloud.com/)；
> - 进入「[API 密钥](https://console.qingcloud.com/access_keys/)」管理界面；
> - 点击创建，并下载密钥文件。

3、输入 API 密钥相关信息后，点击 「验证」，然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617005405.png)

4、设置环境信息，区域需要根据 VPC 和私有网络所在的区域来选择，例如本示例已预先在 [QingCloud 上海1区 - A](https://console.qingcloud.com/sh1a/routers/) 的账号中创建了 VPC 和私有网络，因此区域选择 sh1a，名称和备注可自定义。

- 区域：sh1a
- 名称：qingcloud-test-runtime
- 备注：QingCloud 测试环境

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620152000.png)

5、QingCloud 云平台环境创建成功。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620152028.png)

同上，创建其它的云运行环境如 AWS、Aliyun 都是一样的步骤。

**创建 Kubernetes 运行环境**

左侧选择 `Kubernetes`，点击 「+ 添加」。添加一个 Kubernetes Runtime，如下添加证书，可使用当前 OpenPitrix 环境所部署的 Kubernetes 集群，将 `~/.kube/config` 中的内容粘贴至授权信息框中，点击 「验证」 然后点击 「继续」。

> 注意，请确保该 Kubernetes 集群已部署了 [Helm Tiller](https://helm.sh/docs/install/)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618071117.png)

2、参考如下提示设置环境信息：

> - 命名空间：选择应用在 Kubernetes 集群中的命名空间，在 KubeSphere 中其代表项目；若填写的命名空间不存在，将在集群自动新建一个命名空间；
> - 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索，例如 k8s-testing-runtime；
> - 备注：例如 Kubernetes 测试环境；

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620155538.png)

3、点击 「完成」 即可创建。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620155647.png)

## 修改运行环境

在运行环境列表页，可以查看平台中所有的运行环境，点击运行环境的右侧 “···” 然后点击 「修改」 可对名称和描述信息进行修改，还支持对当前运行环境 **切换授权信息**。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620155855.png)

**授权信息管理**

点击 「授权信息」然后选择右侧 “···”，支持修改和删除授权信息，基于同一个授权信息可以添加多个运行环境。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620184910.png)

## 查看运行环境的实例

点击运行环境卡片，可以看到该运行环境下的所有集群实例和代理信息。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620183904.png)

## 删除运行环境

在运行环境列表页或详情页中，可以查看平台中所有的运行环境，点击运行环境列表项的右侧 “···” 可删除运行环境。
