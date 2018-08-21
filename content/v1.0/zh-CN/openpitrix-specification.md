---
title: "OpenPitrix 应用规范"
---

## OpenPitrix 开发包文件结构

开发者开发应用配置包需要包含以下几个文件：

| 文件名 | 说明 |
|-------|-----|
| package.json | [必须] Json 格式文件记录应用详情 |
| config.json | [必须] Json 格式文件包含最终用户创建此应用实例时需设置的参数等信息，包括各种角色的节点配置、参数配置等 |
| cluster.json.tmpl | [必须] Tmpl 格式文件包含创建此应用实例时的基础架构、应用实例生命周期管理和自定义监控告警等信息 |
| LICENSE | [可选] 文本、Markdown、Link 格式的协议 |
| README.md | [可选] 应用介绍、使用说明 |
| locale/en.json | [可选] 英文语言包 |
| locale/zh-cn.json | [可选] 中文语言包 |

## package.json 文件

| 字段名 | 说明 |
|-------|-----|
| apiVersion | [必须] OpenPitrix 开发包 API 版本，可用值 v1 |
| name | [必须] 应用名称 |
| version | [必须] 应用版本 |
| description | [可选] 应用的简要描述 |
| home | [可选] 应用主页 URL |
| icon | [可选] SVG 或者 PNG 格式的图片地址 |
| screenshots | [可选] SVG 或者 PNG 格式的应用截图地址列表 |
| keywords | [可选] 应用关键字列表 |
| maintainers | [可选] 运维人员列表: <br /> -- [必须] name <br /> -- [可选] email |
| sources | [可选] 当前应用下载地址列表 |

样例：

```json
{
  "apiVersion": "v1",
  "name": "kafka",
  "version": "0.2.7",
  "description": "Apache Kafka is publish-subscribe messaging rethought as a distributed commit log.",
  "home": "https://kafka.apache.org/",
  "icon": "https://kafka.apache.org/images/logo.png",
  "screenshots": [
    "https://abc.png",
    "https://def.png"
  ],
  "keywords": [
    "kafka",
    "zookeeper",
    "kafka statefulset"
  ],
  "maintainers": [
    {
      "name": "Faraaz Khan",
      "email": "faraaz@rationalizeit.us"
    },
    {
      "name": "ben",
      "email": "ben@spothero.com"
    }
  ],
  "sources": [
    "https://github.com/Yolean/kubernetes-kafka",
    "https://github.com/confluentinc/cp-docker-images",
    "https://github.com/apache/kafka"
  ]
}
```

## config.json 文件

此配置文件定义用户在创建应用的时候需填入的参数信息，参数包括资源信息如 CPU、内存、节点数等，还包括应用本身配置参数以及外面依赖集群信息等。

这些信息有集群级别的全局设置，也有基于角色节点级别的信息设置。下面是对每个参数详细的解释：

> 注：role_name,	common.param名称自定义，右上角带3个星号(*)表示该项有 sibling (兄弟)节点，开发者提交的时候也要去掉这个标记。cluster 的 name 和 description 不需要自定义。另外，env 表示集群的环境变量，每一个变量的 key 会作为配置名直接展示给用户(key不能包含空格)，它的 label 属性可以是空字符串 ““。

