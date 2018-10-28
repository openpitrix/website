---
title: "运行环境管理"
---

## 简介

运行环境即云的运行时环境，它可以是 AWS、GCE、QingCloud、Aliyun、Kubernetes、OpenStack、VMware 等，可以是公有云，也可以是私有云。通过创建运行环境可以让 OpenPitrix 有权限访问这些云平台，从而实现多云环境下的应用部署和管理。

## 查看运行环境
所有权限级别的用户都能够查看运行环境。通过 OpenPitrix 控制台选择 **运行环境**，即可看到已创建的运行环境，列表中显示了云供应商、区域和集群数等基本信息，可通过云平台供应商来筛选运行环境。

![运行环境列表](/runtime-lists.png)

点击列表中任意一个运行环境，可查看运行在该运行环境中所有集群的基本信息，包括集群的集群名称、状态、应用、节点数量、用户和更新时间。

![运行环境详细信息](/runtime-details.png)

## 创建运行环境
1、在运行环境列表页点击 **"+”** 按钮，将弹出创建创建运行环境的窗口。

2、填写运行环境的基本信息：

- 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索。
- 提供商：云环境提供商（Provider）目前支持 QingCloud、AWS 和 Kubernetes，将会支持更多的提供商。若选择 QingCloud 或 AWS 这类公有云提供商则需填写 URL、密钥并选择区域，若选择 Kubernetes 则需要填写证书和命名空间。
- URL：填写公有云的 API server 地址，比如  QingCloud ：`https://api.qingcloud.com`。若选择 AWS，URL 则填写 AWS 公有云某个 region 的 API server 地址，比如：[https://ec2.us-east-2.amazonaws.com](https://ec2.us-east-2.amazonaws.com)。
- 密钥：Access Key ID 和 Secret Access Key。若选择 QingCloud，填写 QingCloud 平台上生成的 [API 秘钥](https://console.qingcloud.com/access_keys/)。若选择 AWS，在 Access Key ID 和 Secret Access Key 填写 AWS 平台上生成的 [API 秘钥](https://console.aws.amazon.com/iam/home?region=us-east-2#security_credential)，参见 [AWS 官方文档](https://docs.aws.amazon.com/zh_cn/general/latest/gr/managing-aws-access-keys.html)。
- 区域：是云平台上的可用区，决定集群和资源将部署在云平台的哪个区域。填写正确的 URL 及 API 秘钥信息后，即可从下拉列表中选择。 
- 证书：填写 Kubernetes 环境下 `~/.kube/config` 或 `/etc/kubernetes/admin.conf` 中内容。
- 命名空间：填写由小写字母和中划线组成的字符串，如 `runtime-demo`。
- 描述：简单介绍运行环境的主要特性，让用户进一步了解该运行环境。
- 标签：用于标识该运行环境和匹配应用仓库，比如设置 “env=testing” 表示该运行环境是测试环境，如果应用仓库的运行环境选择器也设置为 “env=testing” 时，则表示只有标签也是 “env=testing” 运行环境的才能部署该应用仓库中的应用。

**创建 Vm-based 运行环境**

![填写 vm-based 运行环境信息](/create-runtime-vm-based.png)

**创建 Kubernetes 运行环境**

![填写 k8s 运行环境信息](/create-runtime-k8s.png)


3、点击确定，完成创建，即可在运行环境列表页查看创建成功的运行环境。

## 修改运行环境
在运行环境列表页或详情页中，可以查看平台中所有的运行环境，点击运行环境列表项的右侧 “···” 可对其进行修改。注意，修改不支持变更运行环境的提供商。

![修改运行环境](/update-runtime-details.png)

## 删除运行环境

在运行环境列表页或详情页中，可以查看平台中所有的运行环境，点击运行环境列表项的右侧 “···” 可删除运行环境。
