---
title: "简介"
---

OpenPitrix 要求开发者按照一定的应用打包规范上传应用，目前支持两种开发规范：

* [OpenPitrix 开发规范](../openpitrix-specification)
* [Helm Chart 开发规范](../helm-specification)

### OpenPitrix 开发规范

沿用的 [QingCloud AppCenter 开发规范](https://docs.qingcloud.com/appcenter/docs/specifications/specifications.html)，并做了升级和优化，采用该规范开发的应用，可以部署到基于 VM 的云运行时环境中，如 AWS、QingCloud 等。

[OpenPitrix 开发入门](../openpitrix-developer-guide) 提供了一个 Wordpress 示例，指导用户制作镜像，给出配置文件的模板，帮助用户熟悉 OpenPitrix 应用开发的流程。

[OpenPitrix 应用开发规范](../openpitrix-specification) 解释了 OpenPitrix 应用配置文件的格式和规范，提供配置的基本指导。

[OpenPitrix 应用开发流程](../packaging-openpitrix-app) 描述了准备一个 OpenPitrix 应用的基本流程。


### Helm Chart 开发规范

[Helm](https://helm.sh) 是 Kubernetes 的应用包管理器，Helm 使用一种称为 Chart 的包装格式，Chart 是描述相关的一组 Kubernetes 资源的文件集合。Chart 通过创建特定目录树的文件，将它们打包到版本化的压缩包。采用 [Helm Chart](https://docs.helm.sh) 规范开发的应用，可以部署到 Kubernetes 环境中。

[Helm Chart 开发入门](../helm-developer-guide) 提供一个应用示例，帮助用户熟悉 Helm Chart 的基本步骤。

[Helm Chart 开发模板规范](../helm-specification) 解释了 Chart 格式，提供使用 Helm 构建 Chart 的基本指导。

