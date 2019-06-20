---
title: "集群管理"
---

## 查看集群

每次基于应用部署之后都会生成一个集群实例，用户或管理员可在**应用中心**下 **已部署应用** 或 **我的实例**查看用户已部署应用完整的集群实例列表，开发者可以在**开发中心**指定的应用选择 **沙盒 - 实例** 下查看集群实例，应用审核者可以在**测试实例** 查看集群实例。可根据需要按照 “状态” 进行过滤查询，根据集群名称或 ID 也可以进行搜索。

集群实例共分以下几种状态：等待中、正常、已关闭、已删除。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620091004.png)

点击集群列表中的集群实例，进入集群详情页，包含运行环境、部署的应用、用户等信息，以及当前集群的历史操作，若应用是部署在 QingCloud、AWS 这类运行环境中，则右侧列表显示集群中所有节点的信息。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620091047.png)

若应用部署在 Kubernetes 运行环境中，则右侧列表分别显示集群中三种类型的 Pod 的基本信息和附加信息 (包括 PVC、Secret、Service)。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620091311.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620091622.png)

## 扩容集群

扩容集群支持按节点配置规格进行横向扩容，以及按节点角色对节点数量进行纵向扩容。如下所示，点击扩容集群，选择节点角色的下的 CPU 与内存配置大小。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620091817.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620091833.png)

如下所示，将 MySQL 节点扩容至 2 个节点。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620092012.png)

增加 MySQL 节点成功。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620092456.png)

## 停用或删除集群

在集群列表页或详情页点击 ”···“， 选择 **停用集群** 或 **删除集群** 即可操作集群资源。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190620092604.png)
