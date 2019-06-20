import React, { Component } from 'react'
import classnames from 'classnames'

import Layout from 'layout'
import Header from 'components/Header'
import Footer from 'components/Footer'
import DownloadModal from 'components/DownloadModal'
import MailModal from 'components/MailModal'
import banners from 'config/banners'
import scenes from 'config/scenes'

import styles from './index.module.scss'

scenes.push(scenes[0])
scenes.unshift(scenes[scenes.length - 1])
const intervalTime = 4000

export default class Home extends Component {
  state = {
    isDownloadOpen: false,
    isMailOpen: false,
    currentNumber: 1,
    showNumber: 2,
    hasTransition: true,
  }

  componentDidMount() {
    this.play()
  }

  componentWillUnmount() {
    this.pause()
  }

  openVersionModal = () => {
    this.setState({
      isDownloadOpen: true,
      isMailOpen: false,
    })
  }

  submitDownload = () => {
    this.setState({
      isDownloadOpen: false,
      isMailOpen: true,
    })
  }

  closeModal = () => {
    this.setState({
      isDownloadOpen: false,
      isMailOpen: false,
    })
  }

  play = () => {
    this.autoChange = setInterval(() => this.changeScene(1), intervalTime)
  }

  pause = () => {
    clearInterval(this.autoChange)
  }

  changeScene = number => {
    const { currentNumber, showNumber } = this.state
    const total = scenes.length
    if (
      (showNumber > 1 && number === -1) ||
      (showNumber < total && number === 1)
    ) {
      let current = currentNumber + number
      current = current === 0 ? total - 2 : current
      current = current === total - 1 ? 1 : current
      const show = showNumber + number
      this.setState({
        hasTransition: true,
        currentNumber: current,
        showNumber: show,
      })

      if (show === 1 || show === total) {
        setTimeout(() => {
          this.setState({
            hasTransition: false,
            showNumber: show === 1 ? total - 1 : 2,
          })
        }, 500)
      }
    }
  }

  renderSceneBanner() {
    const { currentNumber, showNumber, hasTransition } = this.state
    const total = scenes.length - 2
    const sceneLeft = `${100 * (1 - showNumber)}%`

    return (
      <div className={styles.sceneBanner}>
        <div
          className={styles.sceneContent}
          onMouseEnter={() => this.pause()}
          onMouseLeave={() => this.play()}
        >
          <div className={styles.title}>应用场景</div>
          <div className={styles.contentOuter}>
            <div
              className={classnames(styles.content, {
                [styles.contentTransition]: hasTransition,
              })}
              style={{ left: sceneLeft }}
            >
              {scenes.map((scene, index) => (
                <div key={index} className={styles.scene}>
                  <img className={styles.currentImg} src={scene.number_img} />
                  <div className={styles.name}>{scene.name}</div>
                  <div className={styles.description}>{scene.description}</div>
                  <button onClick={this.openVersionModal}>获取社区版 →</button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.numberButton}>
            <label
              className={styles.currentNumber}
              onClick={() => this.changeScene(-1)}
            >
              <img
                className={styles.arrowLeft}
                src="/images/home/arrow-left.svg"
              />
              {currentNumber}
            </label>
            <label onClick={() => this.changeScene(1)}>
              {total}
              <img
                className={styles.arrowRight}
                src="/images/home/arrow-right.svg"
              />
            </label>
          </div>
          <div className={styles.leftShadow} />
          <div className={styles.rightShadow} />
        </div>
      </div>
    )
  }

  renderBannerWord(banner) {
    return (
      <div className={styles.wrapper}>
        {banner.position === 'left' && (
          <div className={classnames(styles.image, 'webShow')}>
            <img src={banner.image} />
          </div>
        )}
        <div className={styles.words}>
          <div className={styles.name}>{banner.name}</div>
          <div className={styles.title}>
            <label>{banner.titlePrefix}</label>
            {banner.title}
          </div>
          <div className={classnames(styles.image, 'mobileShow')}>
            <img src={banner.image} />
          </div>
          <div className={styles.description}>{banner.description}</div>
          <label className={styles.button}>了解更多 →</label>
        </div>
        {banner.position === 'right' && (
          <div className={classnames(styles.image, 'webShow')}>
            <img src={banner.image} />
          </div>
        )}
      </div>
    )
  }

  renderTopBanner() {
    return (
      <div className={styles.topBanner}>
        <Header maxTop={80} />
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <label className={styles.logo}>
              <img src="/images/op-logo-blank.svg" />
            </label>
            <label className={styles.word}>多云应用管理平台</label>
          </div>
          <div className={styles.slogan}>
            Run{' '}
            <label className={styles.move}>
              <div className={styles.moveList}>
                <p>any application</p>
                <p>Container</p>
                <p>VM-Based</p>
                <p>any application</p>
              </div>
            </label>{' '}
            at any scale on{' '}
            <label className={styles.scroll}>
              <div className={styles.showList}>
                <p>any infrastructure</p>
                <p>Kubernetes</p>
                <p>AWS</p>
                <p>QingCloud</p>
                <p>Aliyun</p>
                <p>any infrastructure</p>
              </div>
            </label>
          </div>

          <div className={styles.sloganMobile}>
            Run any application at any scale on any infrastructure
          </div>
          <label onClick={this.openVersionModal} className={styles.button}>
            获取社区版 →
          </label>

          <img
            src="/images/home/banner-top-top.svg"
            className={styles.imgTop}
          />
          <img
            src="/images/home/banner-top-bottom.svg"
            className={styles.imgBottom}
          />
        </div>
        <img
          src="/images/home/banner-top-right.svg"
          className={styles.imgRight}
        />
      </div>
    )
  }

  render() {
    const { isDownloadOpen, isMailOpen } = this.state

    return (
      <Layout>
        {this.renderTopBanner()}
        {banners.map(banner => (
          <div className={styles.homeBanner} key={banner.name}>
            {this.renderBannerWord(banner)}
          </div>
        ))}
        {this.renderSceneBanner()}
        <Footer />

        <DownloadModal
          isOpen={isDownloadOpen}
          onClose={this.closeModal}
          onSubmit={this.submitDownload}
        />
        <MailModal
          isOpen={isMailOpen}
          onClose={this.closeModal}
          onSubmit={this.closeModal}
        />
      </Layout>
    )
  }
}
