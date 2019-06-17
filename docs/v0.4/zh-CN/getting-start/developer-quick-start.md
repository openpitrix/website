---
title: "开发者"
---

OpenPitrix 旨在帮助软件开发者以极低的学习成本快速部署自己的应用到多云的运行环境中并提供一站式的平台方便管理用户的资源和环境，如果您开发基于 OpenPitrix 平台的应用，那么本篇文档可以帮助您快速开始相关的基础功能操作，主要描述了开发者创建应用和上传应用、提交审核、发布应用等工作流程，流程中的相关文档链接页涵盖了更详细的内容介绍。

## 前提条件

已创建了开发者的账号 `developer@op.com`，若还未创建请参考 [应用服务商快速入门](../developer-quick-start)。

## 创建应用

### 第一步：准备应用配置包

为方便您快速熟悉 OpenPitrix，本示例准备了一个 Wordpress 应用，包括了 2 个 [WordPress](https://wordpress.org)  以下应用配置包，且示例已准备好 Wordpress 与 MySQL 镜像并上传到了 Docker Hub 镜像仓库：


- 基于 [OpenPitrix 开发规范](../../developer-guide/openpitrix-specification)：点击下载 [Wordpress-0.3.0.tar](https://openpitrix.anybox.qingcloud.com/s/9iNpm77Z2RAOQFUQBSv1luQEHvWTEGdY?type=folder&id=527923)；
- 基于 [Helm Chart 开发规范](https://helm.sh/docs/)，点击下载 [Wordpress-0.3.0.tgz](https://openpitrix.anybox.qingcloud.com/s/9iNpm77Z2RAOQFUQBSv1luQEHvWTEGdY?type=folder&id=527917)。


> - 同样，也可参考 [OpenPitrix 规范及应用开发 - 准备 Wordpress 配置文件](../../developer-guide/openpitrix-developer-guide/#准备应用配置包) 的三个必须的配置文件，然后获取 [OpenPitrix 客户端工具](../../developer-guide/packaging-openpitrix-app/#准备-openpitrix-客户端工具) 将配置文件打包 (默认为 `.tgz` 格式)，即可生成一个 Wordpress 应用配置包。注意，基于 OpenPitrix 开发规范准备的应用可以部署到 QingCloud、阿里云、AWS 这类云运行时环境 (Runtime)。
>
> - 若要部署到 Kubernetes 运行环境则需要基于 [Helm Chart 开发规范](../../developer-guide/helm-specification) 来准备应用配置包，或下载 Helm Chart Package 文件夹下的 [wordpress-0.3.0.tar](https://openpitrix.anybox.qingcloud.com/s/9iNpm77Z2RAOQFUQBSv1luQEHvWTEGdY)。参见 [部署 Wordpress 到 Kubernetes](../../user-guide/deploying-app-on-k8s)。


### 第二步：上传应用

#### 上传 VM 版本 

1、切换开发者账号 `developer@op.com` 登录 OpenPitrix 控制台，然后点击 **“创建第一个应用”**。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190615090717.png)

2、本示例以上传一个基于虚拟机的应用作为示例，因此选择应用类型为 ”VM“，点击 **继续**。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190615090838.png)

3、从本地上传 VM 配置文件，此处上传第一步下载的 `WordPress-0.1.0.tgz` (文件格式支持 TAR, TAR.GZ, TAR.BZ 和 ZIP)。若配置包符合开发规范，则提示上传成功，然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616192044.png)

4、确认应用基本信息，开发者可以在此步骤添加应用 Logo，点击 「选择文件」 上传图片，然后点击 「完成」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190615091507.png)

#### 上传 Helm 版本

OpenPitrix 的每个应用都支持多种交付方式，每种交付方式的版本是相互独立的。

1、点击上传的应用 Wordpress 进入应用详情页，在 Helm 一栏点击 「+新版本」，参考上述步骤，上传 `wordpress-0.3.0.tar` 作为该应用的 Helm 版本。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616191037.png)

2、配置包上传成功后，开发者、应用服务商和管理员可部署和测试应用，或在 **我的应用** 中查看。由于测试部署的步骤将由技术审核用户来演示，因此此处暂不演示开发者的测试部署步骤。注意，实际使用中请开发者提交审核前务必完成应用的基本功能的测试。

>提示： 如果测试部署应用需要先创建运行环境，请参考 [普通用户](../regular-user-quick-start) **创建运行环境** 章节。

### 第二步：完善应用信息

在 Wordpress 下点击左侧 「应用信息」，然后在表单中参考如下完善`基本信息`和`使用说明`，完成后点击 「保存」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616193348.png)


## 应用提交审核

### 第一步：提交 Helm 版本

此时在 **Wordpress** 版本管理页中可以看到待审核的应用，两个版本的状态均显示为 **待提交**。若当前版本部署测试已通过，可以将此应用版本提交给技术和商务审核。但需要注意的是，提交审核之前请完善必要的应用信息，比如可在应用描述中详细介绍应用的功能以及特性，若用户想进一步了解应用时，描述内容的完整将变得尤为重要。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616194329.png)

