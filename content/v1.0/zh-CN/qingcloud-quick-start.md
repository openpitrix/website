---
title: "部署 WordPress 到 QingCloud"
---

WordPress 是使用 PHP 语言开发的博客平台，用户可以在支持 PHP 和 MySQL 数据库的服务器上架设属于自己的网站，也可以把 WordPress 当作一个内容管理系统（CMS）来使用。在本指南中，将引导用户通过 OpenPitrix 控制台部署一个后端为 MySQL 数据库的 WordPress 博客网站到您的 QingCloud 环境中去，帮助您快速入门 OpenPitrix。

## 创建仓库

以开发者角色登录 OpenPitrix，进入**我的仓库**标签页，点击右侧**创建**按钮

![](/create-repo-vmbased.png)

URL 填写 http://openpitrix.pek3a.qingstor.com/package/ ，这只是一个 demo 仓库，具体内容如下：

![](/repo-storage.png)

**云环境提供商（Runtime Provider）** 可以多选，其中 Kubernetes 与其他 Vm-based 环境应用配置包格式不同，这里可以选择 QingCloud 和 AWS，意味着当前仓库中的应用既可以部署到 QingCloud，也可以部署到 AWS。

创建好的仓库，点击进去查看，可以发现里面的应用已经被自动导入，如果后续仓库内的应用有更新，可以通过**触发索引**操作更新

![](/trigger-indexer-vmbased.png)

## 创建环境

以普通用户角色登录 OpenPitrix，进入**我的环境**标签页，点击右侧**创建**按钮

![](/create-runtime-qingcloud.png)

* **云环境提供商（Provider）** 选择 QingCloud。
* **URL** 填写 QingCloud 公有云的 API server 地址：https://api.qingcloud.com 。
* Access Key ID 和 Secret Access Key 填写 QingCloud 平台上生成的 [API 秘钥](https://console.qingcloud.com/access_keys/)。
* zone 在填写正确的 URL 及 API 秘钥信息后，可从下拉列表中选择。

## 部署应用

### 准备 QingCloud 平台环境

1. 创建 [VPC](https://console.qingcloud.com/pek3a/routers/)
2. 创建私有网络并连接到 VPC
3. 创建 [公网 IP ](https://console.qingcloud.com/pek3a/eips/)
4. 绑定公网 IP 到 VPC 

### 准备应用

通过**我的应用**找到 Wordpress 应用，或者通过**我的仓库**，进入刚创建的仓库详情页找到 Wordpress 应用

![](/app-vmbased.png)

### 部署应用

点击**部署**进入部署详情页，选择所需的资源情况以及应用版本，选择刚创建的 QingCloud 环境和私有网络，点击确定

![](/deploy-cluster-qingcloud.png)

### 查看部署情况

**运维中心** 中可以查看刚刚部署的应用实例，包括一个 Wordpress 集群和一个 frontgate 集群，当集群状态显示为 active 时表示创建成功。
> 其中 frontgate 负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能

![](/cluster-detail-qingcloud.png)

### 查看 Wordpress

可以在[青云 QingCloud 控制台](https://console.qingcloud.com/pek3a/instances/)上查看主机状态以及 ip 情况

![](/instance-qingcloud.png)

可通过 vpn 进入 VPC 所在的网络环境，或通过 VPC 配置端口转发随后访问 VPC 所绑定的公网 IP + 转发端口的方式访问 Wordpress 首页

![](/wordpress-qingcloud.png)