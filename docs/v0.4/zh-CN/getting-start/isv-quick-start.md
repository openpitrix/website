---
title: "应用服务商"
---

应用服务商下可以创建开发者用户和自定义角色，提供应用管理和创建应用等功能。本文档演示通过应用服务商创建开发者账号和提交服务商认证的操作流程。

## 前提条件

已创建了应用服务商的账号 `isv@op.com`，若还未创建请参考 [管理员快速入门](../admin-quick-start)。

## 第一步：提交服务商认证

1、使用应用服务商账号 `isv@op.com` 登录 OpenPitrix，对于要在 OpenPitrix 应用商店发布应用的 ISV 来说，需要在上架之前完成企业资质的审核和相关合约的签署。因此初次登录后向平台提供服务商认证信息，在服务商详情下点击 「立即提交」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614113709.png)

2、请根据实际情况填写认证信息，然后勾选相关协议，完成后点击 「点击」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614114333.png)

3、提交成功后，申请状态为 `审核中`。

## 第二步：商务审核

1、使用 [管理员快速入门](../admin-quick-start) 示例中创建的商务审核用户 **bussiness@op.com** 登录 OpenPitrix，对提交的服务商认证信息进行审核。

2、在 「应用服务商」→「入驻申请」可以看到上一步提交的服务商入驻申请。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614114827.png)

3、点击 「开始处理」，查看认证信息并根据应用服务商的情况审核其真实性，若审核顺利则点击 「通过」。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190614115105.png)

4、此时使用 `isv@op.com` 登录后，可以看到该服务商已通过认证。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190616201110.png)

## 第二步：创建开发者

1、审核通过过，即可创建开发者来上传应用。切换为 `isv@op.com` 登录 OpenPitrix。

2、左侧点击 「团队成员」，点击 「添加」，如下所示添加一名开发者用户 `developer@op.com`。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190615080959.png)

> 提示：应用服务商下仅内置了超级管理员和开发者角色，若还需要自定义角色，可以在 「角色」 下点击创建新角色，然后自定义权限规则和数据范围。

下一步即可使用开发者用户 `developer@op.com` 登录 OpenPitrix，创建和上传应用，参考 [开发者快速入门](../getting-start/developer-quick-start)。