```
{
    "type": "array",
    "properties": [{
        "key": "cluster",
        "description": "cluster properties",
        "type": "array",
        "properties": [{
            "key": "name",
            "label": "Name",
            "description": "The name of the application",
            "type": "string",
            "default": "",
            "required": "no"
        }, {
            "key": "description",
            "label": "Description",
            "description": "The description of the application",
            "type": "string",
            "default": "",
            "required": "no"
        }, {
            "key": "vxnet",
            "label": "VxNet",
            "description": "The vxnet that the application will join",
            "type": "string",
            "default": "",
            "required": "yes"
        }, {***
            "key": "role_name",
            "description": "role-based node properties",
            "label": "Role Name",
            "type": "array",
            "properties": [{
                "key": "cpu",
                "label": "CPU",
                "description": "CPUs of each node",
                "type": "integer",
                "default": 1,
                "range": [1, 2, 4, 8, 16],
                "required": "yes"
            }, {
                "key": "memory",
                "label": "Memory",
                "description": "Memory of each node (in MiB)",
                "type": "integer",
                "default": 2048,
                "range": [2048, 8192, 16384, 32768, 49152],
                "required": "yes"
            }, {
                "key": "count",
                "label": "Count",
                "description": "Number of nodes for the cluster to create",
                "type": "integer",
                "default": 3,
                "max": 100,
                "min": 1,
                "required": "yes"
            }, {
                "key": "volume_size",
                "label": "Volume Size",
                "description": "The volume size for each instance",
                "type": "integer",
                "default": 10,
                "min": 10,
                "max": 1000,
                "step": 10,
                "required": "yes"
            }]
        }]
    }, {
        "key": "env",
        "description": "application configuration properties",
        "type": "array",
        "properties": [{***
            "key": "common.param",
            "label": "Common Param",
            "description": "The common.param1 for all nodes",
            "type": "string",
            "changeable": true,
            "default": "value1,value11",
            "separator": ",",
            "range": ["value1", "value11", "value111"],
            "multichoice": true,
            "required": "yes"
        }, {***
            "key": "role_name",
            "description": "The role configuration properties of the application",
            "type": "array",
            "properties": [{***
                "key": "param",
                "label": "Role Param",
                "description": "The param for all slave nodes",
                "type": "string",
                "changeable": true,
                "default": "value1",
                "range": ["value1", "value11"],
                "required": "yes"
            }]
        }]
    }, {
        "key": "service_params",
        "description": "Custom service configuration properties",
        "type": "array",
        "properties": [{***
            "key": "common.param",
            "label": "Common Param",
            "description": "The common.param1 for all nodes",
            "type": "string",
            "default": "value1,value11",
            "separator": ",",
            "range": ["value1", "value11", "value111"],
            "multichoice": true,
            "required": "yes"
        }, {***
            "key": "role_name",
            "description": "Custom service the role (role_name) configuration properties",
            "type": "array",
            "properties": [{***
                "key": "param",
                "label": "Role Param",
                "description": "The param for all slave nodes",
                "type": "string",
                "pattern": "^value.+",
                "default": "value1",
                "range": ["value1", "value11"],
                "required": "yes"
            }]
        }]
    }]
}
```

json 配置项中的每一项，都是一个含有 key、label、description、type、range 等参数的 object。配置项支持嵌套，若 type 为 array，则该项的 properties 填写一个有序列表，在用户部署应用的时候填写配置使用，因此需要注意配置项的顺序。配置项中各参数的解释如下：

| 参数| 描述 |
| --- | --- |
key|对应 cluster.json.tmpl 文件索引的值，例如 {{cluster.name}} 表示 config.json 中 cluster 内 key=name 的项用户所填写的值。
label|用户部署应用时，填写配置项的名称。如果提供了国际化的配置文件，会进行国际化。
description|用户部署应用时，填写配置项的描述。如果提供了国际化的配置文件，会进行国际化。
type|该配置项的类型，请参考 **数据类型**。
changeable|如果为 false 表示该项用户在创建应用实例时候需要赋值，创建完毕以后则不能修改，比如数据库实例用户名和密码等类型的参数，默认值为 true。
range|限定配置项的取值范围，是一个可枚举的数组。
multichoice|和 range 配合使用，定义为 true 则为多选，默认是 false 为单选。
separator|定义 multichoice 为 true 时有效，多选后多个值连接所使用的分隔符，默认值为逗号。
min|若配置项 type 为 integer 或 number(浮点数)，指定该项的最小值。
max|若配置项 type 为 integer 或 number(浮点数)，指定该项的最大值。
step|若配置项是 volume_size，指定硬盘每次调整的最小步长单位。在每个主机挂多块盘时，通常需要指定该项。
pattern|正则表达式，可用该值规范填写内容。
required|是否为必填项
default|该项的默认取值，若 required 设为 "no"，default 值必须提供。

一些系统预留(即必须提供)的项含义如下：

| 参数| 描述 |
| --- | --- |
name|创建应用时用户填入的名称
description|创建应用时用户填入描述信息
vxnet|创建应用时所在网络ID

## cluster.json.tmpl 文件

该文件是在用户创建应用时需要传给 OpenPitrix API 的参数，这些信息的具体值是来自用户在 UI 上根据 config.json 定义的变量的输入，每个字段的具体描述如下：

>注： 右上角带3个星号(*)表示该项有 sibling (兄弟)节点，开发者提交的时候也要去掉这个标记。advanced_actions 的内容可以添加在国际化中，在控制台用户操作时展示。

