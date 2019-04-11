---
title: OpenPitrix Insight
description: ""
author: rayzhou2017
date: 2018-03-27
categories:
  - Log
  - OpenPitrix
tags:
  - Markdown
  - TeamBuild
  - Softskill
  - Microservice
---

> OpenPitrix - an open-source system to manage applications on multiple clouds

### Background

Nowadays cloud computing is widely adopted in enterprise organizations. Furthermore, most of enterprises have multi-cloud strategy according to the [survey from RightScale](https://www.rightscale.com/blog/cloud-industry-insights/cloud-computing-trends-2018-state-cloud-survey). There are quite a few reasons that a company deploys more than one cloud environment, usually from different vendors, resulting that shadow IT becomes a reality again in cloud era. Therefore, how to manage and automate multi-cloud environment becomes an emerging requirement, especially for application management. Moreover, it is challenging to create one stop store that manages different types of applications, including traditional application (or called monolithic application, or traditional distributed application in master-slave or peer-to-peer architecture style), microservice application, and serverless application which is increasingly hot recently. OpenPitrix is such a platform to solve these problems. In one word, 

>OpenPitrix is an open-source system to package, deploy and manage different types of applications including traditional application, microservice application and serverless applications into multiple cloud environment such as AWS, Azure, Kubernetes, QingCloud, OpenStack, VMWare etc.

Microservices, also known as microservice architecture, is the trend and becomes the preferred way to create new enterprise applications, and Kubernetes is [the leading orchestration platform](https://www.cncf.io/blog/2017/06/28/survey-shows-kubernetes-leading-orchestration-platform/) for automating deployment, scaling, and management of containerized applications. However, there are tons of traditional applications people want to move them into cloud without transforming the architecture. And adopting microservice or serverless architecture is a long way to go for many companies. So we need to help people move traditional applications into cloud.

On March 23, 2017, we released [AppCenter on QingCloud](https://appcenter.qingCloud.com) to bridge enterprise application vendors and customers. The beauty of the platform is the learning curve is extremely low for developers to move traditional software to QingCloud with all features of cloud application such as agility, elasticity, scalability, monitoring and so on. Usually it takes a couple of hours for a developer to understand the working flow, and about one or two weeks (depends on the complexity of the application) to move an application to cloud comparing with several months in old ways. Many customers love the platform but raise the request that they want the platform to support their multi-cloud environment instead of QingCloud exclusively. So we redesign the platform with stepping further to support multiple clouds and multi-type applications.

It is hard, harder than we thought, even we have years of cloud application development experience and successfully developed AppCenter. Since August of 2017 when we initiated [OpenPitrix](https://github.com/openpitrix/openpitrix) project on Github, we have been thinking over each key point of the system before we started the first line functional code on Feb. 24, 2018. The discussion can be found on [GitHub](https://github.com/openpitrix/openpitrix/issues). In next sections we will explain them in more details.

### Main target features

With the backgroud introduced above, we come up with the following target features.

* Support multiple clouds such as AWS, Azure, Kubernetes, QingCloud, OpenStack, VMWare and so on.
* Cloud support is hightly extendable and pluggable.
* Support a variaty of application types including traditional application, microservice application and serverless application.
* Application type support is extendable which means no matter what new application type emerges in the future, the platform is able to support it by adding corresponding pluggin.
* Application repository is configurable, meaning applications can be an asset to sell on any store powered by OpenPitrix.
* The visibility of application repository is configurable including accessible to public, to private or to a group of users, making OpenPitrix as a supermarket that each vendor is able to operate her/his own store. 

### Use cases

Typically there are several use cases for OpenPitrix.

* Deployed as one-stop-shop application management platform in an organization to support multiple cloud systems including hybrid cloud.
* Cloud management platform (CMP) can use OpenPitrix as a component to manage applications in multi-cloud environment.
* Deployed as application management system in Kubernetes. OpenPitrix is different than Helm, OpenPitrix uses Helm under the hood though. In an organization, people usually want to categorize applications by status such as developing, testing, staging, production; or by departments of their organization, to name a few. 

### High-level architecture

The basic idea is to decouple applications and runtime (We call runtime instead of cloud here) as shown below. The runtime an application can run on is by matching the labels of runtime and the selectors of the repository where the application is from besides the provider. So when an end user selects an application from the store and tries to deploy it, the system will find the matching runtime environment the application can run which is defined by its repo labels. If there are more than one environment it can run, then pop up a list for the user to choose from to deploy the application. Please read the detailed design [here](https://github.com/openpitrix/openpitrix/tree/master/docs/design).

![architecture](https://raw.githubusercontent.com/openpitrix/openpitrix/master/docs/images/arch.png)

### Application repo subsystem

The repo subsystem includes repo mananger, repo indexer and internet-accessible repo storages as shown in high-level architecture, where repo manager includes repo service and its backend database as shown below. User can configure the repo info for an OpenPitrix-based store including URL, credential, visibility etc. Usually system operator or developer can create repos for the platform. The deamon repo indexer periodically scans new added repo or any updates within existing repo and populates repo info into app database that is the backend store of app manager/service. Technically speaking, repo storage is independent of a specific OpenPitrix platform. So any repo storage can be hooked into an OpenPitrix-based platform which is ideal for sharing applications. Please go to the [issue](https://github.com/openpitrix/openpitrix/issues/96) for more information.

![repo arch](https://user-images.githubusercontent.com/4156721/38145007-d6abf540-3479-11e8-834f-9caae92a71ff.png)

>Applications organized by repo can be an asset to sell on any store powered by OpenPitrix.

### How to move traditional applications to multiple clouds

First of all, we do not differentiate multiple cloud and hybrid cloud. In this article, multiple cloud means more than one cloud environment no matter they are public cloud or private cloud, or from different providers or not.

#### Specification

Obviously we will borrow lots of experience from QingCloud AppCenter about how to 'cloudify' an application including specification. For simplicity, here we show an incomplete version of specification for cloudifying ZooKeeper as shown below. For complete one please go to [GitHub](https://github.com/QingCloudAppcenter/Zookeeper/tree/master/3.4.9) for reference. The specification is quite self-explanatory. The file *cluster.json.tmpl* defines the name, description, how many nodes and the cpu, memory, storage, image, lifecyle of each node of a ZooKeeper cluster. The variables in double curly brace are from the input by end user from UI which are defined by the file *config.json*. So the developer of ZooKeeper application composes and packages the two files and uploads to OpenPitrix-based store, then end user can choose the application, input required information and deploy it to a cloud environment. The package that contains the two files and extra language files is alike the image being template for an instance, while the package is a template for an application which is much more complicated than image in that it could contain many more images and defines the whole lifecycle of an application cluster. Moreover, it supports customized mornitoring, health check and many more features. As we can see, developer does not need to program for moving a traditional application into cloud. 

<details><summary>cluster.json.tmpl for ZooKeeper</summary>

```
{
    "name": {{cluster.name}},
    "description": {{cluster.description}},
    "subnet": {{cluster.subnet}},
    "nodes": [{
        "container": {
            "type": "kvm",
            "zone": "pek3a",
            "image": "img-svm7yple"
        },
        "count": {{cluster.zk_node.count}},
        "cpu": {{cluster.zk_node.cpu}},
        "memory": {{cluster.zk_node.memory}},
        "volume": {
            "size": {{cluster.zk_node.volume_size}}
        },
        "services": {
            "start": {
                "cmd": "/opt/zookeeper/bin/zkServer.sh start;/opt/zookeeper/bin/rest.sh start"
            },
            "stop": {
                "cmd": "/opt/zookeeper/bin/rest.sh stop;/opt/zookeeper/bin/zkServer.sh stop"
            }
        }
    }]
}
```
</details>

<details><summary>config.json for ZooKeeper</summary>

```
{
    "type": "array",
    "properties": [{
        "key": "cluster",
        "description": "ZooKeeper release 3.4.9 cluster properties",
        "type": "array",
        "properties": [{
            "key": "name",
            "label": "Name",
            "description": "The name of the ZooKeeper service",
            "type": "string",
            "default": "ZooKeeper",
            "required": "no"
        }, {
            "key": "description",
            "label": "Description",
            "description": "The description of the ZooKeeper service",
            "type": "string",
            "default": "",
            "required": "no"
        }, {
            "key": "subnet",
            "label": "Subnet",
            "description": "Choose a subnet to join",
            "type": "string",
            "default": "",
            "required": "yes"
        }, {
            "key": "zk_node",
            "label": "ZooKeeper Node",
            "description": "role-based node properties",
            "type": "array",
            "properties": [{
                "key": "cpu",
                "label": "CPU",
                "description": "CPUs of each node",
                "type": "integer",
                "default": 1,
                "range": [
                    1,
                    2,
                    4,
                    8
                ],
                "required": "yes"
            }, {
                "key": "memory",
                "label": "Memory",
                "description": "memory of each node (in MiB)",
                "type": "integer",
                "default": 2048,
                "range": [
                    1024,
                    2048,
                    4096,
                    8192,
                    16384,
                    32768
                ],
                "required": "yes"
            }, {
                "key": "count",
                "label": "Node Count",
                "description": "Number of nodes for the cluster to create",
                "type": "integer",
                "default": 3,
                "range": [
                    1,
                    3,
                    5,
                    7,
                    9
                ],
                "required": "yes"
            }, {
                "key": "volume_size",
                "label": "Volume Size",
                "description": "The volume size for each node",
                "type": "integer",
                "default": 10,
                "required": "yes"
            }]
        }]
    }]
}
```
</details>

#### Architecture

The most challenging part is how one single traditional application package described above can be deployed into all supported cloud environment from the perspective of architecture since traditional application is virtual machine based. The discussion was hot offline and [online](https://github.com/openpitrix/openpitrix/issues/111). There are a couple of principles we need to follow.

* OpenPitrix itself can be deployed anywhere. So the platform must support end user to deploy application into a public cloud and a private cloud at the same time which means the OpenPitrix is able to deploy application via public internet.
* The architecture should be same for each IaaS provider.
* No hassle configuration is required for end user to deploy application, meaning everything is transparent to end user such as metadata service initialization.

After serveral rounds of discussion, we come up with the following solution. First of all, let's clarify some terms appearing in the architecture.

* __Drone__: The component consists of agent and [confd](https://github.com/openpitrix/libconfd). Confd is a daemon to auto configure app instance. Agent is responsilbe to communicate with Frontgate such as receiving cmd from end user. Agent is also responsible to start and stop confd according to the status of the application. Drone is pre-installed into each image of an application. 
* __Frontgate__: The component consists of proxy and etcd. Etcd is the metadata backend storage which stores the information about the clusters such as cluster name, description, how many nodes, the cmd sent by end user, so on and so forth. Proxy connects Pilot and the agent of the Drone. Since the virtual machine is running inside VPC, Pilot cann't communicate with Drone directly. So we must place a proxy between them. Frontgate is placed per VPC so that all clusters within one VPC will share one Frontgate. Frontgate is automatically placed under the screen by the system when end user deploys application for the first time. Frontgate is invisible to end user.  
* __Pilot__: The component accepts cmd and information from the cluster service such as creating a cluster, and forwards the cmd to Frontgate. It also receives information reported from Frontgate.

It is no doubt the working flow is complicated. Let's take deploying an application as an example. Simply speaking, it will go through the following steps.

1. An end user sends the request to API gateway which forwards the request to the corresponding service, i.e., cluster service. 
2. Cluster service puts the request to job queue from where job controller picks it up and puts the tasks within the job into task queue.
3. Task controller takes the tasks from the queue and calls the specific cloud API to create resource of the cluster. 
4. The cluster service also sends the cluster metadata to Pilot.
5. Pilot forards the information to Frontgate, and Frontgate registers the info into the backend store Etcd.
6. Confd of the Drone inside the application virtual machine watches the updates of the Etcd and configures the application.
7. Finally the agent of the Drone starts the application for end user to use the application. 

![vm-based Arichitecture](https://user-images.githubusercontent.com/4156721/38134552-2fbb8ea4-3446-11e8-90b5-a5f5c0e2d249.png)

#### Application image 

As said above, traditional application is usually deployed into virtual machine while microservices are containerized. If we use virtual machine to support traditional applications deployed to multiple clouds, a big challenge arises. An application developer/vendor has to upload or create images used by the application to each environment which seems impossible in practice especially in public cloud where providers have many regions and zones. So running Docker inside virtual machine is feasible as a workaround by pushing Docker images in one place and pulling the images into virtual machine running in a cloud environment. This solution has one problem that could happen in some places where internet is poor to downlowd Docker images. It is not user friendly to take so long time to deploy an application because of the long pulling of Docker images. To fix such problem, a cache or mirror for each cloud environment is a good solution. The second problem is developer needs to know Docker which seems not a big issue since in my opinion mastering Docker is a basic skill for developers today.

With that being said, we need to support installing application software directly in VM and distributing the VM to each cloud environment for the following reasons. 
* Some applications require customized Linux kernel. 
* Developers don't know Docker, or simply don't want to use Docker to move traditional applications into cloud because of extra complexity.
* End users are unwilling to create a container orchetration cluster such as Kubernetes aforehand to run the application that could be containerized if using Docker, or don't have Kubernetes environment.

>In the first release we use Docker in VM to solve application image distribution issue. In next releases we will support intalling application software directly in VM. 

### How to support multiple types of application

As we said, OpenPitrix must support a variety of application types. When a user chooses an application to deploy, the cluster service will identify the application type and invoke the corresponding provider plugin to create the cluster. We use *provider interface* and *provide plugin* to support application types including future application types we just don't know yet . Now we have two types of provider interface: vm-based and container-based. The former is for supporting traditional applications which we already explained in previous section. Now we need to figure out how to support the increasingly popular internet-scale based applications: microservices and serverless. For the first release we won't include serverless since this kind of application does not have standard yet, and we don't perceive who is winning the game. No one in the market is compatible with other major providers. And it is easy to fall in trap to invent a generic "standard". So we put it away and see what is going to happen in regards to serverless application standards. On the other hand, Kubernetes already won the market of orchestrating containerized application. Therefore, we decide to follow Kubernetes. [Helm](https://github.com/kubernetes/helm) is good so far as the Kubernetes package manager. In the first version of OpenPitrix, we use Helm as the deployment tool for Kubernetes applications. In next versions, we might support pure Kubernetes workload format.

As the following picture shown, we will pack Helm client into OpenPitrix. The server called Tiller should be packed as part of OpenPitrix as well so that end user does not do anything more for deploying an application into Kubernetes. However, at the time of writing, Helm server has bug to manage multiple Kubernetes clusters. There are issues [1586](https://github.com/kubernetes/helm/issues/1586) and [1918](https://github.com/kubernetes/helm/issues/1918) opened for this problem. Thus, before the problem is solved, we will request user to install Tiller into each Kubernetes cluster. When end user configures the Kubernetes clusters, the system will auto configure and test the connectivity between OpenPitrix and Kubernetes clusters. After that, end user is able to deploy Kubernetes application into any cluster of them.

![k8s application arch](https://user-images.githubusercontent.com/4156721/38145101-4b53de6c-347a-11e8-8ec8-7532e946318b.png)

### Summary

There are more features planned to do including developer console where developer is able to develop application, and view the statistics of who are using her/his applications, billing info, etc. OpenPitrix will evolve into a comprehensive solution for application management system on multi-cloud environment.  
