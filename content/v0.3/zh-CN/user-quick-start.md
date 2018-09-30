---
title: "快速入门"
---

OpenPitrix 提供了应用创建、打包上传、应用审核、应用商店、测试部署、仓库管理、运行环境管理、集群管理、版本管理、应用分类等功能，对应用的生命周期有完整的管理机制。开发者可以参考 [OpenPitrix 开发规范](../openpitrix-specification) 或 [Helm Chart 开发规范](../helm-specification) 完成应用的开发，完成后即可打包提交到 OpenPitrix，本示例中也可使用我们准备的示例应用配置包。管理员可以测试和部署提交的应用，并有权限对提交的应用进行审核，待审核通过后开发者即可发布应用到应用商店。普通用户可在应用商店浏览应用和部署应用到多云的运行环境，如 Kubernetes、QingCloud、 AWS等运行环境。

以下将从各个角色详细说明应用的打包上传、应用审核、应用上架、测试部署、版本管理的流程，以打包部署一个 Wordpress 应用为示例，带您快速上手 OpenPitrix。

## 前提条件

创建应用前，需要准备好以下资源：

- a. 已成功安装了 OpenPitrix，若没有请参照 [安装指南](../openpitrix-install-guide) 安装 OpenPitrix，且部署的集群能够访问外网。
- b. 已有 OpenPitrix 管理员、开发者和普通用户权限的账号，若还未申请账号请参考 [用户管理](../user-management/#创建用户) 来创建账号或联系平台管理员为其创建账号。
- c. 已有 [QingCloud 云平台](https://console.qingcloud.com/) 或 [AWS 云平台](https://www.amazonaws.cn/) 的账号，本示例仅演示以 QingCloud 云平台作为运行环境。

## 第一步：创建仓库

1. 应用仓库目前支持创建基于 QingCloud 和 AWS 的对象存储，本篇示例以创建基于 QingCloud 的对象存储 QingStor 为例，可参考 [基于 QingStor 对象存储创建仓库](../repo-guide/#基于青云-qingstor-对象存储) 来创建存放配置包和索引文件的应用仓库。

## 第二步：创建应用

在 OpenPitrix 中，仅开发者拥有权限创建应用和创建新的版本，应用的开发支持 [OpenPitrix 开发规范](../openpitrix-specification) 或 [Helm Chart 开发规范](../helm-specification)。当开发者在本地完成开发并准备好应用配置包后（应用配置包是一组根据应用开发模版规范描述应用实例的文件组成，用于创建应用），即可登录 OpenPitrix 控制台上传自己的应用。

2.1. 为方便您快速熟悉 OpenPitrix，本示例准备了一个基于 [OpenPitrix 开发规范](../openpitrix-specification) 的 [WordPress](https://wordpress.org) 的应用配置包，且已准备好 Wordpress 与 MySQL 镜像并上传到了 Docker 镜像仓库，点击 [下载 Wordpress 应用配置包]()；同样，也可参考 [OpenPitrix 规范及应用开发 - 准备 Wordpress 配置文件](../openpitrix-developer-quick-start/#准备应用配置包) 的三个必须的配置文件，然后获取 [OpenPitrix 客户端工具](../openpitrix-developer-quick-start/#准备-openpitrix-客户端工具) 将配置文件打包（默认为 `.tgz` 格式），即可生成一个 Wordpress 应用配置包。

> 说明：基于 OpenPitrix 开发规范准备的应用可以部署到 QingCloud、AWS 这类云运行时环境（Runtime），若要部署到 Kubernetes 运行环境则需要基于 Helm Chart 开发规范来准备应用配置包。

2.2. 开发者登录 OpenPitrix 控制台，选择左边菜单栏 **My Apps**，然后点击 **“+”** 或点击 **创建**。

![创建应用](/overview-page.png)

2.3. 选择第一步中创建的应用仓库 ”OpenPitrix-repo“，点击 **下一步**。
![选择仓库](/select-repo.png)

2.3. 从本地上传应用配置包，注意，配置文件中应用的名字（package.json 的 name 字段值）不能与应用仓库中已有应用的名字重复，否则将无法上传。

![上传应用配置包](/upload-package.png)

2.4. 若配置包符合开发规范，则提示上传成功。配置包上传成功后，开发者和管理员可部署和测试应用，或在 **我的应用** 中查看。

![上传成功](/upload-success.png)

## 第三步：应用提交审核

3. 此时在 **My apps** 下应用列表中可以看到上传的应用，状态显示为 **待提交**。若当前版本测试已通过，可以将此应用版本提交管理员审核。但需要注意的是，提交审核之前请完善必要的应用信息，比如可在应用描述中详细介绍应用的功能以及特性，若用户想进一步了解应用时，描述内容的完整将变得尤为重要。应用提交后，状态则变为 “已提交”。

![Wordpress 待提交](/ready-to-submit-zk.png)

若开发者提交应用版本后想撤回提交，可以点击 **取消**，状态将从 ”已提交“ 变为 ”待提交“。

## 第四步：管理员审核

4.1. 管理员登录控制台后，可以对提交的应用版本测试和部署并对其审核。点击左侧菜单栏 **商店** 进入 **应用审核**，即可看到待审核的应用列表，点击刚上传的 Wordpress 应用，可查看应用的详情和部署应用。

![管理员审核](/admin-review.png)

4.2. 若点击 **通过**，开发者即可将应用发布到应用商店，若点击 **拒绝** 则开发者需要调整后重新提交审核。审核过程通常需要 2-3 个工作日，若审核不通过则需要修改和重新提交。此处点击 **通过**，审核通过后开发者即可发布应用到商店。

![审核详情页面](/app-review-page.png)

同时，为了更好地管理应用，OpenPitrix 提供管理员应用的分类管理功能，在应用商店中可根据分类来查看各类应用，如 Database，BigData，Container 等等，新创建的应用默认在 “未分类” 下。仅管理员能够创建应用分类，并将应用添加到分类中。可参考 [分类管理](../category-management.md) 将应用添加到新建的分类中。

## 第五步：发布应用

5.1. 当管理员审核通过后，应用版本的状态将变为 “已通过”，开发者可以根据自己的计划来选择时间上架此应用。应用一旦上架则意味着应用会出现在 **商店** 的应用列表中，用户可以随时浏览并部署应用，后续将引入财务管理支持用户购买应用。注意，上架的应用版本不允许再做任何修改，如有问题需要修复或服务需要升级请按上面的步骤提交新版本，等待审核通过后可以上架新版本，还可联系管理员将旧版本下架或删除。

![发布 app 页面](/release-app-dev.png)

5.2. 发布应用后，应用状态变为 “已上架”。在 **我的应用** 和 **商店** 都可以看到上架应用的详细信息。

## 第六步：创建运行环境

6.1. 以普通用户的身份登录，点击 **我的环境**，然后点击 **”+“** 创建运行环境。因为基于 OpenPitrix 开发规范准备的应用可以部署到 QingCloud、AWS 这类云运行时环境（Runtime），以创建 QingCloud 运行环境为例，如需创建 AWS 或 Kubernetes 运行环境则参考 [运行环境管理](../runtime-management/#创建运行环境)。


6.2. 填写运行环境的配置信息，完成后点击 **确定**。

- 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索。
- 提供商：选择 QingCloud （若应用配置包是基于 [Helm Chart 开发规范](../helm-specification) 则选择 Kubernetes 运行环境）。
- URL：填写公有云的 API server 地址，比如  QingCloud ：[https://api.qingcloud.com](https://api.qingcloud.com)。
- 密钥：Access Key ID 和 Secret Access Key。若选择 QingCloud，填写 QingCloud 平台上生成的 [API 秘钥](https://console.qingcloud.com/access_keys/)。填写后点击 **验证** 检查连接是否正确。
- 区域：是云平台上的可用区，决定集群和资源将部署在云平台的哪个区域。填写正确的 URL 及 API 秘钥信息后，即可从下拉列表中选择。
- 描述：简单介绍运行环境的主要特性，让用户进一步了解该运行环境。
- 标签：用于标识该运行环境和匹配应用仓库，此处暂不作设置。

![](/qingcloud-runtime-wp.png)

## 第七步：准备 QingCloud 平台资源

若要将商店的应用部署到 QingCloud 运行环境，则需依赖平台的网络资源，并自动创建集群，需提前创建好资源。

7.1. 参考 [青云官方文档](https://docs.qingcloud.com/product/network/vpc) 创建 VPC。
7.2. 创建私有网络并加入 VPC。
7.3. 参考 [青云官方文档](https://docs.qingcloud.com/product/network/eip) 创建公网 IP，然后将公网 IP 绑定到 VPC。

> 若准备将应用部署到 AWS 运行环境，参考 [部署 Wordpress 到 AWS](../aws-quick-start.md)。

## 第八步：部署应用

8.1. 普通用户登录控制台后，可在 **商店** 查看已上架的应用，可以通过 ID 或应用名称搜索应用，点击图标可查看应用的详细信息。

![应用商店详情](/appstore-view.png)

8.2. 应用详情页显示应用的简介和描述信息、应用版本、首页链接、代码仓库、维护者、创建时间、仓库和分类等信息。点击 **部署**，填写配置信息，用户可以将应用 Wordpress 部署到刚创建的运行环境中。

![应用详情页](/zk-details.png)

8.3. 填写应用部署的信息，选择第六步创建的运行环境，本示例 MySQL 和 Wordpress 节点设置选择默认的最低参数，选择第七步创建的子网，完成部署。

![Wordpress 部署信息](/deployment-wp.png)

应用部署后将创建 frontgate 和 Wordpress 两个集群。其中 frontgate 包含 proxy 和 etcd，负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能，由系统自动创建，Wordpress 集群包含 MySQL 和 Wordpress 两个角色的节点，部署成功后，将会在 QingCloud 运行环境创建 3 台主机。此时可以通过 [VPC 端口转发](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86) （Wordpress 默认端口为 80）并在防火墙放行对应的端口，即可在浏览器通过公网 IP 和转发的端口如 [http://139.198.177.98:8000](http://139.198.177.98:8000) 来访问 Wordpress。

![Wordpress 主页](/wordpress-page.png)

应用部署成功后，若需要管理部署的集群如停用或删除集群，参考 [集群管理](../cluster-management.md)。


## 应用版本管理

“应用版本”对于一款应用来说是非常重要的概念。一款应用从创建、发布到更新，很可能需要提交多个应用版本，且每个版本中都包括完整的应用服务功能，其主要属性如下:

- ID：应用版本的 ID，由系统自动生成，也可用于搜索该应用。
- 名称：请为您的应用版本命名一个规范的版本名或版本号，帮助用户辨别应用的版本信息。
- 压缩包：文件格式支持TAR，TAR.GZ，TAR.BZ和ZIP
- 描述：简单介绍当前应用版本的主要功能和特性，让用户进一步了解该版本的更新信息。

### 创建应用版本
了解了应用版本的主要属性后，我们开始创建新的应用版本。注意，版本号将匹配应用配置包中配置文件的 `version` 字段，且配置文件中的 `version` 字段的值（版本号）不能与该应用已上传的版本号重复，且应用名 (package.json 中 "name" 字段的值) 应该保持不变， 因此上传前需修改 `version` 的值，如下将 version 从 0.1.0 修改为 0.1.2，然后重新生成一个配置包。

```
"version":"0.1.2"
```

若已有一个或多个版本存在，可以点击 **Create version** 按钮，上传新的应用配置包成功后，点击 **提交**，创建新的应用版本。

![创建应用版本-Wordpress](/create-new-version-wp.png)

![提交应用版本](/new-version-submit.png)

同样，待新创建的应用版本审核通过后，可将新的版本发布到商店的同款应用下。

## 下架应用

下架应用需要联系管理员，提交下架申请并等待管理员审核，下架的应用版本可能还有用户在使用，所以对于用户而言开发者依旧要给予及时的响应和服务。当所有版本都下架时该应用也会自动下架。

如果管理员要下架某款应用，在应用列表中点击应用进入详情页，点击 **暂停** 即可下架应用。若要恢复上架可以点击 **恢复**。

![下架应用](/suspend-app.png)
