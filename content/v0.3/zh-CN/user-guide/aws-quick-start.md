---
title: "部署 WordPress 到 AWS"
---

[WordPress](https://wordpress.org/) 是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。本指南仅以普通用户角色为例，引导用户通过 OpenPitrix 控制台上传并部署一个后端为 MySQL 数据库的 WordPress 博客网站到您的 AWS 环境中去，帮助您快速上手 OpenPitrix。

## 前提条件

正式开始前，需要准备好以下资源：

 - 已有 Wordpress 应用上架商店，若没有请参考 [快速入门之开发者](../ISV-quick-start) 将应用提交管理员审核后发布到商店。
 
 - 已有 OpenPitrix 普通用户账号，普通用户账号由管理员提供，参见 [用户管理](../user-management/#创建用户)。
 
 - 已有 [AWS 云平台](https://console.qingcloud.com/) 的账号，本示例以 AWS 云平台作为运行环境。


## 创建环境

以普通用户角色登录 OpenPitrix，进入 **我的环境** 标签页，点击右侧 **创建** 按钮。

![](/create-runtime-aws.png)

- 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索。
- 云环境提供商：选择 AWS。
- URL：填写 AWS 公有云的 region 的 API server 地址，比如：https://ec2.us-east-2.amazonaws.com 。
- 密钥：填写 AWS 平台上生成的 [API 秘钥](https://console.aws.amazon.com/iam/home?region=us-east-2#security_credential)。
- 区域：是云平台上的可用区，决定集群和资源将部署在云平台的哪个区域。填写正确的 URL 及 API 秘钥信息后，即可从下拉列表中选择。 
- 描述：简单介绍运行环境的主要特性，让用户进一步了解该运行环境。
- 标签：用于标识该运行环境和匹配应用仓库，比如设置 “env=testing” 可表示该运行环境是测试环境。

## 准备 AWS 平台资源

若要将商店的应用部署到 AWS 运行环境，则需依赖平台的网络资源，需提前创建好资源，应用部署到运行环境后将在  AWS 平台自动创建主机和集群。

### 第一步：创建 VPC
登录 AWS 控制台，创建 [VPC](https://us-east-2.console.aws.amazon.com/vpc/home?region=us-east-2#vpcs)，详见 [AWS 官方文档](https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/VPC_Subnets.html)。



![创建 VPC](/AWS-create-vpc.png)

### 第二步：创建私有网络
创建私有网络并连接到 VPC，详见 [AWS 官方文档](https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/working-with-vpcs.html)。

![创建私有网络](/AWS-create-subnet.png)

## 部署应用

### 第一步：查看应用

点击 **商店**，找到开发者发布的 Wordpress 应用，点击 **部署** 进入部署详情页。

![查看应用](/view-wordpress.png)

### 第二步：填写部署信息

填写应用部署的基本信息，选择之前创建的 AWS 运行环境，本示例 MySQL 和 Wordpress 节点设置选择默认的最低参数，选择创建的子网，完成部署。

![填写部署信息](/deploy-cluster-to-AWS.png)

### 第三步：查看部署情况

菜单栏选择 **已购应用**，可以查看刚刚部署应用的集群实例，集群列表中点击 **Wordpress** 查看该集群下的两个节点，包含 MySQL 和 Wordpress 两个角色的节点，应用部署后将创建 frontgate 和 Wordpress 两个集群。其中 frontgate 是一个节点，包含 proxy 和 etcd，负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能，由系统自动创建。

![AWS 部署实例](/cluster-detail-aws.png)

部署成功后，将会在 AWS 运行环境创建 3 台主机，可以在 [AWS 控制台](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#Instances:sort=launchTime) 上查看主机状态以及 IP 情况。

![AWS 主机列表](/AWS-node-details.png)


### 第四步：访问 Wordpress

在 **已购应用** 下的节点 IP 列中，第一行比如 172.31.24.221 是子网内的 IP 地址，第二行比如 18.224.23.222 是公网 IP 地址，可供直接访问。待创建成功后，即可在浏览器通过公网 IP  [http://18.224.23.222](http://18.224.23.222) 来访问 Wordpress。

![Wordpress 主页](/wordpress-aws.png)

> 应用部署成功后，若需要管理部署的集群如停用或删除集群，参考 [集群管理](../user-guide/cluster-management.md)。
