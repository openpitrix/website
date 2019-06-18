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

### 第三步：完善应用信息

在 Wordpress 下点击左侧 「应用信息」，然后在表单中参考如下完善`基本信息`和`使用说明`，完成后点击 「保存」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616193348.png)

请继续参考 [应用审核](../quick-start/app-review)，将此应用版本提交给应用服务商、商务和技术审核。



