---
title: "普通用户"
---

如果您是使用 OpenPitrix 平台的普通用户，那么本篇文档可以帮助您快速开始相关的基础功能操作。当开发者提交的应用通过审核后，普通用户即可在应用商店访问应用并部署至多个云运行环境。由于在技术审核中已演示了部署至 QingCloud 和 Kubernetes 运行环境，因此本篇以部署应用至阿里云为例。

## 前提条件

- Wordpress 示例应用已上架至应用商店，若还未上架请参考 [应用审核](../getting-start/app-review)；
- 已有普通用户的账号 `regular@op.com`，若还未创建请参考 [管理员快速入门](../getting-start/admin-quick-start)。
- 已有阿里云账号，已预先创建了专有网络。

## 部署应用至阿里云

### 第一步：访问应用商店

1、以普通用户的账号 `regular@op.com` 的身份登录 OpenPitrix，在应用商店即可看到 Wordpress 应用，点击进入该应用。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618083644.png)

2、普通用户可以查看应用的基本信息、应用服务商信息、使用说明等。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618083818.png)

3、选择交付类型为 `VM` 版本，点击 「立即部署」，然后点击 「创建环境→」，选择 `Aliyun`。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618084054.png)

### 第二步：创建阿里云运行环境

1、点击 「继续」，Aliyun 环境授权信息参考如下获取，并填入密钥信息：

> 获取 QingCloud API 密钥 ID：
> - 登录[阿里云控制台](https://home.console.aliyun.com/)；
> - 进入 [安全信息管理](https://usercenter.console.aliyun.com/#/manage/ak/) 界面；
> - 点击 [创建](https://usercenter.console.aliyun.com/#/manage/ak/)，并下载密钥文件。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618084603.png)

2、设置环境信息，区域需要根据专有网络所在的区域来选择。例如本示例已预先在阿里云账号的 `cn-beijing` 中创建了专有网络，因此区域选择 `cn-beijing`，名称和备注可自定义。完成后点击 「继续」。

> 注意，添加云平台作为云环境的前提是该环境必须已创建了专有网络。


- 区域：cn-beijing
- 名称：aliyun-test-runtime
- 备注：阿里云测试环境

> 若准备将应用部署到 AWS 运行环境，参见 [部署 Wordpress 到 AWS](../manual-guide/deploying-app-on-multicloud#部署应用至-aws)。

### 第三步：部署实例

1、该应用实例将默认部署至上一步创建的 **aliyun-test-runtime** 的专有网络中，节点设置保留默认，点击 「部署」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618085111.png)

2、在 OpenPitrix 测试实例的列表页也可以查看到该应用的实例信息，该应用将自动部署至阿里云平台主机并绑定硬盘。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618091259.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618111237.png)


> 第一次部署由于需要从公网上下载必要的系统镜像，通常创建时间会比较长，应用部署成功后，这些镜像会缓存在 frontgate，以后再创建其它集群就从缓存中拉取系统镜像。若需要管理部署的集群如停用或删除集群，参考 [集群管理](../manual-guide/cluster-management)。


### 清理资源

在 「我的实例」下勾选全部节点，即可删除应用的实例，即删除该应用部署在阿里云上用到的所有资源。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618173210.png)


至此，您已经基本了解了 OpenPitrix 平台对应用的全生命周期管理和其中多个常用角色的基本工作流程，建议您进一步熟悉和使用 OpenPitrix 平台，[用户指南](../manual-guide/introduction) 和 [开发指南](../developer-guide/introduction) 提供更详细的文档说明，若在实际使用时遇到问题，参见 [常见问题](../faq) 或联系我们技术团队为您解答。