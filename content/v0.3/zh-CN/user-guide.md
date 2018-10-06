---
title: "用户指南"
---

## 基础模块

OpenPitrix 旨在帮助用户快速创建应用并将其部署到多云的运行环境中，具备对应用生命周期的管理，用户指南将介绍控制台中各个模块的操作说明，通过 OpenPitrix 页面可以看到以下几个模块：**总览**、**应用**、**运行环境**、**集群**、**仓库**、**商店**、**分类**、**用户**。

* [总览](../dashboard-management)：总览页提供当前用户下各项资源的入口和统计信息。
* 部署应用：通过三个示例说明如何将应用部署到 QingCloud、AWS 和 Kubernetes 等多云的运行环境中。
  * [部署 WordPress 到 QingCloud](../qingcloud-quick-start)
  * [部署 WordPress 到 AWS](../aws-quick-start)
  * [部署 WordPress 到 Kubernetes](../kubernetes-quick-start)
* [运行环境管理](../runtime-management)：管理云的运行时环境，如 AWS、Azure、Kubernetes、QingCloud、OpenStack、VMWare 等等，可以是公有云，也可以是私有云。
* [集群管理](../cluster-management)：管理和运维已部署到云的运行时环境上应用的集群实例。
* [仓库管理](repo-management)：仓库是独立于 OpenPitrix 的外部存储，可以是 AWS 的云存储，可以是青云 QingCloud 的对象存储，里面存储的内容是开发者开发好的应用的配置包以及索引文件。
* 商店管理：开发者提交的应用通过管理员审核后将上架商店，用户可以浏览和部署应用，且管理员能够创建和管理应用的分类。
   * [应用商店](../store-management)：查看和管理应用商店和分类。
   * [应用管理](../app-management)：创建应用及创建应用的新版本。
   * [分类管理](../category-management)：对上架的应用进行分类，在应用商店中可根据分类来查看各类应用，管理员有权限创建和管理分类。
* [用户管理](../user-management)：用户管理主要提供管理员对三种角色的账号权限管理。

| 角色 | 职责 |
|-------|------|
| 管理员 | 管理平台的仓库、商店、应用、应用分类、应用审核、运行环境、集群实例、用户权限等 |
| 开发者	| 开发应用和测试、提交审核、应用上架、版本管理等 | 
| 普通用户 | 注册运行环境，支持将商店中的应用部署到注册的运行环境中 |


## 快速入门

[快速入门](../user-quick-start.md) 帮助您快速上手 OpenPitrix，熟悉和体验应用生命周期管理的多项功能。










