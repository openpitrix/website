---
title: "入门必读"
---

OpenPitrix 提供了基于多租户的应用创建、打包上传、应用审核、应用商店、测试部署、仓库管理、运行环境管理、集群管理、版本管理、应用分类等功能，对应用的生命周期有完整的管理机制。OpenPitrix v0.4 提供了基于角色的访问控制 (RBAC)，平台内置了三类常用的角色，并支持用户自定义角色，对不同角色的用户有更细粒度的权限管理规则。

文档的示例中开发者可使用我们准备的示例应用配置包，后续可以进一步参考 [OpenPitrix 开发规范](../developer-guide/openpitrix-specification) 或 [Helm Chart 开发规范](../developer-guide/helm-specification) 完成应用的开发。

开发者准备好应用配置包后即可打包上传提交到 OpenPitrix 平台。管理员可以测试和部署提交的应用，并能够对提交的应用进行审核，待审核通过后开发者即可发布应用到应用商店。普通用户可在应用商店浏览应用和部署应用到多云的运行环境，如 Kubernetes、QingCloud、阿里云、AWS 等运行环境。

## 目的

本文旨在帮助您了解通过 OpenPitrix 平台管理应用生命周期的基本工作流程，带您快速上手 OpenPitrix。包含五篇文档，依次从平台管理员、应用服务商、开发者、应用审核与发布、普通用户等多种角色详细说明各角色的工作流程。本文档准备了一个 Wordpress 应用 (包含 VM 与 Heml 应用类型) 作为示例。

下图说明了快速入门文档演示的完整流程 (请从上至下看)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190703150151.png)

> - [管理员](../getting-start/admin-quick-start)：描述管理员创建不同的角色和用户，然后通过新建的各个示例用户，演示不同角色下创建应用、审核应用和下架应用的工作流程。
> - [应用服务商](../getting-start/developer-quick-start)：描述创建开发者账号、提交服务商认证。
> - [开发者](../getting-start/developer-quick-start)：说明创建应用和上传应用、提交审核、创建新版本等工作流程。
> - [应用审核与发布](../getting-start/app-review)：演示将应用版本提交给应用服务商、商务和技术审核，以及如何创建测试环境并部署至测试环境。
> - [普通用户](../getting-start/regular-user-quick-start)：描述了普通用户访问商店和应用、创建 Runtime 资源、部署应用等基本工作流程。


## 前提条件

正式开始前，需要准备好以下资源：

 > - 已成功安装了 OpenPitrix，若没有请参照 [安装指南](../installation/installation-guide) 安装 OpenPitrix，且部署的集群能够访问外网。
 > - 已有 OpenPitrix 管理员账号 (安装指南已提供默认的管理员登录方式)。
 > - 已有 [QingCloud 云平台](https://console.qingcloud.com/)、[阿里云](https://www.aliyun.com/) 或 [AWS 云平台](https://www.amazonaws.cn/) 的账号，已准备了 Kubernetes 集群。本示例演示以 QingCloud 云平台、阿里云和 Kubernetes 作为运行环境 (AWS 相关操作类似)。


