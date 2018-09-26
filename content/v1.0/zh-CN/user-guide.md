---
title: "用户指南"
---

## 基础模块

通过 OpenPitrix 页面可以看到以下几个模块：**仓库**、**应用**、**分类**、**运行环境**、**集群**、**商店**。

* 我的仓库：独立于 OpenPitrix 的外部存储，可以是 Google 的云存储，可以是青云 QingCloud 的对象存储，也可以是 GitHub，里面存储的内容是开发者开发好的应用的配置包以及索引文件。
* 我的应用：注册好仓库后，仓库中存储的应用配置包会被自动索引成为可部署的应用。
* 应用管理：创建应用及升级应用和版本，为应用进行分类等。
* 运行环境：云的运行时环境，如 AWS、Azure、Kubernetes、QingCloud、OpenStack、VMWare 等等，可以是公有云，也可以是私有云。
* 集群：管理和运维已部署到云的运行时环境上应用的集群实例。
* 商店：ISV 提交的应用通过管理员审核后将上架商店，用户可以浏览和部署。

## 快速入门

[快速入门](../user-quick-start.md) 帮助您快速上手 OpenPitrix，熟悉和体验应用生命周期管理的多项功能。

## 用户角色

| 角色 | 职责 |
|-------|------|
| 管理员 | 管理整个环境的仓库、应用、应用分类、应用审核、运行时环境等 |
| 开发者	| 开发应用和测试、提交审核、上架下架、应用运维等 | 
| 普通用户 | 注册运行时环境、应用市场上部署应用到自有的运行时环境中、应用评价等 |

参考 [用户管理](../user-management.md) 查看用户角色的权限详情和添加用户角色。

## 运行环境

目前 OpenPitrix 支持以下三种云运行时环境：AWS、QingCloud、Kubernetes

接下来将通过实例介绍如何将应用部署到每种云运行时环境中：

* [部署 WordPress 到 QingCloud](../qingcloud-quick-start)
* [部署 WordPress 到 AWS](../aws-quick-start)
* [部署 WordPress 到 Kubernetes](../kubernetes-quick-start)