```tmpl
{
    "name": "{{.cluster.name}}",
    "description": "{{.cluster.description}}",
    "vxnet": "{{.cluster.vxnet}}",
    "nodes": [{***
        "role": "role_name",
        "container": {
            "type": "docker",
            "image": "gcr.io/google_samples/k8szk:v2"
        },
        "count": "{{.cluster.role_name.count}}",
        "cpu": "{{.cluster.role_name.cpu}}",
        "memory": "{{.cluster.role_name.memory}}",
        "volume": {
            "size": "{{.cluster.role_name.volume_size}}",
            "mount_point": "/data",
            "mount_options": "defaults,noatime",
            "filesystem": "ext4"
        },
        "passphraseless": "ssh-dsa",
        "services": {
            "init": {
                "nodes_to_execute_on": 1,
                "post_start_service": false,
                "cmd": "mkdir -p /bigdata1/myapp;/opt/myapp/bin/init-cluster.sh"
            },
            "start": {
                "order": 1,
                "cmd": "/opt/myapp/bin/start-server.sh"
            },
            "stop": {
                "cmd": "/opt/myapp/bin/stop-server.sh"
            },
            "scale_out": {
                "pre_check": "/opt/myapp/sbin/scale-out-pre-check.sh",
                "cmd": "/opt/myapp/sbin/scale-out.sh"
            },
            "scale_in": {
                "pre_check": "/opt/myapp/sbin/scale-in-pre-check.sh",
                "cmd": "/opt/myapp/sbin/scale-in.sh",
                "timeout": 86400
            },
            "restart": {
                "cmd": "/opt/myapp/sbin/restart-server.sh"
            },
            "destroy": {
                "allow_force": true,
                "nodes_to_execute_on": 1,
                "post_stop_service": true,
                "cmd": "/opt/myapp/sbin/destroy-server.sh"
            }
        },
        "server_id_upper_bound": 255,
        "env": {
            "param"***: "{{.env.role_name.param}}"
        },
        "custom_metadata": {
            "cmd": "/opt/myapp/sbin/get_token.sh"
        }
    }],
    "env": {
        "common.param"***: "{{.env.common_param}}"
    },
    "endpoints": {
        "client": {
            "port": 2181,
            "protocol": "tcp"
        }
    }
}
```

- name <br />
  新建应用的名称，必填项，但值可以为空。
- description <br />
  新建应用描述，必填项，但值可以为空。
- subnet <br />
  新建应用所在私有网络 ID，必填项。
- nodes <br />
  新建应用节点信息，必填项。一个应用的节点可能是无角色区分的，这个时候 nodes 只有一种角色的信息；也可能是多角色组成的复杂应用，这个时候 nodes 就是这些角色节点信息组成的一个数组。
- role <br />
  多角色节点应用必填项，单角色应用可以无此项。角色名称自定义，但必须和 config.json 里定义的名字一致。
- container <br />
  镜像信息，必填项。
  | 参数 | 描述 |
  | --- | --- |
  | type|镜像类型，目前支持 docker。|
  | image| docker image name，包含 tag 部分。|
- count <br />
  节点个数，必填项，可以为0，但集群节点总数必须大于0。
- cpu <br />
  每个节点 cpu 个数。
- memory <br />
  每个节点内存大小，单位 MiB。
- volume <br />
  每个节点数据盘信息，如果此类节点不需要数据盘，不需要填写此项。
  | 参数|描述|
  | --- | --- |
  | size|每个节点挂盘容量大小，单位 GiB。|
  | mount\_point|每个节点数据盘挂载路径。|
  | mount\_options|描述数据盘的挂接方式，默认值 ext4 是 defaults,noatime，xfs 是 rw,noatime,inode64,allocsize=16m。|
  | filesystem|数据盘文件系统类型。如果 image 是基于 Linux 操作系统，目前支持 ext4 和 xfs，默认为 ext4。|
- passphraseless　<br />
  生成密钥信息，即提供此类节点能无密码登录其它节点的可能性，但青云调度系统只负责把此信息注册到 metadata service 中，开发者自行去获取密钥配置主机。目前支持 ssh-dsa, ssh-rsa，非必填项。
- services　<br />
  应用本身服务的初始化、启停等指令，OpenPitrix 调度系统会发送这些命令到指定节点执行，非必填项。
