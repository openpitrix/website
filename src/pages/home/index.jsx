import React, { Component } from 'react'
import classnames from 'classnames'

import Header from 'components/Header'
import Footer from 'components/Footer'
import DownloadModal from 'components/DownloadModal'
import MailModal from 'components/MailModal'
import banners from 'config/banners'
import scenes from 'config/scenes'

import styles from './index.module.scss'

export default class Home extends Component {
  state = {
    isDownloadOpen: false,
    isMailOpen: false,
    currentNumber: 1,
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

  changeScene = number => {
    const { currentNumber } = this.state
    const total = scenes.length
    if (
      (currentNumber > 1 && number === -1) ||
      (currentNumber < total && number === 1)
    ) {
      this.setState({ currentNumber: currentNumber + number })
    }
  }

  renderSceneBanner() {
    const { currentNumber } = this.state
    const total = scenes.length
    const sceneLeft = `${100 * (1 - currentNumber)}%`

    return (
      <div className={styles.sceneBanner}>
        <div className={styles.sceneContent}>
          <div className={styles.title}>应用场景</div>
          <div className={styles.contentOuter}>
            <div className={styles.content} style={{ left: sceneLeft }}>
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
              className={classnames(styles.currentNumber, {
                [styles.noClick]: currentNumber === 1,
              })}
              onClick={() => this.changeScene(-1)}
            >
              <img
                className={styles.arrowLeft}
                src="/images/home/arrow-left.svg"
              />
              {currentNumber}
            </label>
            <label
              className={classnames({
                [styles.noClick]: currentNumber === total,
              })}
              onClick={() => this.changeScene(1)}
            >
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
            Run <label>any application</label> at any scale on{' '}
            <label>any infrastructure</label>
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
      <div>
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
      </div>
    )
  }
}
