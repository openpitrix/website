---
title: "开发者"
---

如果您开发基于 OpenPitrix 平台的应用，那么本篇文档可以帮助您快速开始相关的基础功能操作，主要描述了开发者创建仓库、创建应用和上传应用、提交审核、发布应用等工作流程，流程中的相关文档链接页涵盖了更详细的内容介绍。完成本篇操作后建议您继续阅读 [管理员](../admin-quick-start) 和 [普通用户](../regular-user-quick-start) 的快速入门。

## 创建仓库

应用仓库目前支持创建基于 QingStor 和 基于 S3 协议如 AWS 的对象存储，以及基于 HTTP/S 协议的仓库 (只读，详情见下文)，对象存储用来存放配置包和索引文件。以创建基于 QingStor 对象存储的仓库为例，若创建基于 AWS S3 对象存储及仓库管理参见 [仓库管理](../../user-guide/repo-management)。

### 第一步：登录 QingCloud 控制台

首先登录 [QingCloud 控制台](https://console.qingcloud.com/)，目前 QingCloud 支持在北京 3 区-A、北京 3 区、上海 1 区-A 使用对象存储，可以通过左上角切换可用区，比如切换到上海 1 区-A。

![qingcloud console](/qingcloud-zone.png)

### 第二步：创建 Bucket 

1、左侧导航栏依次选择 `存储` -> `对象存储` 进入 [对象存储详情页](https://console.qingcloud.com/sh1a/qingstor/)。

2、点击 `创建 Bucket` 按钮创建一个全局唯一的名称。

![对象存储bucket](/qingcloud-bucket.png)

3、输入名称后点击 `提交`，这样就完成了 Bucket 的创建，其中的 `Url ( API 访问用 )` 即为注册 OpenPitrix 仓库时所需要的 `URL` 参数。

![创建bucket](/qingcloud-bucket-created.png)

### 第三步：配置访问权限

1、名称处右键弹出的菜单中选择 `设置`。

![配置bucket](/qingcloud-bucket-config.png)

2、选择 `访问控制`，点击 `添加用户` 按钮。

![bucket访问控制](/qingcloud-bucket-user.png)

3、勾选 `所有用户`，Bucket 权限选择 `可读`，点击 `提交`。

![设置访问权限](/qingcloud-bucket-acl.png)

4、至此就完成了 QingStor 对象存储的相关配置，下一步可在 OpenPitrix 控制台添加对象存储作为仓库进行应用开发。

### 第四步：创建仓库

1、以开发者的身份登录 OpenPitrix 控制台，在菜单栏李选择 **仓库**，然后点击 **创建仓库**。

2、填写配置信息。创建完成后，对象存储中存储的应用配置包会被自动索引成为可部署的应用，关于各项配置的更多解释参见 [创建仓库](../../user-guide/repo-management/#第四步：创建仓库)。

- 运行环境服务商：可以多选，此处勾选 QingCloud 和 AWS (后续会提供更多的服务商支持)。其中 Kubernetes 与 QingCloud 和 AWS 环境的应用配置包格式不同，若选择 QingCloud 和 AWS，意味着当前仓库仅支持上传基于 [OpenPitrix 应用开发规范](../../developer-guide/openpitrix-specification) 的应用，既可以部署到 QingCloud，也可以部署到 AWS。若选择 Kubernetes 则表示当前仓库仅支持上传基于 [Helm Chart 应用开发规范](../../developer-guide/helm-specification) 的应用配置包，且只能部署到 Kubernetes 环境。

- URL：选择 S3 协议，然后填写 `s3://s3.sh1a.qingstor.com/my-openpitrix`，这只是一个示例仓库，URL 填写实际的对象存储地址。Access Key ID 和 Secret Access Key 请参考 [获取 Access Key](https://docs.qingcloud.com/qingstor/api/common/signature.html#%E8%8E%B7%E5%8F%96-access-key)，填写后点击 `Validate` 按钮可以检查配置是否有效。以下分别说明每种协议的场景：
   
   - S3：可读可写，支持获取该应用仓库中的应用，支持部署到运行环境，且支持在 OpenPitrix 中上传应用到该仓库。参数形式为 `s3://s3.<region>.qingstor.com/<bucket_name>`。
   - HTTP/S：可读，不可写，仅支持获取该应用仓库（对象存储）中的应用，支持部署到运行环境，但不支持在 OpenPitrix 中上传应用。

![创建应用仓库](/create-repo-vmbased.png)


## 创建应用

### 第一步：准备应用配置包

为方便您快速熟悉 OpenPitrix，本示例准备了一个基于 [OpenPitrix 开发规范](../../developer-guide/openpitrix-specification) 的 [WordPress](https://wordpress.org) 的应用配置包，且已准备好 Wordpress 与 MySQL 镜像并上传到了 Docker 镜像仓库，点击 [下载 Wordpress 应用配置包](https://openpitrix.anybox.qingcloud.com/s/9iNpm77Z2RAOQFUQBSv1luQEHvWTEGdY)，选择 VM Package 文件夹下的 `Wordpress-0.1.0.tgz` 配置包。

> 同样，也可参考 [OpenPitrix 规范及应用开发 - 准备 Wordpress 配置文件](../../developer-guide/openpitrix-developer-guide/#准备应用配置包) 的三个必须的配置文件，然后获取 [OpenPitrix 客户端工具](../openpitrix-developer-guide/#准备-openpitrix-客户端工具) 将配置文件打包 (默认为 `.tgz` 格式)，即可生成一个 Wordpress 应用配置包。注意，基于 OpenPitrix 开发规范准备的应用可以部署到 QingCloud、AWS 这类云运行时环境 (Runtime)，若要部署到 Kubernetes 运行环境则需要基于 [Helm Chart 开发规范](../../developer-guide/helm-specification) 来准备应用配置包，或下载 Helm Chart Package 文件夹下的 [wordpress-0.3.0.tar](https://openpitrix.anybox.qingcloud.com/s/9iNpm77Z2RAOQFUQBSv1luQEHvWTEGdY)。参见 [部署 Wordpress 到 Kubernetes](../../user-guide/deploying-app-on-k8s)。

### 第二步：上传应用

1、开发者登录 OpenPitrix 控制台，选择左边菜单栏 **我的应用**，然后点击 **“+”** 或点击 **创建**。

![创建应用](/overview-page.png)

2、选择刚刚创建的应用仓库 ”OpenPitrix-repo“，点击 **下一步**。
![选择仓库](/select-repo.png)

3、从本地上传应用配置包，注意，配置文件中应用的名字（package.json 的 name 字段值）不能与应用仓库中已有应用的名字重复，否则将无法上传。

![上传应用配置包](/upload-package.png)

4、若配置包符合开发规范，则提示上传成功。配置包上传成功后，开发者和管理员可部署和测试应用，或在 **我的应用** 中查看。如果测试自己的应用需要先创建运行环境，请参考 [普通用户](../regular-user-quick-start) **创建运行环境** 章节。

![上传成功](/upload-success.png)

## 应用提交审核

此时在 **我的应用** 下应用列表中可以看到上传的应用，状态显示为 **待提交**。若当前版本测试已通过，可以将此应用版本提交管理员审核，参见快速入门之 [管理员](../admin-quick-start)。但需要注意的是，提交审核之前请完善必要的应用信息，比如可在应用描述中详细介绍应用的功能以及特性，若用户想进一步了解应用时，描述内容的完整将变得尤为重要。应用提交后，状态则变为 “已提交”。

![Wordpress 待提交](/ready-to-submit-zk.png)

若开发者提交应用版本后想撤回提交，可以点击 **取消**，状态将从 ”已提交“ 变为 ”待提交“。 

![Wordpress 已提交](/wordpress-submitted.png)

## 发布应用

1、当管理员审核通过后，应用版本的状态将变为 “已通过”，开发者可以根据自己的计划来选择时间上架此应用。应用一旦上架则意味着应用会出现在 **商店** 的应用列表中，用户可以随时浏览并部署应用，后续将引入财务管理支持用户购买应用。注意，上架的应用版本不允许再做任何修改，如有问题需要修复或服务需要升级请按上面的步骤提交新版本，等待审核通过后可以上架新版本，还可联系管理员将旧版本下架或删除。

![发布 app 页面](/release-app-dev.png)

2、发布应用后，应用状态变为 “已上架”。在 **我的应用** 和 **商店** 都可以看到上架应用的详细信息。

![应用详情页](/zk-details.png)

至此，您已经基本了解了开发者在 OpenPitrix 平台上传和发布应用的基本工作流程，若需要对当前的应用版本做升级，可创建新的应用版本，参见 [应用版本管理](../../user-guide/app-management/#应用版本管理)。建议您继续阅读快速入门之 [管理员](../admin-quick-start) 和 [普通用户](../regular-user-quick-start)。