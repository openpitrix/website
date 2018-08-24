---
title: "应用开发流程"
---

## 一. 准备 OpenPitrix 客户端工具

```bash
$ curl -L https://git.io/GetOpenPitrixBin | sh -
$ cd openpitrix-${OPENPITRIX_VERSION}-bin/
$ cp * /usr/local/bin/
```

## 二. 准备本地仓库环境

```bash
$ mkdir openpitrix-repo
$ cd openpitrix-repo
```

## 三. 创建应用

```bash
$ op create test
```

根据[开发规范](../openpitrix-specification)编辑 test 目录下文件，编辑好后保存

## 四. 打包应用

```bash
$ op package test
```

## 五. 准备仓库地址

仓库可以是 Google 的云存储，可以是青云 QingCloud 的对象存储，也可以是 GitHub，创建可参考[仓库创建](../repo-guide)。

这里假设仓库地址为：http://openpitrix.pek3a.qingstor.com/package/

## 六. 生成索引文件

生成 index.yaml 索引文件

```bash
$ op index --url http://openpitrix.pek3a.qingstor.com/package/ .
$ ls
index.yaml  test  test-0.1.0.tgz
```

> 增加新的应用配置包到仓库时，需要重新生成 index.yaml

## 七. 上传应用配置包和索引文件到仓库

上传后缀为 tgz 的压缩包和 index.yaml 索引文件到仓库相应目录。

![](/qingstor-package.png)

## 八. OpenPitrix 上创建仓库

以开发者身份登录 OpenPitrix 界面，打开**我的仓库**标签页，点击右侧**创建**

![](/create-repo-vmbased.png)

其中 URL 输入上一步准备的仓库地址 http://openpitrix.pek3a.qingstor.com/package/ 完成仓库创建

> 创建仓库时会做应用配置包的校验，开发者需要遵循开发规范

创建好仓库后，进入仓库详情页，应用会被自动导入，然后可以创建环境并测试部署。

