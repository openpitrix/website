---
title: "安装使用 OPCTL 开发者工具"
---

OPCTL 是 OpenPitrix 内部的开发者工具, 用来调用 OpenPitrix 的 API。

## 安装 OPCTL

```
go get -u openpitrix.io/openpitrix/cmd/opctl
go install openpitrix.io/openpitrix/cmd/opctl
```

## 使用说明

使用 OPCTL 前, 需要先在 OpenPitrix 界面上生成账号对应的 client_id 和 client_secret

假设已经有如下的配置

```
$ cat ~/.openpitrix/config.json
{
  "client_id": "x",
  "client_secret": "y",
  "endpoint_url": "http://localhost:9100"
}
```

此时表示需要调用的 OpenPitrix 地址是 `http://localhost:9100`， client_id 为 x， client_secret 为 y。

OPCTL 会自动使用配置文件中的信息调用 token 接口进行认证。

可以通过执行 `opctl -h` 来查看其所支持的命令，每个命令都有自己不同的参数调用，也可以通过使用 -h 参数查询，比如 

```
$ opctl describe_apps -h
Usage:
  opctl describe_apps [flags]

Flags:
      --app_id strings
      --category_id strings
      --chart_name strings
  -f, --config string             specify config file of your credentials (default "/Users/zheng1/.openpitrix/config.json")
      --display_columns strings
  -h, --help                      help for describe_apps
      --limit int                 default is 20, max value is 200. (default 20)
      --name strings
      --offset int                default is 0.
      --owner_path strings
      --repo_id strings
      --reverse
      --search_word string
      --sort_key string
      --status strings

```

上面表示 `opctl describe_apps` 命令所能支持的参数。

## 命令行自动补全

执行 `opctl completion -h` 可以看到 bash/zsh 对应的命令行补全建议.