---
title: "应用开发流程"
---

## 准备 OpenPitrix 客户端工具

以 v0.2.3 为例，以下命令中的版本号以实际最新的为准：

```bash
$ curl -L https://git.io/GetOpenPitrixBin | sh -
$ cd openpitrix-v0.2.3-bin/
$ cp * /usr/local/bin/
```

## 准备本地仓库

执行下列命令，在本地创建目录作为本地仓库。

```bash
$ mkdir openpitrix-repo
$ cd openpitrix-repo
```

## 创建应用

OpenPitrix 客户端工具将创建一个名为 test 的文件夹，生成 OpenPitrix 配置包必需的三个文件模板。

```bash
$ op create test
$ cd test 
$ ls
cluster.json.tmpl  config.json  package.json
```

参见 [OpenPitrix 应用开发规范](../openpitrix-specification) 编辑 test 目录下文件，编辑好后保存。

## 打包应用

```bash
$ op package test
Successfully packaged app and saved it to: /openpitrix-repo/test-0.1.0.tgz

$ ls
test  test-0.1.0.tgz

```

至此，应用配置包就已经准备完毕，接下来需要创建仓库和上传应用。

仓库可以是 QingCloud 或 AWS 的对象存储，创建仓库可参考 [仓库管理](../../user-guide/repo-guide)。

仓库创建完成即可上传应用到平台进一步测试和部署应用，可参考 [开发者 - 上传应用](../../getting-start/ISV-quick-start/#第二步：上传应用)。





