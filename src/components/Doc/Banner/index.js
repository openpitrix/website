import React from 'react';
import styled from 'styled-components';

import Search from 'components/Search';
import {ReactComponent as BannerPic} from 'assets/doc-banner-pic.svg';

export default class DocBanner extends React.Component {
  render() {
    return (
      <Banner>
        <div className="wrap">
          <div className="text">欢迎使用 OpenPitrix 文档</div>
          <div className="bannerPic">
            <BannerPic/>
          </div>
          <Search className="search" />
        </div>
      </Banner>
    )
  }
}

const Banner=styled.div`
  background-image: radial-gradient(circle at 46% 0, #8454cd, #343945);
  height: 340px;
  position: relative;
  top: 72px;
  margin-bottom: 64px;
  
  .wrap {
    margin-left: auto;
    margin-right: auto;
    width: 920px;
    height: 100%;
    
    .text {
      position: relative;
      top: 114px;
      font-family: Roboto;
      font-size: 32px;
      font-weight: 500;
      line-height: 1.25;
      color: white;
    }
    
    .search {
      position: relative;
      left: 0;
      input {
        color: white;
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
  width: 100%;
  .wrap {
    width: auto;
  }
}
`;
