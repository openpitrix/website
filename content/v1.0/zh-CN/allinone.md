---
title: "All-in-One 模式"
---

## 第一步: 准备环境

`All-in-One` 模式需要依赖以下软件:

| 软件需求 | 最低版本 |
| --- | --- |
| docker | 18.03.0-ce |
| docker-compose | 1.21.0 |
| git | 1.9.1 |
| make | 3.81 |

## 第二步: 准备 OpenPitrix 源码文件

```bash
$ git clone https://github.com/openpitrix/openpitrix
```

## 第三步: 部署 OpenPitrix

```bash
$ cd openpitrix
$ make build
$ make compose-up
```

## 第四步: 验证

1. 查看服务情况:

```bash
$ docker ps
```

2. 查看界面:

访问 http://localhost:8000/ 查看 OpenPitrix 管理界面。

![](/dashboard.png)

| 角色 |	用户名 |	密码 |
|-----|-----|-----|
| 管理员	| admin	| passw0rd | 
| 开发者	| dev| passw0rd | 
| 普通用户 | normal| passw0rd | 

访问 http://localhost:9100/swagger-ui/ 查看 OpenPitrix API 界面。

![](/swagger.png)

## 升级

更新代码后可使用以下命令升级环境

```bash
$ make compose-update
```