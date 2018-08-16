---
title: "OpenPitrix 简介"
---

## 产品介绍

[OpenPitrix](https://openpitrix.io) 是一款开源多云应用程序管理系统。


## 产品功能

OpenPitrix 所希望实现的功能包括以下内容：

|   功能    |       说明      |  
|------------|--------------|
| 多云平台支持 | 支持多个云平台，如 AWS、Azure、Kubernetes、QingCloud、OpenStack、VMWare 等等, 可以是公有云，也可以是私有云。 | 
| 多应用类型支持 | 支持多种应用程序的类型：传统应用、微服务应用、SaaS 应用、Serverless 应用等等。 | 
| 多打包规范支持 | 应用配置包支持 OpenPitrix 规范（沿用[AppCenter](https://docs.qingcloud.com/appcenter/docs/specifications/specifications.html)成熟的规范）、Kubernetes 原生 yaml 规范、Kubernetes 包管理器 [Helm](https://docs.helm.sh/) 规范。 | 
| 高度可扩展和可插拔 | 确保无论未来出现了何种新的云服务商，或者是新的应用类型，再或者是新的打包规范，OpenPitrix都可通过添加相应插件的方式支持它。 | 
| 应用全生命周期管理 | 为每个应用版本划分不同状态，像开发中、已上线、已下线、删除等等，用户可以一键部署，同时可以控制后续应用实例的升级、扩容、更新等等操作。| 
| 商业运营支持 | 平台为开发者提供管理和运维、计量计费、查看报表及统计信息等功能，开发好的应用可以放到公共市场，或者专有市场上去售卖。| 

## 应用场景


OpenPitrix 典型的用户场景有：

* 某企业是采用了多云的系统（包括混合云），要实现一站式的应用管理平台，从而实现应用的部署和管理。
* 云管平台（CMP）可以将开源的 OpenPitrix 视为其其中一个组件，以实现在多云环境下资源加应用的统一管理。
* 可以作为 Kubernetes 的一个应用管理系统，并提供应用的全生命周期管理。
* 行业云或者专有云，他们有着自己的特殊行业应用，可以基于开源的 OpenPitrix，打造自身的 market place。