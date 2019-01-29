import React, { Component } from 'react';

import Banner from '../../components/Banner';

import { ReactComponent as InstallAll } from '../../assets/install/all.svg';

import { Style } from './styled';

const installs = [
  {
    icon: InstallAll,
    title: 'All-in-One 模式',
    description:
      'All-in-One 模式，即单节点部署，需要预先安装 Docker 、 Docker-Compose 、 Make 等依赖软件。',
  },
  {
    icon: '',
    title: 'Kubernetes 模式',
    description:
      '部署到 Kubernetes 集群环境中， OpenPitrix 可作为基于 Kubernetes 的一个应用管理系统。',
  },
  {
    icon: '',
    title: 'Helm-Chart 模式',
    description:
      '将 OpenPitrix 以 Helm Chart 的方式部署到 Kubernetes 集群环境中，需要预先安装 Helm Client 和 Tille 。',
  },
];

export default class Install extends Component {
  renderCard(item) {
    return (
      <div className="card">
        <div className="icon">
          <InstallAll />
        </div>
        <div className="title">{item.title}</div>
        <div className="description">{item.description}</div>
      </div>
    )
  }

  render() {
    return (
      <Style>
        <Banner />

        <div className="bannerWord">
          <div className="wrapper">
            <h2>OpenPitrix 安装</h2>
            <h5>
              OpenPitrix 支持 all-in-one 、 Kubernetes 和 Helm Chart
              三种部署模式。
            </h5>
            {installs.map(item => (
              <div className="cardOuter" key={item.name}>
                {this.renderCard(item)}
              </div>
            ))}
          </div>
        </div>
      </Style>
    )
  }
}
