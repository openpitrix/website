---
title: "管理员"
---

如果您是使用 OpenPitrix 平台的超级管理员，那么本篇文档可以帮助您快速开始相关的基础功能操作。

在 0.4 版本中，OpenPitrix 新增了基于角色的访问控制 (RBAC)，来对用户和权限进行更细粒度的划分，提供基于角色的权限控制。快速入门主要描述了在应用的全生命周期中，管理员创建角色和用户、审核应用以及审核服务商入驻的的工作流程，实际上管理员还能够管理云环境、应用商店、应用分类、测试环境、测试实例、SSH 密钥等，流程中的相关文档的详情页涵盖了更丰富的内容介绍。

## 前提条件

已安装了 OpenPitrix v0.4，并且已使用了 `admin@op.com` 用户的账号登录平台。

## 管理员快速入门

### 创建角色

目前 OpenPitrix 平台中内置了以下 3 种内置的角色：

- 超级管理员：拥有平台的最高权限，可以管理平台中的任何资源
- 应用服务商：拥有商店管理、应用实例管理、账户权限管理、测试环境和应用服务商管理，可创建开发者用户和创建自定义的角色
- 普通用户：拥有商店管理、应用实例管理、测试环境管理，同时普通用户也可以提交申请升级成为应用服务商

以 admin 用户登录 OpenPitrix，选择 「用户与权限」→「角色」，即可看到以上 3 种角色，以及模块权限规则。

![创建角色](https://pek3b.qingstor.com/kubesphere-docs/png/20190329112150.png)

当内置角色无法满足用户的业务需求时，平台支持管理员自定义新的角色和设置各功能模块的权限规则。

例如，在本示例中，我们创建一个平台技术审核和一个平台商务审核，分别用于对应用服务商提交的应用进行技术与商务层面的审核，待审核都通过后，应用服务商才能够将应用上架到应用商店。

#### 第一步：创建平台技术审核

点击 「自定义」，如下输入角色名称和描述，创建一个技术审核的角色，用于审核应用服务商上传的应用配置包中的配置文件是否符合开发规范或审核其它技术相关问题。

- 角色名称：技术审核
- 描述：审核 ISV 上传的应用


1. 点击 「确定」→「设置权限」，在右侧权限操作列表中，将商店管理的应用审核下商店管理下，勾选应用审核下的 **技术审核、提交审核、撤销审核**。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614103104.png)

2. 全选 **我的实例、测试环境** 等模块的操作权限，数据范围默认对平台所有数据生效。点击 「保存」，该角色即可创建成功。

#### 第二步：创建平台商务审核

同上，创建一个平台商务审核的角色，描述为 **审核 ISV 和应用的使用说明、合约与规范**。将商店管理的应用审核下商店管理下，勾选应用审核下的 **商务审核、提交审核、撤销审核** 以及应用服务商管理的 **服务商审核**。

至此一共创建了两个自定义的角色。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614103839.png)

### 创建部门和用户

#### 第一步：创建部门

1、在 「管理用户」 下，点击 `+` 创建新的组织机构即部门，如下示例创建一个 “云计算部门”，然后在云计算部门下创建 “产品部门” 和 “研发部门”。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614104209.png)

#### 第二步：添加用户

分别在产品部门、研发部门、普通用户和应用服务商下添加如下四个用户：

|用户名|邮箱|部门|角色|
|---|---|---|---|
| bussiness |	bussiness@op.com | 产品部门 | 商务审核 |
| tech | tech@op.com | 研发部门 | 技术审核 |
| regular | regular@op.com | \ | 普通用户 |
| isv |	isv@op.com | \ | 应用服务商 |

**云计算部门 (管理用户)**
![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614105421.png)

**平台用户**
![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614105433.png)

完成上述步骤后，即可使用不同角色的用户来演示不同的操作流程。请继续参考 [应用服务商](../getting-start/isv-quick-start) 来创建开发者用户并上传应用。







