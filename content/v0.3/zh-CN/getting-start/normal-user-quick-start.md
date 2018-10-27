---
title: "普通用户"
---

如果您是使用 OpenPitrix 平台的普通用户，那么本篇文档可以帮助您快速开始相关的基础功能操作。当开发者提交的应用通过管理员审核后，普通用户即可创建运行环境、准备 QingCloud 平台资源和部署应用，流程中的相关文档链接页涵盖了更详细的内容介绍。

## 创建运行环境
### 第一步：登录 OpenPitrix

以普通用户的身份登录，点击 **我的环境**，然后点击 **”+“** 创建运行环境。因为基于 OpenPitrix 开发规范准备的应用可以部署到 QingCloud、AWS 这类云运行时环境(Runtime)，以创建 QingCloud 运行环境为例，如需创建 AWS 或 Kubernetes 运行环境则参考 [运行环境管理](../../user-guide/runtime-management/#创建运行环境)。

### 第二步：填写配置信息

填写运行环境的配置信息，完成后点击 **确定**。

- 名称：为您的运行环境起一个简洁明了的名称，便于浏览和搜索。
- 提供商：选择 QingCloud (若应用配置包是基于 [Helm Chart 开发规范](../../developer-guide/helm-specification) 则选择 Kubernetes 运行环境)。
- URL：填写公有云的 API server 地址，比如  QingCloud ：[https://api.qingcloud.com](https://api.qingcloud.com)。
- 密钥：Access Key ID 和 Secret Access Key，填写 QingCloud 平台上生成的 [API 秘钥](https://console.qingcloud.com/access_keys/)。填写后点击 **验证** 检查连接是否正确。
- 区域：是云平台上的可用区，决定集群和资源将部署在云平台的哪个区域。填写正确的 URL 及 API 秘钥信息后，即可从下拉列表中选择。
- 描述：简单介绍运行环境的主要特性，方便进一步标识该运行环境。
- 标签：用于标识该运行环境，可匹配具有相同标签的应用仓库，此处暂不作设置。

![](/qingcloud-runtime-wp.png)

## 准备 QingCloud 平台资源

若要将商店的应用部署到 QingCloud 运行环境，则需依赖平台的网络资源，需提前创建好资源，应用部署到运行环境后将在  QingCloud 平台自动创建集群。

### 第一步：创建 VPC
在 QingCloud 可以预配置出一个专属的 VPC 网络：登录 [QingCloud 控制台](https://console.qingcloud.com)，创建 VPC，详见 [QingCloud 官方文档](https://docs.qingcloud.com/product/network/vpc)。

![创建 VPC](/create-vpc.png)

### 第二步：创建私有网络

私有网络用于主机之间互联，它类似物理世界中使用交换机组成的局域网。不同用户的私有网络之间是完全隔离的。私有网络可以作为子网加入到 VPC 网络中。在控制台创建私有网络，并加入 VPC，详见 [QingCloud 官方文档](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86)。

![创建私有网络](/create-vxnet.png)

### 第三步：申请公网 IP

1、公网 IP 是在互联网上合法的静态 IP 地址。申请公网 IP，然后将公网 IP 绑定到 VPC。详见 [QingCloud 官方文档](https://docs.qingcloud.com/product/network/eip)。

![申请公网 IP](/create-EIP.png)

2、勾选创建的 公网 IP，点击 **绑定到 VPC 网络**，弹窗中选择第一步创建的 VPC 网络。

![绑定VPC](/bound-vpc.png)

> 若准备将应用部署到 AWS 运行环境，参见 [部署 Wordpress 到 AWS](../user-guide/aws-quick-start.md)。


## 部署应用

### 第一步：查看商店应用

普通用户登录控制台后，可在 **商店** 查看已上架的应用，可以通过 ID 或应用名称搜索应用，点击图标可查看应用的详细信息。

![应用商店详情](/appstore-view.png)

### 第二步：准备部署应用

应用详情页显示应用的简介和描述信息、应用版本、首页链接、代码仓库、维护者、创建时间、仓库和分类等信息。点击 **部署**，填写配置信息，用户可以将应用 Wordpress 部署到刚创建的运行环境中。

![应用详情页](/zk-details.png)

### 第三步：填写配置信息

填写应用部署的信息，选择第六步创建的运行环境，本示例 MySQL 和 Wordpress 节点设置选择默认的最低参数，选择第七步创建的子网，完成部署。

![Wordpress 部署信息](/deployment-wp.png)

### 第四步：验证部署

应用部署后将创建 frontgate 和 Wordpress 两个集群。其中 frontgate 包含 proxy 和 etcd，负责元数据存储以及 OpenPitrix 框架同应用实例主机进行通信等功能，由系统自动创建，Wordpress 集群包含 MySQL 和 Wordpress 两个角色的节点，部署成功后，将会在 QingCloud 运行环境创建 3 台主机。此时可以通过 [VPC 端口转发](https://docs.qingcloud.com/product/network/vpc.html#%E5%8A%9F%E8%83%BD%E7%AE%A1%E7%90%86) （Wordpress 默认端口为 80）并在防火墙放行对应的端口，即可在浏览器通过公网 IP 和转发的端口如 [http://139.198.177.98:8000](http://139.198.177.98:8000) 来访问 Wordpress。

![Wordpress 主页](/wordpress-page.png)

> 第一次部署由于需要从公网上下载必要的系统镜像，通常创建时间会比较长，应用部署成功后，这些镜像会缓存在 frontgate，以后再创建其它集群就从缓存中拉取系统镜像。若需要管理部署的集群如停用或删除集群，参考 [集群管理](../../user-guide/cluster-management.md)。

至此，您已经基本了解了 OpenPitrix 平台对应用的生命周期的管理和其中三个角色的基本工作流程，建议您进一步熟悉和使用 OpenPitrix 平台，[用户指南](../../user-guide) 和 [开发指南](../../developer-guide) 提供更详细的文档说明，若在实际使用时遇到问题，参见 [常见问题](../../faq) 或联系我们技术团队为您解答。