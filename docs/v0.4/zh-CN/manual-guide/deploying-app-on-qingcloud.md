---
title: "部署 WordPress 到 QingCloud"
---

[WordPress](https://wordpress.org/)  是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。本指南仅以普通用户角色为例，引导用户通过 OpenPitrix 控制台上传并部署一个后端为 MySQL 数据库的 WordPress 博客网站到您的 QingCloud 环境中去，帮助您快速上手 OpenPitrix。

## 前提条件

正式开始前，需要准备好以下资源：

 - 已有 Wordpress 应用上架商店，若没有请参考 [快速入门之开发者](../getting-start/developer-quick-start) 将应用提交管理员审核后发布到商店。
 
 - 已有 OpenPitrix 普通用户账号，普通用户账号由管理员提供，参见 [用户管理](../user-management/#创建用户)。
 
 - 已有 [QingCloud 云平台](https://console.qingcloud.com/) 的账号，本示例以 QingCloud 云平台作为运行环境。


## 创建环境

1、以普通用户角色登录 OpenPitrix，在环境列表页点击 **"+”** 按钮，将弹出创建创建运行环境的窗口。

2、填写运行环境的基本信息：

![](/create-runtime-qingcloud.png)

- 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索。
- 提供商：选择 QingCloud。
- URL：填写 QingCloud 的 API server 地址：`https://api.qingcloud.com`。
- 密钥：Access Key ID 和 Secret Access Key 填写 QingCloud 平台上生成的 [API 秘钥](https://console.qingcloud.com/access_keys/)。
- 区域：是云平台上的可用区，决定集群和资源将部署在云平台的哪个区域。填写正确的 URL 及 API 秘钥信息后，即可从下拉列表中选择。 
- 描述：简单介绍运行环境的主要特性，让用户进一步了解该运行环境。
- 标签：用于标识该运行环境和匹配应用仓库，比如设置 “env=testing” 可表示该运行环境是测试环境。

## 准备 QingCloud 平台资源

若要将商店的应用部署到 QingCloud 运行环境，则需依赖平台的网络资源，需提前创建好资源，应用部署到运行环境后将在  QingCloud 平台自动创建集群。

### 第一步：创建 VPC
在 QingCloud 可以预配置出一个专属的大型网络 - VPC 网络，登录 [QingCloud 控制台](https://console.qingcloud.com)，创建 VPC，详见 [QingCloud 官方文档](https://docs.qingcloud.com/product/network/vpc)。

![创建 VPC](/create-vpc.png)

### 第二步：创建私有网络

私有网络用于主机之间互联，它类似物理世界中使用交换机组成的局域网。不同用户的私有网络之间是完全隔离的。私有网络可以作为子网加入到 VPC 网络中。在控制台创建私有网络，并加入 VPC，详见 [QingCloud 官方文档](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86)。

![创建私有网络](/create-vxnet.png)

### 第三步：申请公网 IP

1、公网 IP 是在互联网上合法的静态 IP 地址。申请公网 IP，然后将公网 IP 绑定到 VPC。详见 [QingCloud 官方文档](https://docs.qingcloud.com/product/network/eip)。

![申请公网 IP](/create-EIP.png)

2、勾选创建的 公网 IP，点击 **绑定到 VPC 网络**，弹窗中选择第一步创建的 VPC 网络。

![绑定VPC](/bound-vpc.png)

> 若准备将应用部署到 AWS 运行环境，参见 [部署 Wordpress 到 AWS](../deploying-app-on-aws)。


## 部署应用

### 第一步：查看应用

点击 **商店**，找到开发者发布的 Wordpress 应用，点击 **部署** 进入部署详情页。

![查看应用](/view-wordpress.png)

### 第二步：填写部署信息

填写应用部署的基本信息，选择之前创建的运行环境，本示例 MySQL 和 Wordpress 节点设置选择默认的最低参数，选择创建的子网，完成部署。

![填写部署信息](/deploy-cluster-qingcloud.png)

### 第三步：查看部署情况

左边菜单栏选择 **集群**，可以查看刚刚部署应用的集群实例，应用部署后将创建 frontgate 和 Wordpress 两个集群。其中 frontgate 包含 proxy 和 etcd，负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能，由系统自动创建。Wordpress 集群包含 MySQL 和 Wordpress 两个角色的节点，部署成功后，将会在 QingCloud 运行环境创建 3 台主机。

![查看部署情况](/cluster-detail-qingcloud.png)

### 第四步：访问 Wordpress

可以在 [QingCloud 控制台](https://console.qingcloud.com/pek3a/instances/) 上查看创建的主机状态以及 IP 情况。待创建成功后可以通过 [VPC 端口转发](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86) （Wordpress 默认端口为 80）并在防火墙放行对应的端口，即可在浏览器通过公网 IP 和转发的端口如 `http://139.198.177.98:8000` 来访问 Wordpress。

![Wordpress 主页](/wordpress-page.png)

> 应用部署成功后，若需要管理部署的集群如停用或删除集群，参考 [集群管理](../cluster-management)。