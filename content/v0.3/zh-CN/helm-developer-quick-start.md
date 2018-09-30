---
title: "应用开发快速入门"
---

## 一. 准备映像

Helm Chart 应用开发，首先需要将应用程序与该程序的依赖打包成 Docker 映像，可以使用已有的 Docker 映像。

## 二. 准备仓库

Helm Chart 仓库用于存放开发好的应用配置包以及索引文件 `index.yaml`，步骤请参考[仓库创建](../repo-guide)

## 三. 准备应用配置包

Helm Chart 包是由一组根据应用开发模版规范书写的文件组成，描述各种 Kubernetes 资源情况，详情请参看 [应用规范](../helm-specification)

## 四. 上传及生成应用

具体步骤参看 [应用开发](../openpitrix-repo)