1、例如，点击 「待提交」 进入 Helm 版本，点击右上角 「提交审核」，弹窗中点击确认提交审核。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616194727.png)

2、检查应用和版本信息，检查后仅需点击 「继续」，预览应用时需确认应用详情与使用说明。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616194920.png)

4、验证无误后点击 「完成」，即可完成提交审核。此时该应用的 Helm 版本显示为 `等待审核`。

> 提示：若开发者提交应用版本后想撤回提交，可以点击 **取消**，状态将从 “等待审核” 变为 “待提交”。 

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616195532.png)

### 第二步：提交 VM 版本

参考上述步骤，在 Wordpress 的版本管理页面，提交该应用的 VM 版本。提交 VM 版本完成后可以看到该版本也显示 `等待审核`。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616200250.png)

## 审核应用

一款应用在上架至应用商店之前，通常需要经过应用服务商审核、商务审核和技术审核等步骤。不同的审核对象需要各司其职，例如对应用进行测试部署、应用服务商认证信息检查、基本信息和使用说明的检查、配置文件的校验。

### 第一步：应用服务商审核

1、使用账号 `isv@op.com` 登录 OpenPitrix，进入 「应用管理」→「应用审核」，在 “未处理” 的列表中可以看到该应用的两个版本，先以审核 VM 版本为示例，点击 「开始处理」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616230240.png)

2、应用服务商可以对应用进行部署测试。由于测试部署的步骤将由技术审核用户来演示，因此此处暂不演示开发者的测试部署步骤。注意，实际使用中请应用服务商通过审核前务必完成应用的基本功能的测试，并检查应用的基本信息、使用说明等。


3、在右侧点击 「通过」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616200913.png)

### 第二步：商务审核

1、使用商务审核的账号 `bussiness@op.com` 登录 OpenPitrix，进入 「应用管理」→「应用审核」，在 “未处理” 的列表中即可看到上一步 ISV 通过审核的 VM 版本的 Wordpress，点击「开始处理」进入应用审核详情页。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616201739.png)

2、此时商务审核需要对应用服务商认证信息检查、基本信息和使用说明的检查。若符合应用上架的基本要求才能点击 「通过」。

**应用服务商认证信息**

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616234152.png)

**使用说明**

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616234250.png)


### 第三步：技术审核

1、使用技术审核的账号 `tech@op.com` 登录 OpenPitrix，同上，进入 「应用管理」→「应用审核」，在 “未处理” 的列表中即可看到通过上一步商务审核的 VM 版本的 Wordpress，点击「开始处理」进入应用审核详情页。

2、此时技术审核需要对应用的配置文件下载至本地预览和部署测试，点击 「部署测试」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616235804.png)

3、点击 「创建测试环境 →」，本示例选择将 VM 类型的应用 Wordpress 部署至 [QingCloud](https://console.qingcloud.com)，若您有其它云环境的账号，也可以自行选择 AWS 或阿里云作为测试环境。

注意，添加云平台作为云环境的前提是该环境必须已有 VPC 和私有网络。选择 QingCloud 然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617004118.png)

4、在添加 QingCloud 环境页面参考如下步骤添加 API 密钥信息作为**授权信息**。

> 获取 QingCloud API 密钥 ID：
> - 登录 [QingCloud 控制台](https://console.qingcloud.com/)；
> - 进入「[API 密钥](https://console.qingcloud.com/access_keys/)」管理界面；
> - 点击创建，并下载密钥文件。

5、输入 API 密钥相关信息后，点击 「验证」，然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617005405.png)

6、设置环境信息，区域需要根据 VPC 和私有网络所在的区域来选择，例如本示例已预先在 [QingCloud 上海1区 - A](https://console.qingcloud.com/sh1a/routers/) 的账号中创建了 VPC 和私有网络，因此区域选择 sh1a，名称和备注可自定义。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617095054.png)


## 发布应用

1、当管理员审核通过后，应用版本的状态将变为 “已通过”，开发者可以根据自己的计划来选择时间上架此应用。应用一旦上架则意味着应用会出现在 **商店** 的应用列表中，用户可以随时浏览并部署应用，后续将引入财务管理支持用户购买应用。注意，上架的应用版本不允许再做任何修改，如有问题需要修复或服务需要升级请按上面的步骤提交新版本，等待审核通过后可以上架新版本，还可联系管理员将旧版本下架或删除。

![发布 app 页面](/release-app-dev.png)

2、发布应用后，应用状态变为 “已上架”。在 **我的应用** 和 **商店** 都可以看到上架应用的详细信息。

![应用详情页](/zk-details.png)

至此，您已经基本了解了开发者在 OpenPitrix 平台上传和发布应用的基本工作流程，若需要对当前的应用版本做升级，可创建新的应用版本，参见 [应用版本管理](../../user-guide/app-management/#应用版本管理)。建议您继续阅读快速入门之 [管理员](../admin-quick-start) 和 [普通用户](../regular-user-quick-start)。

完成本篇操作后建议您继续阅读 [管理员](../admin-quick-start) 和 [普通用户](../regular-user-quick-start) 的快速入门。
