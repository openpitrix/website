---
title: "安装使用 OP 命令行工具"
---

OP 是一个类似于 Helm 的命令行工具，用来初始化和打包 OpenPitrix 支持的 VM-Based 规范的配置包。

## 前提条件

机器已安装了 Go 语言环境。

## 安装方式

```
go get -u openpitrix.io/openpitrix/cmd/op
go install openpitrix.io/openpitrix/cmd/op
```

```
# op -h
The devkit for OpenPitrix.

Usage:
  op [command]

Available Commands:
  create      create a new app with the given name
  help        Help about any command
  index       generate an index file given a directory containing packaged app
  package     package an app directory into an app archive
  serve       start a local http web server

Flags:
  -h, --help   help for op

Use "op [command] --help" for more information about a command.
```

## 使用示例

### 第一步：创建文件夹

**op create APP_NAME**

创建一个 nginx app 文件夹，例如：

```
op create nginx
Creating [nginx]
```

### 第二步：打包文件夹

**op package APP_NAME**

将刚才创建出来的 app 文件夹打包成 package，例如：

```
op package nginx
Successfully packaged app and saved it to: /home/ubuntu/op/openpitrix-v0.4.1-linux-bin/nginx-0.1.0.tgz
```

### 第三步：生成索引文件

**op index DIR**

在文件夹目录生成 `index.yaml`, 例如

```
op index .
```

### 第四步：测试项目

**op serve**

启动一个本地的 http 服务器, 用来临时测试 repo。

```
op serve
Now serving you on [http://127.0.0.1:9191/]
```