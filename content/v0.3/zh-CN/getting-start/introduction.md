---
title: "入门必读"
---

OpenPitrix 提供了应用创建、打包上传、应用审核、应用商店、测试部署、仓库管理、运行环境管理、集群管理、版本管理、应用分类等功能，对应用的生命周期有完整的管理机制。本示例中开发者可使用我们准备的示例应用配置包，或者参考 [OpenPitrix 开发规范](../../developer-guide/openpitrix-specification) 或 [Helm Chart 开发规范](../../developer-guide/helm-specification) 完成应用的开发。开发者准备好应用配置包后即可打包上传提交到 OpenPitrix 平台。管理员可以测试和部署提交的应用，并能够对提交的应用进行审核，待审核通过后开发者即可发布应用到应用商店。普通用户可在应用商店浏览应用和部署应用到多云的运行环境，如 Kubernetes、QingCloud、AWS 等运行环境。

本文旨在帮助您了解通过 OpenPitrix 平台管理应用生命周期的基本工作流程，带您快速上手 OpenPitrix。快速入门包含三篇文档，依次从开发者、平台管理员、普通用户等角色详细说明各角色的工作流程，以上传和部署一个基于 OpenPitrix 开发规范的 Wordpress 应用为示例。

- [开发者](../developer-quick-start)：描述了开发者创建仓库、创建应用和上传应用、提交审核、创建新版本等工作流程。
- [管理员](../admin-quick-start)：描述了管理员审核应用和下架应用的工作流程。
- [普通用户](../regular-user-quick-start)：描述了用户创建运行环境、创建 QingCloud 平台资源、部署应用等工作流程。

## 前提条件

正式开始前，需要准备好以下资源：

 - 已成功安装了 OpenPitrix，若没有请参照 [安装指南](../../installation/installation-guide) 安装 OpenPitrix，且部署的集群能够访问外网。
 
 - 已有 OpenPitrix 管理员账号 (安装指南已提供默认的管理员登录方式)，已登陆 OpenPitrix 控制台并为开发者和普通用户创建了账号，参见 [用户管理](../../user-guide/user-management/#创建用户)。
 
 - 已有 [QingCloud 云平台](https://console.qingcloud.com/) 或 [AWS 云平台](https://www.amazonaws.cn/) 的账号，本示例仅演示以 QingCloud 云平台作为运行环境 (AWS 相关操作类似)。


