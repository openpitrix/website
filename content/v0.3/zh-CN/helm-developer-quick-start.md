---
title: "应用开发快速入门"
---

Nginx 是大家熟知的代理和负载均衡软件，比起 Traefik 来说功能更加强大，OpenPitrix 支持将 Nginx 以 Helm Chart 的形式上传部署到平台中，本篇文档就以 Nginx 的 Helm Chart 文件为例，介绍 Chart 的基本规则。

## 准备 Helm 客户端工具

执行以下命令，将自动下载安装最新版本的 Helm 客户端，支持在 Linux 上安装 ：

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

执行 `helm create` 创建一个名为 nginx 的文件夹且默认生成一个 nginx 基本的 yaml 文件模板和目录，通常情况下不建议修改生成的一级目录下文件和目录的命名。

```bash
$ helm create nginx
$ tree nginx/
nginx/
├── charts
├── Chart.yaml
├── templates
│   ├── deployment.yaml
│   ├── _helpers.tpl
│   ├── ingress.yaml
│   ├── NOTES.txt
│   └── service.yaml
└── values.yaml

2 directories, 7 files
```

**Chart.yaml 文件示例：**

```yaml
# Default values for test.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

nameOverride: ""
fullnameOverride: ""

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

```


**values.yaml：**

```yaml
apiVersion: v1
appVersion: "1.0"
description: A Helm chart for Kubernetes
name: nginx
version: 0.1.0
```

可根据 [Helm 应用开发规范](../helm-specification) 编辑 nginx 目录下文件，编辑好后保存。

## 打包应用

回到 nginx 上级目录，执行打包命令，将生成一个 tgz 格式的压缩文件，即 nginx 应用配置包：

```bash
$ helm package nginx
$ ls
nginx  nginx-0.1.0.tgz
```
至此，应用配置包就已经准备完毕，接下来需要创建仓库和上传应用。

仓库可以是青云 QingCloud 或 AWS 的对象存储，创建仓库可参考 [仓库管理](../repo-guide)。

仓库创建完成即可上传应用到平台进一步测试和部署应用到 Kubernetes 运行环境中，可参考 [开发者 - 上传应用](../ISV-quick-start/#第二步：上传应用)。