- init　<br />
  初始化命令，在创建集群或者新加节点时会触发该命令的执行。
  | 参数 | 描述 |
  | --- | --- |
  | nodes\_to\_execute_on|控制此命令在此类角色节点上某几个节点上执行，如果需要在所有此类节点上执行该命令可不填此项。|
  |post\_start\_service|控制初始化命令是在 [start](#start) 命令执行完毕后执行还是之前执行，如果 post\_start\_service 为 true 则表示 init 在 start 后执行；默认 (即不加此项) 是之前执行。此项是 init 独有。|
  | order|控制不同角色节点之间执行此命令顺序。比如主从节点，有时候需要主节点先启动服务，从节点后启动服务，非必填项。|
  | cmd|具体需执行的命令，必填项。|
  | timeout|执行该命令 timeout 时间(单位秒)，系统默认10分钟，由于某些命令可能需要迁移数据而耗时比较长，这种情况下需要计算出最长可能时间，最大值是86400，非必填项。|
- start <br />
  服务启动命令，具体参数参考初始化命令 init。
- stop　<br />
  停止服务命令，具体参数参考初始化命令 init。
- scale\_out　<br />
  加节点时在非新加节点上需执行的命令，具体参数参考初始化命令 init。
  | 参数 | 描述 |
  | --- | --- |
  | pre\_check|删除节点时在非删除节点上执行的预检查命令，若返回非0值表示不可删除节点。此项是 scale\_in 和 scale\_out 独有。|
- scale\_in <br />
  删除节点时在非删除节点上需执行的命令，具体参数参考初始化命令 init。
  | 参数|描述|
  | --- | --- |
  | pre\_check|删除节点时在非删除节点上执行的预检查命令，若返回非0值表示不可删除节点。此项是 scale\_in 和 scale\_out 独有。|
- restart <br />
  服务重启动命令，具体参数参考初始化命令 init。
- destroy <br />
  销毁命令，在删除集群或者节点时会触发该命令的执行，通常用作删除资源之前检查安全性，具体参数参考初始化命令 init。
  | 参数|描述|
  | --- | --- |
  | allow\_force |是否允许强制删除, 默认值为 true 表示允许强制删除该节点, 强制删除时即使 destroy 的 cmd 返回非 0 值也会继续将节点删除。|
- post\_stop\_service　<br />
  控制销毁命令是在 [stop](#stop) 命令执行完毕后执行还是之前执行，如果 post\_stop\_service 为 true 则表示 destroy 在 stop 后执行；默认 (即不加此项) 是之前执行。此项是 destroy 独有。
- custom_service <br />
  用户自定义命令，具体参数参考备份命令 backup，除此之外自定义的服务参数还有：
  | 参数|描述|
  | --- | --- |
  | type |type = custom 表示这个服务是自定义的， 自定义的名字 (即 key，此处为 custom_service) 开发者自行定义。|

  > 注：用户可以自定义多个服务。自定义服务在用户使用时，展示的服务名就是该 service 的 key。如果想要对其进行国际化，可以在 locale 中添加它的翻译。

- env <br />
  分特定角色节点的参数配置和应用级别的参数配置，每类应用有自身特有的可配置应用参数，比如 ZooKeeper的 zoo.cfg 里的参数配置等，每类节点也会有不同于应用全局级别的可配置参数。注意：节点之间或节点与集群全局之间的参数没有任何关系，都是独立的。
- endpoints <br />
  应用可定义 endpoints 供第三方使用，服务名称可以自定义，但建议使用通用的名称比如 client，manager 等，这样第三方应用使用的时候更方便一些，被第三方应用使用的可能性更大一些。详细的服务信息必须包括 port，但 protocol 非必须项，即可以不提供 protocol 信息。port 除可以是整数端口外，也可以是一个指向 env 的变量，如 "port":"env.port"或 "port":"role_name.env.port"，这样用户在更新这个变量的时候会自动更新其关联的 endpoint 端口。如果您的应用是一个大家熟知的且 enpoint 不会被修改，可以省略这一定义，比如 ZooKeeper，通用端口是2181。


## 数据类型

config.json 文件里对每个变量需要定义其类型、取值范围、默认值等，其中类型和默认值为必填项。

| 参数 | 参数 | 描述 |
| --- | --- | --- |
| type|\-|变量数据类型，支持：integer，boolean，string，number (浮点数)，array。|
| range|\-|变量定值的取值范围，数组类型，如 "range": [1,3,5,7,9]。|
| max|\-|变量取值的最大值，integer 和 number 类型有效。|
| min|\-|变量取值的最小值，integer 和 number 类型有效。|
| default|\-|变量默认值 |

## 国际化

config.json 中的 label 和 description 在控制台呈现时，默认使用配置文件中定义的内容。另外，一些自定义的服务、监控项也会直接展示到集群使用者的操作界面上。控制台的用户切换语言时，不改变该描述。如果您想让不同语言场景的用户能看到该语言的描述，请在提交的包中添加 locale 文件夹，并根据您希望国际化的语言提供翻译文件。

翻译文件是“语言名称.json”这样的格式，如 locale/en.json，locale/zh-cn.json。例如简体中文的翻译文件 zh-cn.json 内容示例如下：

```json
{
    "Master": "主节点",
    "Slave": "从节点",
    "CPU": "CPU",
    "Memory": "内存",
    "Subnet": "私有网络",
    "The name of the service": "服务名称",
    "The description of the service": "服务描述",
    "CPUs of each node": "每个节点的 CPU 数量",
    "Memory of each node (in MiB)": "每个节点的内存大小（单位 MiB）",
    "The subnet that the application will join": "应用运行的私有网络环境",
    "scale_horizontal": "横向扩容"
}
```

进行国际化的配置内容包括：

- config.json 文件中，角色名称、节点配置、私有网络、环境变量 env 各配置项的 label 作为待填写项名称，description 作为待填项的描述。label 和 description 会进行国际化。
- cluster.json.tmpl 文件中 type 为 custom 的 service，会使用 service 的 key 作为用户执行自定义服务的展示内容，并进行国际化。