---
title: "仓库创建"
---

OpenPitrix 应用仓库是独立于 OpenPitrix 的外部存储，可以是 Google 的云存储，可以是青云 QingCloud 的对象存储，也可以是 GitHub，里面存储的内容是开发者开发好的应用的配置包以及索引文件。

本文档介绍如何创建一个仓库。

## 基于青云 QingStor 对象存储

### 登录

首先登录 [青云 QingCloud 控制台](https://console.qingcloud.com/)，目前青云 QingCloud 支持在北京3区-A、北京3区、上海1区-A 使用对象存储，可以通过左上角切换可用区，比如切换到上海1区-A。

![青云console](/qingcloud-zone.png)

### 创建 bucket 

左侧导航栏依次选择 `存储` -> `对象存储` 进入[对象存储详情页](https://console.qingcloud.com/sh1a/qingstor/)。

点击 `创建 Bucket` 按钮创建一个全局唯一的名称。

![对象存储bucket](/qingcloud-bucket.png)

输入名称后点击 `提交`，这样就完成了 Bucket 的创建。

![创建bucket](/qingcloud-bucket-created.png)

其中的 `Url (API访问用)` 即为注册 OpenPitrix 仓库时所需要的 `URL` 参数。

### 配置访问权限

名称处右键弹出的菜单中选择 `设置`。

![配置bucket](/qingcloud-bucket-config.png)

选择 `访问控制`，点击 `添加用户` 按钮。

![bucket访问控制](/qingcloud-bucket-user.png)

勾选 `所有用户`，Bucket 权限选择 `可读`，点击 `提交`。

![设置访问权限](/qingcloud-bucket-acl.png)

以上就完成了相应配置，可进行应用开发。

## 基于 AWS S3 对象存储

### 登录

首先登录 [AWS 控制台](https://console.aws.amazon.com)，点击左上方的 `Services`，在弹出的服务列表中选择 `S3` 。

![AWS console](/aws-s3.png)

### 创建 bucket 

进入 S3 管理页面后点击 `Create bucket`，弹出 `创建 bucket` 对话框。

在对话框中输入 `Bucket name` 后，点击 `Create`。

![对象存储bucket](/aws-create-bucket.png)

输入名称后点击 `Create`，这样就完成了 Bucket 的创建。

![创建bucket](/aws-bucket-created.png)

注册 OpenPitrix 仓库时所需要的 `URL` 参数形式为 `s3://s3.<region>.amazonaws.com/<bucket_name>`。

图中的示例，则 URL 为 `s3://s3.us-east-2.amazonaws.com/my-openpitrix`。

在 Openpitrix 中注册 repo 时，请选择 URL 类型为 `S3` ，然后填入相应的 `Access Key ID` 和 `Secret Access Key`。

> 关于获取 AWS `Access Key ID` 和 `Secret Access Key` 的方式请参考[官方文档](https://docs.aws.amazon.com/zh_cn/general/latest/gr/managing-aws-access-keys.html)

![OpenPitrix console](/openpitrix-create-repo.png)

点击 `Validate` 按钮可以检查配置是否有效。
