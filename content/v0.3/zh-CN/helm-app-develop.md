---
title: "应用开发流程"
---

## 准备 Helm 客户端工具

执行以下命令，将自动下载安装最新版本的 Helm 客户端，支持在 Linux ：

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

> 更多安装方式请参考 [helm 安装文档](https://github.com/helm/helm/blob/master/docs/install.md#installing-the-helm-client)。

## 准备本地仓库

执行下列命令，在本地创建目录作为本地仓库。

```bash
$ mkdir helm-repo
$ cd helm-repo
```

## 创建应用

```bash
$ helm create test
```

根据 [Helm 应用开发规范](../helm-specification) 编辑 test 目录下文件，编辑好后保存。

## 打包应用

```bash
$ helm package test
```
至此，应用配置包就已经准备完毕，接下来需要创建仓库和上传应用。

仓库可以是青云 QingCloud 或 AWS 的对象存储，创建仓库可参考 [仓库管理](../repo-guide)。

仓库创建完成即可上传应用到平台进一步测试和部署应用，可参考 [开发者 - 上传应用](../ISV-quick-start/#第二步：上传应用)。



