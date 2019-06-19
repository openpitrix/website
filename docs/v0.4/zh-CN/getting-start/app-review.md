---
title: "应用审核"
---

本文档演示将此应用版本提交给应用服务商、商务和技术审核，以及如何创建测试环境并部署至测试环境。

## 前提条件

- 已有 OpenPitrix 的应用服务商、开发者、商务审核、技术审核账号，若还未创建请参考 [管理员快速入门](../quick-start/admin-quick-start)。
- 已有 [QingCloud 云平台](https://console.qingcloud.com) 的账号 (或阿里云、AWS)，本示例仅以 QingCloud 云平台作为运行环境演示部署。
- 已有 Kubernetes 集群环境，建议使用 KubeSphere 作为 Kubernetes 运行环境，需要提前安装 KubeSphere，参考 [KubeSphere 安装指南](https://docs.kubesphere.io/advanced-v2.0/zh-CN/installation/intro/)。



## 应用提交审核

### 第一步：提交 Helm 版本

此时在 **Wordpress** 版本管理页中可以看到待审核的应用，两个版本的状态均显示为 **待提交**。若当前版本在开发者和 ISV 的部署测试已通过，可以将此应用版本提交给技术和商务审核。但需要注意的是，提交审核之前请完善必要的应用信息，比如可在应用描述中详细介绍应用的功能以及特性，若用户想进一步了解应用时，描述内容的完整将变得尤为重要。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616194329.png)

1、使用开发者账号 `developer@op.com` 登录 OpenPitrix，进入 Wordpress 应用详情页，点击 「待提交」 进入 Helm 版本，点击右上角 「提交审核」，弹窗中点击确认提交审核。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616194727.png)

2、检查应用和版本信息，检查后仅需点击 「继续」，预览应用时需确认应用详情与使用说明。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616194920.png)

4、验证无误后点击 「完成」，即可完成提交审核。此时该应用的 Helm 版本显示为 `等待审核`。

> 提示：若开发者提交应用版本后想撤回提交，可以点击 **取消**，状态将从 “等待审核” 变为 “待提交”。 

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616195532.png)

### 第二步：提交 VM 版本

参考上述步骤，在 Wordpress 的版本管理页面，提交该应用的 VM 版本。提交 VM 版本完成后可以看到该版本也显示 `等待审核`。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616200250.png)

## 审核应用 (VM 版本)

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

#### 创建测试环境 (QingCloud Runtime)

1、使用技术审核的账号 `tech@op.com` 登录 OpenPitrix，同上，进入 「应用管理」→「应用审核」，在 “未处理” 的列表中即可看到通过上一步商务审核的 VM 版本的 Wordpress，点击「开始处理」进入应用审核详情页。

2、此时技术审核需要对应用的配置文件下载至本地预览和部署测试，点击 「部署测试」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616235804.png)

3、点击 「创建测试环境 →」，本示例选择将 VM 类型的应用 Wordpress 部署至 [QingCloud](https://console.qingcloud.com)，若您有其它云环境的账号，也可以自行选择 AWS 或阿里云作为测试环境。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617004118.png)

> 注意，添加云平台作为云环境的前提是该环境必须已有 VPC 和私有网络，且 VPC 已绑定了公网 IP。选择 QingCloud 然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617233103.png)


4、在添加 QingCloud 环境页面参考如下步骤添加 API 密钥信息作为**授权信息**。

> 获取 QingCloud API 密钥 ID：
> - 登录 [QingCloud 控制台](https://console.qingcloud.com/)；
> - 进入「[API 密钥](https://console.qingcloud.com/access_keys/)」管理界面；
> - 点击创建，并下载密钥文件。

5、输入 API 密钥相关信息后，点击 「验证」，然后点击 「继续」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617005405.png)

6、设置环境信息，区域需要根据 VPC 和私有网络所在的区域来选择，例如本示例已预先在 [QingCloud 上海1区 - A](https://console.qingcloud.com/sh1a/routers/) 的账号中创建了 VPC 和私有网络，因此区域选择 sh1a，名称和备注可自定义。

- 区域：sh1a
- 名称：qingcloud-test-runtime
- 备注：QingCloud 测试环境

#### 部署测试实例 (VM 版本)

1、回到 Wordpress 的 Helm 类应用审核详情页，在右下角点击 「部署测试」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617233737.png)

2、您可以在部署测试实例的表单页定义待部署主机的节点配置和网络，Runtime 默认是上一步创建的 qingcloud-test-runtime。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190617233915.png)

