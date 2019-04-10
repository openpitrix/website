import React, { Component } from 'react'
import classnames from 'classnames'
import {graphql} from 'gatsby'
import get from 'lodash/get'
import find from 'lodash/find'

import Layout from 'layout'
import Header from 'components/Header'
import Footer from 'components/Footer'

import styles from './index.module.scss'

const installs = [
  {
    icon: '/images/install/all.svg',
    iconActive: '/images/install/all-active.svg',
    title: 'All-in-One 模式',
    type: 'all',
    description:
      'All-in-One 模式，即单节点部署，需要预先安装 Docker 、 Docker-Compose 、 Make 等依赖软件。',
  },
  {
    icon: '/images/install/kubernetes.svg',
    iconActive: '/images/install/kubernetes-active.svg',
    title: 'Kubernetes 模式',
    type: 'kubernetes',
    description:
      '部署到 Kubernetes 集群环境中， OpenPitrix 可作为基于 Kubernetes 的一个应用管理系统。',
  },
  {
    icon: '/images/install/helm.svg',
    iconActive: '/images/install/helm-active.svg',
    title: 'Helm-Chart 模式',
    type: 'helm',
    description:
      '将 OpenPitrix 以 Helm Chart 的方式部署到 Kubernetes 集群环境中，需要预先安装 Helm Client 和 Tille 。',
  },
]

class Install extends Component {
  state = {
    activeType: 'all',
  }

  selectInstall = type => {
    this.setState({ activeType: type })
  }

  renderCard(item) {
    const { activeType } = this.state

    return (
      <div
        className={styles.card}
        onClick={() => this.selectInstall(item.type)}
      >
        <div className={styles.icon}>
          <img src={item.type === activeType ? item.iconActive : item.icon} />
        </div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    )
  }

  render() {
    const { activeType } = this.state
    const showData = get(this.props, `data.${activeType}`, {})
    const title = get(showData, 'frontmatter.title', '')
    const install = find(installs, { type: activeType }) || {}

    return (
      <Layout>
        <Header maxTop={150} />
        <div className={styles.installBanner}>
          <div className={styles.wrapper}>
            <h2>OpenPitrix 安装</h2>
            <h5>
              OpenPitrix 支持 all-in-one 、 Kubernetes 和 Helm Chart
              三种部署模式。
            </h5>
            <div className={styles.typesOuter}>
              <div className={styles.installTypes}>
                {installs.map(item => (
                  <div
                    className={classnames(styles.cardOuter, {
                      [styles.active]: item.type === activeType,
                    })}
                    key={item.title}
                  >
                    {this.renderCard(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.installContent}>
          {showData.html && (
            <div className={styles.markdown}>
              <div className={styles.title}>
                <img className={styles.selectedIcon} src={install.icon} />
                <div className={styles.word}>{title}</div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: showData.html }} />
            </div>
          )}
        </div>

        <Footer />
      </Layout>
    )
  }
}

export default Install

export const pageQuery = graphql`
  query queryAll {
    all: markdownRemark(
      fields: { slug: { eq: "/docs/v0.3/zh-CN/installation/allinone/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
    kubernetes: markdownRemark(
      fields: { slug: { eq: "/docs/v0.3/zh-CN/installation/kubernetes/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
    helm: markdownRemark(
      fields: { slug: { eq: "/docs/v0.3/zh-CN/installation/helm-chart/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
  }
`
