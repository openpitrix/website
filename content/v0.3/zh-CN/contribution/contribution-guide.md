---
title: "贡献说明"
---

本文档适用于想参与 OpenPitrix 开发和贡献代码的开发者，指导你如何为 OpenPitrix 贡献一份自己的力量。OpenPitrix 社区 [所有成员](https://github.com/openpitrix/openpitrix/blob/master/docs/members.md) 均必须遵守 [CNCF 行为准则](https://github.com/cncf/foundation/blob/master/code-of-conduct.md)，项目各成员相信只有彼此尊重对方，构建高效的、协作的社区才有可能。

## 前置条件

- 熟悉 [Github 协同开发流程](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/)。
- 熟悉 OpenPitrix 的背景和功能设计以及架构，详见 [OpenPitrix](https://openpitrix.io/zh/blog/2018/03/OpenPitrix-Insight/)。
- 熟悉 [用户指南](../../user-guide/introdution) 和 [开发指南](../../developer-guide/introdution)。

## 设计

设计的基本思路就是解耦应用程序的仓库和运行时环境。应用程序可以通过匹配运行时环境的标签和应用来源的仓库选择器来运行。有关项目的设计详情请参阅 [项目设计](https://github.com/openpitrix/openpitrix/blob/master/docs/design/README.md)。

## 搭建开发环境

参见 [搭建开发环境](../set-up-env) 搭建本地开发环境并运行项目预览前端界面。

## 搭建 DevOps 环境

建议使用 Kubernetes 和 Jenkins 来构建持续集成和部署的 Pipeline，详见 [搭建 DevOps 环境](https://github.com/openpitrix/openpitrix/blob/master/docs/devops.md)。

## GitHub Issues

OpenPitrix 使用 [GitHub Issues](https://github.com/openpitrix/openpitrix/issues) 来记录 bugs 和 feature requests，若对项目有任何问题，欢迎提交 [GitHub Issues](https://github.com/openpitrix/openpitrix/issues)。


