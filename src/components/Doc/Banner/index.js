import React from 'react'
import styled from 'styled-components'

import Search from 'components/Search'
import { ReactComponent as BannerPic } from 'assets/doc-banner-pic.svg'

export default class DocBanner extends React.Component {
  render() {
    return (
      <Banner>
        <div className="wrap">
          <div className="text">欢迎使用 OpenPitrix 文档</div>
          <Search className="search" />
        </div>
      </Banner>
    )
  }
}

const Banner = styled.div`
  background-image: radial-gradient(circle at 46% 0, #8454cd, #343945);
  height: 340px;
  position: relative;
  top: 72px;
  margin-bottom: 64px;
  z-index: 1;

  .wrap {
    background: url('/images/document/banner-pic.svg') no-repeat;
    background-position: center right;
    margin-left: auto;
    margin-right: auto;
    padding: 0 24px;
    max-width: 920px;
    width: 100%;
    height: 100%;

    .text {
      padding: 114px 0 20px;
      font-family: 'Roboto';
      font-size: 32px;
      font-weight: 500;
      line-height: 40px;
      color: #fff;
    }

    .search {
      input {
        border-color: transparent;
        background: rgba(255, 255, 255, 0.08);
        opacity: 0.5;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }
      }
    }
    .bannerPic {
      svg {
        float: right;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    width: calc(100vw - 256px);
    left: 256px;
  }

  @media only screen and (max-width: 768px) {
    height: 260px;
    top: 56px;

    .wrap {
      padding: 0 40px;
      .text {
        padding: 78px 0 20px;
        font-size: 24px;
      }

      .search {
        input {
          background: rgba(0, 0, 0, 0.2);

        &:hover {
          background: rgba(0, 0, 0, 0.4);
        }
      }
    }
    }
  }
`
