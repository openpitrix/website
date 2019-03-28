---
title: "如何实现新的 Provider Plugin"
---

截止到目前，OpenPitrix 支持以下几种 Provider Plugin：

* QingCloud
* AWS
* Kubernetes

如果您希望实现一个新的 Provider Plugin，可按照以下几步进行：

## 实现 ProviderInterface 中所有函数

* pkg/plugins/ 目录下创建一个以该 Provider Plugin 名称命名的文件夹。
* 创建 provider.go 实现 “pkg/plugins/plugin.go” 中 ProviderInterface 的所有函数。如果实现 VM-Based 类型的 Provider Plugin，provider.go 的实现可参考 “pkg/plugins/aws/provider.go” 或者 “pkg/plugins/qingcloud/provider.go”。

```
type ProviderInterface interface {
	// 通过 versionId 获取应用配置包，根据用户输入 conf 配置，将真实应用实例信息写入 clusterWrapper，后续会写入 db
	ParseClusterConf(ctx context.Context, versionId, runtimeId, conf string, clusterWrapper *models.ClusterWrapper) error
	// 将 job 拆分成多层的 task，以便后续逐层执行
	SplitJobIntoTasks(ctx context.Context, job *models.Job) (*models.TaskLayer, error)
	// 处理 task
	HandleSubtask(ctx context.Context, task *models.Task) error
	// 等待 task 执行完成
	WaitSubtask(ctx context.Context, task *models.Task) error
	// 获取当前 runtime 所有可部署应用实例的 subnet
	DescribeSubnets(ctx context.Context, req *pb.DescribeSubnetsRequest) (*pb.DescribeSubnetsResponse, error)
	// 获取当前 runtime 所有可部署应用实例的 vpc
	DescribeVpc(ctx context.Context, runtimeId, vpcId string) (*models.Vpc, error)
	// 校验当前 runtime 资源情况，比如 quota 信息等
	CheckResource(ctx context.Context, clusterWrapper *models.ClusterWrapper) error
	// 校验当前 runtime 下 api server 的 url，credential 信息，可用区(zone) 
	ValidateCredential(ctx context.Context, url, credential, zone string) error
    // 获取用户在当前 runtime 下所有可用区(zone)
	DescribeRuntimeProviderZones(ctx context.Context, url, credential string) ([]string, error)
	// 更新应用实例状态，根据 runtime 中资源情况，更新应用实例或应用实例节点的状态
	UpdateClusterStatus(ctx context.Context, job *models.Job) error
	// 获取应用实例更多详情信息，可在 DescribeClusters 时调用展示更多信息
	DescribeClusterDetails(ctx context.Context, cluster *models.ClusterWrapper) error
}
```

## 实现 ProviderHandlerInterface 中所有函数 [可选]
> 如果实现 VM-Based 类型的 Provider Plugin，需要完成此步，应用实例的所有生命周期会自动按照 FrameInterface 中定义的方式操作。

* 创建 provider_handler.go 实现 “pkg/plugins/vmbased/handler_interface.go” 中 ProviderHandlerInterface 的所有函数。

```
type ProviderHandlerInterface interface {
	// 创建主机
	RunInstances(task *models.Task) error
	// 等待创建主机完成
	WaitRunInstances(task *models.Task) error

    // 关闭主机
	StopInstances(task *models.Task) error
	// 等待关闭主机完成
	WaitStopInstances(task *models.Task) error

    // 启动主机
	StartInstances(task *models.Task) error
	// 等待启动主机完成
	WaitStartInstances(task *models.Task) error

    // 删除主机
	DeleteInstances(task *models.Task) error
	// 等待删除主机完成
	WaitDeleteInstances(task *models.Task) error

    // 扩容主机
	ResizeInstances(task *models.Task) error
	// 等待扩容主机完成
	WaitResizeInstances(task *models.Task) error
	
    // 创建硬盘
	CreateVolumes(task *models.Task) error
	// 等待创建硬盘完成
	WaitCreateVolumes(task *models.Task) error

    // 卸载硬盘
	DetachVolumes(task *models.Task) error
	// 等待卸载硬盘完成
	WaitDetachVolumes(task *models.Task) error

    // 挂载硬盘
	AttachVolumes(task *models.Task) error
	// 等待挂载硬盘完成
	WaitAttachVolumes(task *models.Task) error

    // 删除硬盘
	DeleteVolumes(task *models.Task) error
	// 等待删除硬盘完成
	WaitDeleteVolumes(task *models.Task) error

    // 扩容硬盘
	ResizeVolumes(task *models.Task) error
	// 等待扩容硬盘完成
	WaitResizeVolumes(task *models.Task) error

	// 等待 frontgate 可用，该方法已在 FrameHandler 中实现
	WaitFrontgateAvailable(task *models.Task) error
}
```

## 配置中增加该 Provider Plugin 支持

* “pkg/plugins/plugin.go” 中 init 函数部分注册该 Provider Plugin。

```
func init() {
	RegisterProvider(constants.ProviderKubernetes, helm.NewProvider())
	RegisterProvider(constants.ProviderQingCloud, qingcloud.NewProvider())
	RegisterProvider(constants.ProviderAWS, aws.NewProvider())
}
```