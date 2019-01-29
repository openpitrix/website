import React, { Component } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ReactComponent as LogoBlank } from '../../assets/op-logo-blank.svg'
import { ReactComponent as BannerImage } from '../../assets/home/banner-image-1.svg'
import banners from './banners'

import { Style } from './styled'

export default class Home extends Component {
  renderBannerWord(banner) {
    return (
      <div className="homeBanner">
        <div className="image">
          <BannerImage />
        </div>
        <div className={`words ${banner.position}`}>
          <div className="name">{banner.name}</div>
          <div className="title">
            <label>{banner.titlePrefix}</label>
            {banner.title}
          </div>
          <div className="description">{banner.description}</div>
          <button>了解更多 →</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Style>
        <div className="topBanner">
          <Header maxTop={150} />
          <div className="wrapper">
            <div className="title">
              <LogoBlank className="logo" />
              多云应用管理平台
            </div>
            <div className="slogan">
              Run <label>any application</label> at any scale on{' '}
              <label>any infrastructure</label>
            </div>

            <button>获取社区版 →</button>
          </div>
        </div>

        {banners.map(banner => (
          <div className="bannerOuter" key={banner.name}>
            {this.renderBannerWord(banner)}
          </div>
        ))}

        <Footer />
      </Style>
    )
  }
}
