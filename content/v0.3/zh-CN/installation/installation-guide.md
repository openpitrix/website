---
title: "部署 OpenPitrix"
---

OpenPitrix 支持 **`all-in-one`** 和 **`Kubernetes`** 两种部署模式。

### All-in-One 模式

[All-in-One](../allinone) 模式即单节点部署，需要预先安装 Docker、Docker-Compose、Git、Make 等依赖软件，仅建议您用来测试或熟悉部署流程和了解 OpenPitrix 功能特性，在正式使用环境建议使用 `Kubernetes` 模式，请参考下文的 `Kubernetes` 模式。

### Kubernetes 模式

[Kubernetes](../kubernetes) 模式是将 OpenPitrix 部署到 Kubernetes 集群环境中，部署完成后 OpenPitrix 可作为基于 Kubernetes 的一个应用管理系统，提供应用的全生命周期管理。