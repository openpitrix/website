---
title: "仓库管理"
---

## 简介

在 OpenPitrix 中，部署的每个应用程序都是基础软件包存储库，如果要将 OpenPitrix 用于多云应用程序管理，则需要先创建存储库。应用程序管理器可以将包存储到 http / https 服务器或 S3对象存储。OpenPitrix 应用仓库是独立于 OpenPitrix 的外部存储，可以是青云 QingCloud 的 QingStor 对象存储，也可以是 AWS 对象存储，后续将支持 GitHub 和 Google 作为存储，里面存储的内容是开发者开发好的应用的配置包以及索引文件。对于用户而言，仅管理员和开发者拥有仓库管理的权限，能够在平台中添加和管理仓库。

## 查看仓库
在 OpenPitrix 菜单栏选择 **仓库** 即可查看应用仓库的列表，包括公共仓库和私有仓库，显示运行环境提供商和仓库中的应用数目。

![仓库列表](/repo-lists.png)

## 创建仓库

### 基于青云 QingStor 对象存储

#### 第一步：登录青云控制台

首先登录 [青云 QingCloud 控制台](https://console.qingcloud.com/)，目前青云 QingCloud 支持在北京3区-A、北京3区、上海1区-A 使用对象存储，可以通过左上角切换可用区，比如切换到上海1区-A。

![青云console](/qingcloud-zone.png)

#### 第二步：创建 Bucket 

1、左侧导航栏依次选择 `存储` -> `对象存储` 进入[对象存储详情页](https://console.qingcloud.com/sh1a/qingstor/)。

2、点击 `创建 Bucket` 按钮创建一个全局唯一的名称。

![对象存储bucket](/qingcloud-bucket.png)

3、输入名称后点击 `提交`，这样就完成了 Bucket 的创建，其中的 `Url (API访问用)` 即为注册 OpenPitrix 仓库时所需要的 `URL` 参数。

![创建bucket](/qingcloud-bucket-created.png)

#### 第三步：配置访问权限

1、名称处右键弹出的菜单中选择 `设置`。

![配置bucket](/qingcloud-bucket-config.png)

2、选择 `访问控制`，点击 `添加用户` 按钮。

![bucket访问控制](/qingcloud-bucket-user.png)

3、勾选 `所有用户`，Bucket 权限选择 `可读`，点击 `提交`。

![设置访问权限](/qingcloud-bucket-acl.png)

4、至此就完成了 QingStor 对象存储的相关配置，下一步可在 OpenPitrix 控制台添加对象存储作为仓库进行应用开发。

#### 第四步：创建仓库
在 Openpitrix 控制台菜单栏选择 **仓库**，然后点击 **创建仓库**。

![创建应用仓库](/create-repo-vmbased.png)

- 名称：为您的应用仓库起一个简洁明了的名称，便于用户浏览和搜索。

- 可见性：即该仓库设置为公有还是私有仓库。所有用户都能使用公有仓库，即所有用户都可以上传应用配置包，而私有仓库仅属于创建者。

- 运行环境提供商：可以多选，其中 Kubernetes 与其他 Vm-based 环境应用配置包格式不同，若选择 QingCloud 和 AWS，意味着当前仓库中的应用既可以部署到 QingCloud，也可以部署到 AWS。若选择 Kubernetes 则表示当前仓库的应用只能部署到 Kubernetes 环境。

- 运行环境选择器：填写运行环境的标签键值对，将会选择具有所填标签的运行环境匹配该仓库。例如，当运行环境选择器设置为 “env=testing” 时，只有标签也是 “env=testing” 运行环境的才能部署该仓库中的应用。

- URL 选择 S3 协议，然后填写 `s3://s3.sh1a.qingstor.com/my-openpitrix`，这只是一个示例仓库，URL 填写实际的对象存储地址。Access Key ID 和 Secret Access Key 请参考 [获取 Access Key](https://docs.qingcloud.com/qingstor/api/common/signature.html#%E8%8E%B7%E5%8F%96-access-key)，填写后点击 `Validate` 按钮可以检查配置是否有效。以下分别说明每种协议的场景：
   
   - S3：可读可写，支持获取该应用仓库中的应用并部署到运行环境，且支持在 OpenPitrix 中上传应用到该仓库。参数形式为 `s3://s3.<region>.qingstor.com/<bucket_name>`。
   - HTTP：可读，不可写，仅支持获取该应用仓库（对象存储）中的应用，支持部署到运行环境，但不支持在 OpenPitrix 中上传应用。
   - HTTPS：可读，不可写，仅支持获取该应用仓库（对象存储）中的应用，支持部署到运行环境，但不支持在 OpenPitrix 中上传应用。

- 描述：简单介绍应用仓库的主要特性，让用户进一步了解该应用仓库；

- 标签：应用仓库的标签，起标识作用，比如设置 “software=database” 表示该仓库用来存放数据库相关的应用。

创建仓库完成后，点击进去查看详情，可以发现里面的应用已经被自动导入。注意，如果后续仓库内的应用有更新，可以通过 **触发索引** 操作更新。



### 基于 AWS S3 对象存储

#### 第一步：登录 AWS

首先登录 [AWS 控制台](https://console.aws.amazon.com)，点击左上方的 `Services`，在弹出的服务列表中选择 `S3` 。

![AWS console](/aws-s3.png)

#### 第二步：创建 bucket 

1、进入 S3 管理页面后点击 `Create bucket`，弹出 `创建 bucket` 对话框。

2、在对话框中输入 `Bucket name` 后，点击 `Create`。

![对象存储bucket](/aws-create-bucket.png)

3、输入名称后点击 `Create`，这样就完成了 Bucket 的创建。

![创建bucket](/aws-bucket-created.png)

#### 第三步：创建仓库

4、在 Openpitrix 控制台菜单栏选择 **仓库**，然后点击 **创建仓库**。

- 名称：为您的应用仓库起一个简洁明了的名称，便于用户浏览和搜索。

- 可见性：即该仓库设置为公有还是私有仓库。所有用户都能使用公有仓库，即所有用户都可以上传应用配置包，而私有仓库仅属于创建者。

- 运行环境提供商：可以多选，其中 Kubernetes 与其他 Vm-based 环境应用配置包格式不同，这里可以选择 QingCloud 和 AWS，意味着当前仓库中的应用既可以部署到 QingCloud，也可以部署到 AWS。若选择 Kubernetes 则表示当前仓库的应用只能部署到 Kubernetes 环境。

- 运行环境选择器：填写运行环境的标签键值对，将会选择具有所填标签的运行环境匹配该仓库。例如，当运行环境选择器设置为 “env=testing” 时，只有标签也是 “env=testing” 运行环境的才能部署该仓库中的应用。

- URL：注册 OpenPitrix 仓库时所需要的 `URL`。根据上图中的示例，则 URL 为 `s3://s3.us-east-2.amazonaws.com/my-openpitrix`。创建仓库时，请选择 URL 类型为 `S3` ，然后填入相应的 `Access Key ID` 和 `Secret Access Key`，获取方式请参考 [官方文档](https://docs.aws.amazon.com/zh_cn/general/latest/gr/managing-aws-access-keys.html)，填写后点击 `Validate` 按钮可以检查配置是否有效。以下分别说明每种协议的场景。

   - S3：可读可写，支持获取该应用仓库中的应用并部署到运行环境，且支持上传应用；参数形式为 `s3://s3.<region>.amazonaws.com/<bucket_name>`。
   - HTTP：可读，不可写，仅支持获取该应用仓库中的应用并部署到运行环境，支持部署到运行环境，但不支持上传应用。
   - HTTPS：可读，不可写，仅支持获取该应用仓库中的应用并部署到运行环境，支持部署到运行环境，但不支持上传应用。

- 描述：简单介绍应用仓库的主要特性，让用户进一步了解该应用仓库；

- 标签：应用仓库的标签，起标识作用，比如设置 “software=database” 表示该仓库用来存放数据库相关的应用。

创建仓库完成后，点击进去查看详情，可以发现里面的应用已经被自动导入，如果后续仓库内的应用有更新，可以通过 **触发索引** 操作更新。


![OpenPitrix console](/openpitrix-create-repo.png)

## 修改仓库

在应用仓库列表页的右侧或在某个应用仓库的详情页中点击 “···” ，选择 **修改仓库** 可以修改应用仓库的信息，其中运行环境提供商、可见性和 URL 不支持修改。

![](/modify-repo.png)

## 删除仓库

同样，在应用仓库列表页的右侧或在某个应用仓库的详情页中点击 “···” ，可以删除仓库。