3、点击 「部署」，应用即可部署至 QingCloud 云平台，在 OpenPitrix 测试实例的列表页也可以查看到该应用的实例信息。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618070104.png)

4、该应用将自动部署至 QingCloud 云平台主机并绑定硬盘。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618070040.png)

5、可以在 QingCloud 控制台上查看创建的主机状态以及 IP 情况，需要在端口转发规则中将 Wordpress **内网端口** 80 转发到**源端口** 8000 (可自定义)，然后在防火墙开放这个**源端口** 8000，确保外网流量可以通过该端口。

> 提示：例如在 QingCloud 平台配置端口转发和防火墙规则，则可以参考 [云平台配置端口转发和防火墙](../appendix/qingcloud-manipulation)。

然后可以通过 `<EIP>:8000` 的方式访问 Wordpress，如：`http://139.198.111.111:8000`，访问成功则说明 VM 版本的实例部署成功。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618091028.png)

> 第一次部署由于需要从公网上下载必要的系统镜像，通常创建时间会比较长，应用部署成功后，这些镜像会缓存在 frontgate，以后再创建其它集群就从缓存中拉取系统镜像。若需要管理部署的集群如停用或删除集群，参考 [集群管理](../../user-guide/cluster-management)。

## 审核应用 (Helm 版本)

### 第一步：ISV、商务、技术审核

同上，参考上述步骤，使用开发者账号 `developer@op.com` 将 Wordpress 应用的 Helm 类型版本提交审核，并通过应用服务商、商务审核、技术审核，最终将其部署至 Kubernetes 运行环境。

### 第二步：部署测试实例 (Helm 版本)

1、应用提交审核后，在 「测试环境」 中添加一个 Kubernetes Runtime，如下添加证书，可使用当前 OpenPitrix 环境所部署的 Kubernetes 集群，将 `~/.kube/config` 中的内容粘贴至授权信息框中，点击 「验证」 然后点击 「继续」。

> 注意，请确保该 Kubernetes 集群已部署了 [Helm Tiller](https://helm.sh/docs/install/)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618071117.png)

2、参考如下提示设置环境信息：

> - 命名空间：选择应用在 Kubernetes 集群中的命名空间，在 KubeSphere 中其代表项目；若填写的命名空间不存在，将在集群自动新建一个命名空间；
> - 名称：为您的运行环境起一个简洁明了的名称，便于用户浏览和搜索，例如 k8s-testing-runtime；
> - 备注：例如 Kubernetes 测试环境；

点击 「完成」 即可创建。

3、进入 Wordpress 应用的 Helm 版本，右下角点击 「部署测试」，默认将部署至上一步创建的 Kubernetes Runtime。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618072452.png)

4、在实例列表中验证部署后的应用资源详情，可以看到成功创建了 wordpress 和依赖的 mariadb，附加信息中可以看到相关的 k8s 资源，例如 PVC、Secret、Service 等信息。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618073211.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618073247.png)

至此，示例应用审核的各个流程以及部署测试都验证完毕，成功部署了 Wordpress 的 VM 与 Helm 版本至对应的测试环境中，技术审核对该应用的 VM 和 Helm 版本都可以选择 「通过」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618073700.png)

## 开发者发布应用

当应用审核通过后，应用版本的状态将变为 “已通过”，开发者可以根据自己的计划来选择时间上架此应用。应用一旦上架则意味着应用会出现在 **商店** 的应用列表中，用户可以随时浏览并部署应用，后续将引入财务管理支持用户购买应用。注意，上架的应用版本不允许再做任何修改，如有问题需要修复或服务需要升级请按上面的步骤提交新版本，等待审核通过后可以上架新版本，还可联系管理员将旧版本下架或删除。

1、使用开发者账号 `developer@op.com` 登录 OpenPitrix，进入 Wordpress 应用，在版本管理中可以看到已通过审核的 Helm 和 VM 版本。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618074016.png)

2、点击其中一个版本 (例如 Helm 版本) 进入版本详情页，点击 「上架到商店」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618074247.png)

3、同上，再将应用的另一个版本上架至应用商店。

4、发布应用后，应用状态变为 “已上架”。点击 「去商店查看」 可以看到上架应用的详细信息。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618074620.png)

如下看到 Wordpress 应用的两个版本都已成功上架。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618075032.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190618074800.png)

至此，您已经基本了解了开发者在 OpenPitrix 平台上传和发布应用的基本工作流程，
