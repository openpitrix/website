---
title: "OpenPitrix 贡献说明"
---

开源 (Open Source) 在软件开发领域是一个非常时髦的词汇，同时也是一种文化，而开源对整个软件开发的影响自然也是不言而喻，想象一下如果没有开源社区，全球互联网的发展不会如此的迅猛，设想如果没有 Linux、MySQL、Kubernetes 这些开源项目和社区，那么当今互联网的技术栈不会如此丰富和完善。我们在全球众多的开源社区可以看到无数的贡献者为开源项目和社区贡献自己的力量，推动技术的进步，开源正在改变世界。为什么要参与开源项目？如何为开源做贡献？ [Open Source Guides](https://ocselected.github.io/open-source-guide/how-to-contribute/#what-it-means-to-contribute) 已经给出了很好的回答。

OpenPitrix 从一开始就是以开源的方式来进行，并且在 2017 年的 8 月份在 GitHub 上创建了组织和项目，一直到 2018 年 2 月 24 日才写下第一行功能代码，在此期间，所有成员都在思考系统的每个关键点，这些讨论的细节均可在 [GitHub Issues](https://github.com/openpitrix/openpitrix/issues) 上公开访问。『OpenPitrix 贡献指南』 旨在帮助开源社区的成员了解如何参与 OpenPitrix 贡献，鼓励社区成员成为 OpenPitrix 的用户并参与进来，并初步制订了一套流程和规范，以便开源项目的多人协同工作更规范地运作。OpenPitrix 社区 [所有成员](https://github.com/openpitrix/openpitrix/blob/master/docs/members.md) 均必须遵守 [CNCF 行为准则](https://github.com/cncf/foundation/blob/master/code-of-conduct.md)，项目各成员相信只有彼此尊重对方，构建高效的、协作的社区才有可能。


## OpenPitrix 开源了哪些项目

先简单讲一下 OpenPitrix 开源的几个 Repo 都是做什么的：

- [OpenPitrix](https://github.com/openpitrix/openpitrix)：多云应用程序管理系统的后端代码仓库
- [Dashboard](https://github.com/openpitrix/dashboard)：用户控制台的前端代码仓库
- [Notification](https://github.com/openpitrix/notification)：独立的消息服务
- [IAM](https://github.com/openpitrix/iam)：身份和访问管理系统
- [Docs](https://github.com/openpitrix/docs.openpitrix.io)：OpenPitrix 官方文档(中/英)
- [openpitrix.io](https://github.com/openpitrix/openpitrix.github.io)：OpenPitrix 官网

## 如何参与贡献

本节将引导社区成员如何为 OpenPitrix 开始你的第一个贡献。

### 了解 OpenPitrix

参与一个开源项目的第一步一定是需要了解它，特别是对 OpenPitrix 这样一个大型的开源项目，快速熟悉起来并非一件易事，因此在这里列出一些相关文档，帮助社区成员从架构设计、功能使用到工程实现细节都能有所了解。最高效地熟悉 OpenPitrix 的方式还是使用它，在某些场景下遇到了问题或者是想到了新的 feature，亦或者发现了产品在某个环境中的 Bug，社区成员每一个提出来的问题都很宝贵，我们都会尽可能快的评估和回复。

可以去跟踪代码，找到相关的代码逻辑，在这个过程中很容易对相关模块有了解，不少 Contributor 可能都是这样完成了第一次贡献，参考以下资料帮助您更好地了解 OpenPitrix。

- [安装指南](../../installation/installation-guide)：将 OpenPitrix 部署到自己的环境中开始试用和功能体验
- [快速入门](../../getting-start/introduction)：引导新用户快速上手 OpenPitrix 
- [用户指南](../../user-guide/introduction) ：熟悉 OpenPitrix 的使用详情
- [项目设计](https://github.com/openpitrix/openpitrix/blob/master/docs/design/README.md)：设计的基本思路就是解耦应用程序的仓库和运行时环境，应用程序可以通过匹配运行时环境的标签和应用来源的仓库选择器来运行。
- [Dashboard 贡献指南](https://github.com/openpitrix/dashboard/blob/master/CONTRIBUTING.md)：如何为用户控制台的 repo 提交贡献。

### 发现可以参与的事情

对 OpenPitrix 有基本的了解之后，若希望寻找一个入手点，着手开始写代码和参与贡献，可以在 **OpenPitrix 可贡献功能列表** 中查看前端和后端开放贡献的功能，该列表详细描述了其功能背景，个人评估后可以申请领取对应的任务。这些功能都是我们评估过相对容易上手的事情，可以以此作为切入点。

如果在 **可贡献功能列表** 中没有找到自己短期内能够为其贡献的功能，那么建议参与到文档的建设贡献中，随着项目的发展，标准化的文档会变得愈加重要，文档能够帮助社区内新成员和用户更好地了解产品使用和开发，我们非常重视文档的撰写，文档包括中文和英文，也欢迎社区成员和用户加入贡献文档。比如在参考文档时发现了 broken link 或是错别字，或者认为某些功能缺少帮助文档，都可以是一次参与项目贡献的契机。

当你已经对 OpenPitrix 非常熟悉了，那么可以尝试从 [Roadmap](https://github.com/openpitrix/openpitrix/blob/master/docs/Roadmap-zh.md) 上找到感兴趣的事项，和我们讨论一下如何参与。

### 搭建开发环境

参见 [搭建开发环境](../set-up-env) 搭建本地开发环境并运行项目预览前端界面。

### 搭建 DevOps 环境

建议使用 Kubernetes 和 Jenkins 来构建持续集成和部署的 Pipeline，详见 [搭建 DevOps 环境](https://github.com/openpitrix/openpitrix/blob/master/docs/devops.md)。

### 提交 GitHub Issue

在开源项目中，所有的交流都应该是公开的。OpenPitrix 使用 [GitHub Issues](https://github.com/openpitrix/openpitrix/issues) 来记录 bugs 和 feature requests，无论是遇到 bug、讨论具体某一功能如何做、提一些建议、产品使用中的疑惑，都可以来提 issue，或者是在开发过程中遇到了问题，也可以在相关的 issue 中进行讨论，包括方案的设计、具体实现过程中遇到的问题等等。若对项目有任何问题，欢迎提交 [GitHub Issues](https://github.com/openpitrix/openpitrix/issues)，项目的开发者也将定期的关注 issue 动态。

#### 有效沟通

**Tips：**

- 检查你的问题是否已经存在，重复的问题会浪费大家的时间，所以请先搜索打开和已经关闭的问题，来确认你的问题是否已经提交过了。
- 清楚描述你的问题，建议按照社区的 issue 模板来描述问题以及上下文，方便开发者快速定位和复现你的问题。
- 给 issue 打上 tag，并注明是哪个模块，如 Bug, Enhancement, Design。
- 如果发现 Bug 或使用中遇到问题，请在 issue 贴出详细的系统环境介绍，例如使用什么版本的浏览器，什么版本的库，什么版本的操作系统等其他你运行环境的介绍，或是 go 版本。
- 详细的错误输出或者日志，如果你在 issue 中附带错误日志或代码，请使用代码标识符号来标记你的代码块，并使用 markdown 格式，以便更好的显示。

**Issue template**

![模板](/issue-template.png)

### 提交 PR

如果你能解决发现的 bug，或是有意愿参与 **OpenPitrix 可贡献功能列表** 中某些功能的开发，并且已经了解了如何成为一名贡献者，请发起 Pull Request。这样 OpenPitrix 项目的开发者可以进行评估，来决定是否合并你的更改。

**Tips：**

- 熟悉 [Github 协同开发流程](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/)。
- Fork 代码并且 clone 到你本地，开发过程中需经常从源分支获取代码来保持你个人的分支代码最新，以便在提交你的 pull 请求时，尽可能少的发生冲突。
- 创建 branch 来修改你的代码，目前 OpenPitrix 相关的项目默认的 branch 命名规则是 user/name。
- 在 PR 中描述清楚你的问题或提交的功能，方便其他人能够测试或复现。
- 如果项目中包含业务逻辑修改，每一次提交应确保经过了测试 (文档除外)，在 CI 中会包含测试覆盖率的检测，如果测试覆盖率下降，那么是不可以合并到 master 的。
- 保持良好和规范的代码风格，使开发者 review 起来更容易，被合并的几率也更大，其他人将来更容易理解和维护。

如果新提交了一个 PR，项目开发者可能会围绕你的更改进行讨论。提交者可能会被要求对自己的 PR 进行一些更改，如果是这样，请按开发者 review 后的要求和反馈修改并重新推送，只有被 approve 后的代码才可能 merge 到 OpenPitrix 的仓库。