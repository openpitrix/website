---
title: "部署 WordPress 到 QingCloud"
---

WordPress 是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。本指南以开发者角色为例，引导用户通过 OpenPitrix 控制台上传并部署一个后端为 MySQL 数据库的 WordPress 博客网站到您的 QingCloud 环境中去，帮助您快速上手 OpenPitrix。

## 前提条件

正式开始前，需要准备好以下资源：
 
 - 已有 OpenPitrix 开发者账号，开发者账号由管理员提供，参见 [用户管理](../user-management/#创建用户)。
 
 - 已有 [QingCloud 云平台](https://console.qingcloud.com/) 的账号，本示例以 QingCloud 云平台作为运行环境。

 - 已创建 QingStor 对象存储，详见 [基于 QingStor 创建对象存储](../repo-guide/#基于青云-qingstor-对象存储)。

## 创建仓库

1、以开发者角色登录 OpenPitrix，在菜单栏选择 **仓库**，然后点击 **创建**，填写仓库的配置信息，点击确认，详见 [仓库管理](../repo-management)。创建完成后，对象存储中存储的应用配置包会被自动索引成为可部署的应用。

![](/create-repo-vmbased.png)

创建仓库完成后，点击进去查看详情，可以发现里面的应用已经被自动导入。注意，如果后续仓库内的应用有更新，可以通过 **触发索引** 操作更新。

![](/trigger-indexer-vmbased.png)

## 创建环境

1、以普通用户角色登录 OpenPitrix，在环境列表页点击 **"+”** 按钮，将弹出创建创建运行环境的窗口。

2、填写运行环境的基本信息：

![](/create-runtime-qingcloud.png)

- 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索。
- 提供商：选择 QingCloud。
- URL：填写 QingCloud 的 API server 地址：[https://api.qingcloud.com](https://api.qingcloud.com)。
- 密钥：Access Key ID 和 Secret Access Key 填写 QingCloud 平台上生成的 [API 秘钥](https://console.qingcloud.com/access_keys/)。
- 区域：是云平台上的可用区，决定集群和资源将部署在云平台的哪个区域。填写正确的 URL 及 API 秘钥信息后，即可从下拉列表中选择。 
- 描述：简单介绍运行环境的主要特性，让用户进一步了解该运行环境。
- 标签：用于标识该运行环境和匹配应用仓库，比如设置 “env=testing” 可表示该运行环境是测试环境。

## 准备 QingCloud 平台资源

若要将商店的应用部署到 QingCloud 运行环境，则需依赖平台的网络资源，需提前创建好资源，应用部署到运行环境后将在  QingCloud 平台自动创建集群。

### 第一步：创建 VPC
在 QingCloud 可以预配置出一个专属的大型网络 - VPC 网络，登录 [QingCloud 控制台](https://console.qingcloud.com)，创建 VPC，详见 [青云官方文档](https://docs.qingcloud.com/product/network/vpc)。

![创建 VPC](/create-vpc.png)

### 第二步：创建私有网络

私有网络用于主机之间互联，它类似物理世界中使用交换机组成的局域网。不同用户的私有网络之间是完全隔离的。私有网络可以作为子网加入到 VPC 网络中。在控制台创建私有网络，并加入 VPC，详见 [青云官方文档](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86)。

![创建私有网络](/create-vxnet.png)

### 第三步：申请公网 IP

1、公网 IP 是在互联网上合法的静态 IP 地址。申请公网 IP，然后将公网 IP 绑定到 VPC。详见 [青云官方文档](https://docs.qingcloud.com/product/network/eip)。

![申请公网 IP](/create-EIP.png)

2、勾选创建的 公网 IP，点击 **绑定到 VPC 网络**，弹窗中选择第一步创建的 VPC 网络。

![绑定VPC](/bound-vpc.png)

> 若准备将应用部署到 AWS 运行环境，参见 [部署 Wordpress 到 AWS](../aws-quick-start.md)。

## 上传应用

### 第一步：准备应用配置包

为方便您快速熟悉 OpenPitrix，本示例准备了一个基于 [OpenPitrix 开发规范](../openpitrix-specification) 的 [WordPress](https://wordpress.org) 的应用配置包，且已准备好 Wordpress 与 MySQL 镜像并上传到了 Docker 镜像仓库，点击 [下载 Wordpress 应用配置包]()；

### 第二步：上传应用

1、开发者登录 OpenPitrix 控制台，选择左边菜单栏 **我的应用**，然后点击 **“+”** 或点击 **创建**。

![创建应用](/overview-page.png)

2、选择刚刚创建的应用仓库 ”test-repo-qingstor“，点击 **下一步**。
![选择仓库](/select-repo.png)

3、从本地上传应用配置包，注意，配置文件中应用的名字（package.json 的 name 字段值）不能与应用仓库中已有应用的名字重复，否则将无法上传。

![上传应用配置包](/upload-package.png)

4、若配置包符合开发规范，则提示上传成功。配置包上传成功后，开发者和管理员可部署和测试应用，或在 **我的应用** 中查看。

![上传成功](/upload-success.png)

## 部署应用

### 第一步：填写部署信息

点击 **部署 & 测试** 进入部署详情页，填写应用部署的基本信息，选择之前创建的运行环境，本示例 MySQL 和 Wordpress 节点设置选择默认的最低参数，选择创建的子网，完成部署。

![](/deploy-cluster-qingcloud.png)

### 第二步：查看部署情况

左边菜单栏选择 **集群**，可以查看刚刚部署应用的集群实例，应用部署后将创建 frontgate 和 Wordpress 两个集群。其中 frontgate 包含 proxy 和 etcd，负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能，由系统自动创建。Wordpress 集群包含 MySQL 和 Wordpress 两个角色的节点，部署成功后，将会在 QingCloud 运行环境创建 3 台主机。

![](/cluster-detail-qingcloud.png)

### 第三步：访问 Wordpress

可以在[青云 QingCloud 控制台](https://console.qingcloud.com/pek3a/instances/)上查看创建的主机状态以及 IP 情况。待创建成功后可以通过 [VPC 端口转发](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86) （Wordpress 默认端口为 80）并在防火墙放行对应的端口，即可在浏览器通过公网 IP 和转发的端口如 [http://139.198.177.98:8000](http://139.198.177.98:8000) 来访问 Wordpress。

![Wordpress 主页](/wordpress-page.png)

> 应用部署成功后，若需要管理部署的集群如停用或删除集群，参考 [集群管理](../cluster-management.md)。