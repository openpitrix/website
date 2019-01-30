import React from 'react';
import styled from 'styled-components';

import Search from 'components/Search';

const Banner=styled.div`
  width: calc(100vw - 256px);
  background-image: radial-gradient(circle at 46% 0, #8454cd, #343945);
  height: 340px;
  position: relative;
  left: 256px;
  top: 72px;
  margin-bottom: 64px;
  
  .text {
    position: relative;
    justify-content: center;
    display: flex;
    height: 100%;
    align-items: center;
    top: -36px;
    
    font-family: Roboto;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.25;
    text-align: center;
    color: white;
  }
  
  .search {
    position: absolute;
    right: inherit;
    top: 194px;
    left: 50%;
    margin-left: -175px;
    
    input {
      color: white;
    }
  }
`;

export default class DocBanner extends React.Component {
  render() {
    return (
      <Banner>
        <div className="text">欢迎使用 OpenPitrix 文档</div>
        <Search className="search" />
      </Banner>
    )
  }
}
