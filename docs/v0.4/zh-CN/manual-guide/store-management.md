---
title: "应用商店"
---

应用商店是一个多云环境下的应用交付与运营管理平台，提供多种用来开发容器类应用和基于虚拟机的应用。让应用提供商和开发者可以从资源层管理的复杂性中脱离出来，从而更高效地开发、部署、运维及管理所提供的应用，让普通用户可以便捷地选择需要的应用来构建和管理自身的业务。

对于`普通用户`而言，商店是应用的交易中心，可以查看各个分类下（比如数据库、容器、中间件）的应用，包括应用的各个版本及应用详情，并能够在商店一键部署所需的应用到运行环境中。

对于`应用服务商`而言，应用服务商入驻申请通过后，服务商下的`开发者`可以将开发完成的应用提交给应用审核者，通过审核后应用将上架到应用商店，提供给普通用户使用，之后还能够在应用商店发布新的应用版本可供用户升级。

对于`管理员`而言，可对应用进行审核、部署和测试，以及对商店的应用进行分类。


## 查看应用商店

在 OpenPitrix 中，所有用户都可以在应用商店查看已上架的应用，搜索框支持通过应用名称或 ID 来搜索应用。

以普通用户登录，点击 **商店**，将显示包含所有分类的应用。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620193425.png)

点击应用图标，即可查看应用的详细信息。比如查看 Wordpress 应用详情，包括应用服务商信息、应用详情和使用说明。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620193505.png)

## 应用商店管理

### 全部应用

管理员有权限对应用商店的所有应用、应用审核和应用分类进行管理。

1、在全部应用下，可以看到已上架的所有应用的列表，包括该应用的基本信息。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620193900.png)

2、点击其中一个应用如 Wordpress，可进入该应用的部署详情，查看用户已部署的集群实例信息，以及已上架和下架版本，还包括审核记录等。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620194857.png)

3、管理员有权限下架应用，可点击 “···” 选择下架应用

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620194427.png)

### 应用审核

点击 「应用审核」，管理员有权限处理开发者提交的应用审核请求。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620195703.png)

点击其中一条应用审核记录，查看应用审核的详情以及审核进度。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620195534.png)

## 应用分类

应用分类用于对上架的应用进行按组分类，在应用商店中可根据分类来查看各类应用，如数据库、大数据与中间件、容器等等。仅管理员能够创建应用分类，并将应用添加到分类中。

### 创建分类

1、在控制台菜单栏中点击 **应用商店** —> **应用分类**，点击 「自定义」，填写分类名称并选择图标，即可完成分类的创建。创建成功后可通过分类列表页查看新建的分类，可通过关键字在搜索框进行搜索。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620200319.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620200516.png)

2、下一步，添加应用到分类。在未分类的应用列表点击其中一个应用，然后点击 **调整分类** 然后将该应用添加至新建的分类 “建站必备”，然后将 “未分类” 修改为 “Web服务”。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620214307.png)

3、在应用商店即可看到这两个分类，以及每个分类下的应用。