---
title: "产品功能"
---

OpenPitrix 作为一款开源多云应用程序管理系统，支持将多种应用类型部署到多个云平台，并且它对云平台的支持是高度可扩展和插拔的。OpenPitrix 的设计着眼于应用的全生命周期管理，并将支持基于应用的商业运营，功能包括以下内容：

|   功能    |       说明      |  
|------------|--------------|
| 多云平台支持 | 支持多个云平台，如 AWS、Azure、Kubernetes、QingCloud、OpenStack、VMWare 等等, 可以是公有云，也可以是私有云。 | 
| 多应用类型支持 | 支持多种应用程序的类型：传统应用、微服务应用、SaaS 应用、Serverless 应用等等。 | 
| 多打包规范支持 | 应用配置包支持 OpenPitrix 规范 (沿用 [AppCenter](https://docs.qingcloud.com/appcenter/docs/specifications/specifications.html) 成熟的规范)、Kubernetes 原生 yaml 规范、Kubernetes 包管理器 [Helm](https://docs.helm.sh/) 规范。 | 
| 高度可扩展和可插拔 | 确保无论未来出现了何种新的云服务商，或者是新的应用类型，或者是新的打包规范，OpenPitrix 都可通过添加相应插件的方式支持它。 | 
| 应用全生命周期管理 | 为每个应用版本划分不同状态，如开发中、已上线、已下线、删除等，用户可以一键部署，同时可以控制后续应用实例的升级、扩容、更新等操作。| 
| 商业运营支持 | 平台为开发者提供管理和运维、计量计费、查看报表及统计信息等功能，开发好的应用可以放到公共市场，或者专有市场上去售卖。| 

### 路线图

为了让您更清晰地了解我们产品各版本的计划和功能规划，请参见 [OpenPitrix Roadmap](https://github.com/openpitrix/openpitrix/blob/master/docs/Roadmap-zh.md)，它是 OpenPitrix 核心开发团队预期的产品开发计划和功能列表，按照版本和角色模块进行功能的划分，详细说明了 OpenPitrix 的计划与未来走向以及愿景。OpenPitrix 将会逐步发展为多云环境下应用程序管理系统的全方位的解决方案。