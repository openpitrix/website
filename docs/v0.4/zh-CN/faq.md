---
title: "常见问题"
---

1、作为新手，如何从一个最简单的例子入手？

我们提供了一个如何准备一个基于 OpenPitrix 应用开发规范的示例，建议从 [WordPress 实战](../zh-CN/developer-guide/openpitrix-developer-guide/#wordpress-实战) 入手，从零开始准备一个配置包并上传到 OpenPitrix 中，后续可参考 [用户指南](../zh-CN/manual-guide/introduction) 熟悉应用的全生命周期管理。

2、应用如何语言国际化？

如果您想要适应不同的语言，需要在提交的应用中包含一个 locale 文件夹，并添加对应语言的翻译文件，如：

- locale/en.json 英文翻译文件
- locale/zh-cn.json 中文翻译文件

具体配置请参考文档 [国际化](../zh-CN/developer-guide/openpitrix-specification/#国际化) 。

3、上传配置包或新的版本时报错：配置验证失败，报 “创建资源失败” 错误？

需要检查 package.json 或 config.json 文本内容，是否有中文符号或其他不符合 json 格式的部分，可以通过在线工具验证合法性，比如 jsonlint。 

如果报 “应用名称已存在” 或 “应用版本已存在” ，则需要修改配置文件（package.json 或 Chart.yaml）的应用名称或版本号。版本号匹配应用配置包中配置文件的 `version` 字段，配置文件中的 `version` 字段的值（版本号）不能与该应用已上传的版本号重复，且应用名 (`name` 字段的值) 不能与仓库中的已有应用的名称重复，修改后重新生成一个配置包即可上传成功。

4、All-in-one 模式安装 OpenPitrix 时，卡在某一步进度一直没有变化，是什么原因？

可能是主机的配置规格不符合要求，比如内存不足，建议按照我们提供的 [all-in-one 模式 - 主机环境](../zh-CN/installation/allinone/#主机环境) 准备环境。

5、All-in-one 模式安装 OpenPitrix 时，make 命令执行失败，为什么？

可能是依赖的软件版本不满足要求，可检查其版本并对照 [all-in-one 模式 - 软件环境](../zh-CN/installation/allinone/#软件环境) 安装符合要求的版本。

6、Kubernetes 模式执行安装脚本 deploy-k8s.sh 失败？

请先检查是否成功地配置了 Kubernetes 集群的存储服务端，并确保已成功创建了存储类型，可添加 PVC。

7、All-in-one 模式安装时，查看容器状态时有多个容器的状态是 “Exit 1 或 2”，容器没有运行成功？

```bash
$ docker-compose ps
Name                          Command                  State                           Ports                     
---------------------------------------------------------------------------------------------------------------------
openpitrix-api-gateway        api-gateway                      Exit 2                                                       
openpitrix-app-db-ctrl        flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-app-manager        app-manager                      Exit 2                                                       
openpitrix-category-manager   category-manager                 Exit 2                                                       
openpitrix-cluster-db-ctrl    flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-cluster-manager    cluster-manager                  Exit 2                                                       
openpitrix-dashboard          npm run prod:serve               Up             0.0.0.0:8000->8000/tcp                        
openpitrix-db                 docker-entrypoint.sh --low ...   Up             0.0.0.0:13306->3306/tcp                       
openpitrix-db-init            sh -c /flyway/sql/ddl/ddl_ ...   Exit 1                                                       
openpitrix-etcd               etcd --data-dir /data --li ...   Up             0.0.0.0:12379->2379/tcp, 2380/tcp             
openpitrix-iam-db-ctrl        flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-iam-service        iam-service                      Exit 2                                                       
openpitrix-job-db-ctrl        flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-job-manager        job-manager                      Exit 2                                                       
openpitrix-minio              sh -c mkdir -p /data/openp ...   Up (healthy)   0.0.0.0:19000->9000/tcp                       
openpitrix-pilot-service      pilot -config=/opt/openpit ...   Up             0.0.0.0:9110->9110/tcp, 0.0.0.0:9114->9114/tcp
openpitrix-repo-db-ctrl       flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-repo-indexer       repo-indexer                     Exit 2                                                       
openpitrix-repo-manager       repo-manager                     Exit 2                                                       
openpitrix-runtime-db-ctrl    flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-runtime-manager    runtime-manager                  Exit 2                                                       
openpitrix-task-db-ctrl       flyway -url=jdbc:mysql://o ...   Exit 1                                                       
openpitrix-task-manager       task-manager                     Exit 2  
```

可能是由于主机环境预先安装了 Kubernetes 环境，造成 Docker 容器间的网络不通，建议准备一台新的符合最小规格的主机并安装依赖软件后进行安装。安装过程中如果中断可重复执行 make 命令运行项目。

8、部署至 Kubernetes 中的应用的状态一直是 Pending 或部署成功却无法访问服务？

请检查应用配置包的与 service 相关的 yaml 中，service 的类型可能设置的是 LoadBalancer，该服务类型需要预先安装云平台 LB 插件，若没有安装该插件请将 service 的类型修改成 nodeport，然后重新上传。


如果有其他疑问，您也可以通过提问形式与我们联系探讨。若对项目有任何问题，欢迎提交 [GitHub Issues](https://github.com/openpitrix/openpitrix/issues)。