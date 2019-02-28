import React, { Component } from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'
import DownloadModal from 'components/DownloadModal'
import MailModal from 'components/MailModal'
import banners from './banners'

import styles from './index.module.scss'

const mobileWidth = 768

export default class Home extends Component {
  state = {
    isDownloadOpen: false,
    isMailOpen: false,
    isMobile: document.body.clientWidth <= mobileWidth,
  }

  componentDidMount() {
    window.onresize = this.handleResize
  }

  componentWillUnmount() {
    window.onresize=null
  }

  handleResize = () => {
    if (document.body.clientWidth <= mobileWidth) {
      this.setState({ isMobile: true })
    } else {
      this.setState({ isMobile: false })
    }
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

  renderSceneBanner() {
    return (
      <div className={styles.sceneBanner}>
        <div className={styles.sceneContent}>
          <div className={styles.title}>应用场景</div>
          <div className={styles.scene}>
            <img className={styles.currentImg} src="/images/home/scene-1.svg" />
            <div className={styles.name}>快速构建行业应用商店 </div>
            <div className={styles.description}>
              在以应用为核心的行业云或集团云构建中，基于 OpenPitrix
              的应用管理与计费、统计等商业运营功能，可以提供一套完整行业应用运营管理解决方案，助力用户快速实现应用商店的落地。
            </div>
            <button onClick={this.openVersionModal}>获取社区版 →</button>

            <div className={styles.number}>
              <label className={styles.currentNumber}>
                <img
                  className={styles.arrowLeft}
                  src="/images/home/arrow-left.svg"
                />
                1
              </label>
              <label>
                4
                <img
                  className={styles.arrowRight}
                  src="/images/home/arrow-right.svg"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBannerWord(banner) {
    const { isMobile } = this.state

    return (
      <div className={styles.wrapper}>
        {banner.position === 'left' && !isMobile && (
          <div className={styles.image}>
            <img src={banner.image} />
          </div>
        )}
        <div className={styles.words}>
          <div className={styles.name}>{banner.name}</div>
          <div className={styles.title}>
            <label>{banner.titlePrefix}</label>
            {banner.title}
          </div>
          {isMobile && (
            <div className={styles.image}>
              <img src={banner.image} />
            </div>
          )}
          <div className={styles.description}>{banner.description}</div>
          <label className={styles.button}>了解更多 →</label>
        </div>
        {banner.position === 'right' && !isMobile && (
          <div className={styles.image}>
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
    const { isDownloadOpen, isMailOpen, isMobile } = this.state

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
          isMobile={isMobile}
          onClose={this.closeModal}
          onSubmit={this.submitDownload}
        />
        <MailModal
          isOpen={isMailOpen}
          isMobile={isMobile}
          onClose={this.closeModal}
          onSubmit={this.closeModal}
        />
      </div>
    )
  }
}
