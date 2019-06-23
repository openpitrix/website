---
title: "部署 WordPress 到多云环境"
---

[WordPress](https://wordpress.org/) 是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。本指南仅以普通用户角色为例，引导用户通过 OpenPitrix 控制台上传并部署一个后端为 MySQL 数据库的 WordPress 博客网站到多个云环境中，帮助您快速上手 OpenPitrix。

由于平台所有内置的角色都能够部署应用至测试环境，本示例仅演示使用普通用户 `regular@op.com` 来部署应用。

## 前提条件

正式开始前，需要准备好以下资源：

 - 已有 Wordpress 应用上架商店，若没有请参考 [快速入门之开发者](../getting-start/app-review) 将应用提交管理员审核后发布到商店。
 
 - 已有 OpenPitrix 普通用户账号 `regular@op.com`，普通用户账号由管理员提供，参见 [管理员快速入门](../getting-start/admin-quick-start)。
 
 - 已有 [AWS 云平台](https://console.qingcloud.com/)、[QingCloud](https://console.qingcloud.com/)、[阿里云](https://account.aliyun.com/login/) 的账号，已有 [Kubernetes](https://kubernetes.io) 集群。

## 部署应用至 AWS

### 准备 AWS 平台资源

若要将商店的应用部署到 AWS 运行环境，则需依赖平台的网络资源，需提前创建好资源，应用部署到运行环境后将在  AWS 平台自动创建主机和集群。

#### 第一步：创建 VPC

登录 AWS 控制台，例如示例中选择在 `us-east-2` 区域创建 [VPC](https://us-east-2.console.aws.amazon.com/vpc/home?region=us-east-2#vpcs)，详见 [AWS 官方文档](https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/VPC_Subnets.html)。

![创建 VPC](/AWS-create-vpc.png)

#### 第二步：创建私有网络

创建私有网络并连接到 VPC，详见 [AWS 官方文档](https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/working-with-vpcs.html)。

![创建私有网络](/AWS-create-subnet.png)

### 创建 AWS 运行环境

1、以普通用户角色登录 OpenPitrix，进入 **应用商店**，选择交付类型为 **VM**，然后点击 「立即部署」 按钮。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620074336.png)

2、点击 「创建环境」，在弹窗中选择 **Amazon Web Service**，然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620074943.png)


- URL：填写 AWS 公有云的 region 的 API server 地址，比如：`https://ec2.us-east-2.amazonaws.com`。
- 密钥：填写 AWS 平台上生成的 [API 秘钥](https://console.aws.amazon.com/iam/home?region=us-east-2#security_credential)。
- 名称：为您的运行环境凭证起一个简洁明了的名称，便于用户浏览和搜索，比如 aws-test-secret。

3、区域选择上一步在 AWS 上创建的 VPC 所在的区域 `us-east-2`，名称和备注可自定义，然后点击 「继续」。


### 部署应用

填写应用部署的基本信息，选择之前创建的 AWS 运行环境，本示例 MySQL 和 Wordpress 节点设置选择默认的最低参数，选择创建的私有网络 (subnet)，完成部署。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620075712.png)


#### 第三步：查看部署情况

菜单栏选择 **我的实例**，可以查看刚刚部署应用的集群实例，集群列表中点击 **Wordpress** 查看该集群下应用部署的资源。

> 说明：Wordpress 集群包含 MySQL 和 Wordpress 两个角色的节点和一个代理 frontgate。其中 frontgate 是一个节点，包含 proxy 和 etcd，负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能，由系统自动创建。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620081720.png)

部署成功后，将会在 AWS 运行环境创建 3 台主机，可以在 [AWS 控制台](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#Instances:sort=launchTime) 上查看主机状态以及 EIP 情况。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620081552.png)

#### 第四步：访问 Wordpress

在的节点 IP 列中，第二行的 wordPress IP 信息 172.31.25.48 是子网内 My的 IP 地址，第二行 18.224.222.222 是公网 IP 地址，可供直接访问。待创建成功后，即可在浏览器通过公网 IP  `http://18.224.222.222` 来访问 Wordpress。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620082101.png)

> 应用部署成功后，若需要管理部署的集群如扩容、停用或删除集群或添加节点，参考 [集群管理](../manual-guide/cluster-management)。


## 部署应用至 QingCloud

由于在应用审核快速入门中，已通过技术审核账号说明了如何创建 QingCloud 环境并将应用部署至 QingCloud，此处不再赘述，请参考 [创建测试环境 (QingCloud Runtime)](../getting-start/app-review#创建测试环境-qingcloud-runtime)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003605.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003136.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003154.png)

## 部署应用至阿里云

在普通用户快速入门中，已通过普通用户的账号 `regular@op.com` 说明了如何创建阿里云环境并将应用部署至阿里云，此处不再赘述，请参考 [创建测试环境 (Aliyun Runtime)](../getting-start/regular-user-quick-start)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003223.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003238.png)

## 部署应用至 Kubernetes

由于在应用审核快速入门中，已通过技术审核账号说明了如何创建 Kubernetes 运行环境并将应用部署至 Kubernetes，此处不再赘述，请参考 [创建测试环境 (Kubernetes Runtime)](../getting-start/app-review#审核应用-helm-版本)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003501.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190619003306.png)
