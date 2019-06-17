---
title: "产品功能"
---

OpenPitrix 作为一款开源多云应用程序管理系统，支持将多种应用类型部署到多个云平台，并且它对云平台的支持是高度可扩展和插拔的。OpenPitrix 的设计着眼于应用的全生命周期管理，并将支持基于应用的商业运营，功能包括以下内容：

|   功能    |       说明      |  
|------------|--------------|
| 多云平台支持 | 这个云平台可以是 AWS、Kubernetes、QingCloud、OpenStack 等；既可以是公有云，也可以是私有云。OpenPitrix 会针对于每个云平台服务商提供相应的 ProviderPlugin 来管理应用程序 | 
| 多应用类型支持 | 支持多种应用程序的类型：传统应用、分布式应用、容器类应用、微服务应用、SaaS 应用、Serverless 应用等等 | 
| 多打包规范支持 | 应用配置包支持 OpenPitrix 规范 (沿用 [AppCenter](https://docs.qingcloud.com/appcenter/docs/specifications/specifications.html) 成熟的规范)、Kubernetes 原生 Yaml 规范、Kubernetes 包管理器 [Helm](https://docs.helm.sh/) 规范。 | 
| 高度可扩展和可插拔 | 确保无论未来出现了何种新的云服务商，或者是新的应用类型，或者是新的打包规范，OpenPitrix 都可通过添加相应插件的方式支持它。 | 
| 应用全生命周期管理 | OpenPitrix 会对每一个应用版本划分成多个不同的生命周期，比如开发中、审核中、已上线、已下线、删除等。开发好的应用可以发布，最终用户可以在应用中心上安装部署这个应用，同时他可以维护这个应用后续升级、扩容、更新等生命周期的操作。| 
| 商业运营支持 | 开发者可以在 OpenPitrix 平台上便捷地开发应用，开发好的应用可以上传到专有市场或者公有市场售卖，平台会为其提供计量计费、统计报表等一系列的功能。开发好应用，最终用户可以在自有平台上进行购买和部署。任何基于 OpenPitrix 所开发的应用，可以在任何 OpenPitrix 应用管理平台上进行售卖| 

### 路线图

为了让您更清晰地了解我们产品各版本的计划和功能规划，请参见 [OpenPitrix Roadmap](https://github.com/openpitrix/openpitrix/blob/master/docs/Roadmap-zh.md)，它是 OpenPitrix 核心开发团队预期的产品开发计划和功能列表，按照版本和角色模块进行功能的划分，详细说明了 OpenPitrix 的计划与未来走向以及愿景。OpenPitrix 将会逐步发展为多云环境下应用程序管理系统的全方位的解决方案。