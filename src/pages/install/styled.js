import styled from 'styled-components';
import v from '../../css/variable';

export const Style = styled.div`
.installBanner {
  height: 428px;
  background-image: radial-gradient(circle at 49% 107%, #724eae, #343945);
}

.bannerWord {
  padding-top: 180px;v
  min-height: 400px;
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  
  h2 {
    margin-bottom: 32px;
    line-height: 52px;
    font-size: 40px;
    font-weight: 500;
    color: #fff;
  }
  
  h5 {
    margin-bottom: 70px;
    line-height: 30px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
  }
  
  .cardOuter {
    float: left;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 24px;
    width: calc(33.33% - 17px);
    padding: 32px 38px;
    border-radius: 2px;
    border: 2px solid transparent;
    box-shadow: 0 1px 4px 0 rgba(73, 33, 173, 0.06), 0 4px 8px 0 rgba(35, 35, 36, 0.04);
    height: 200px;
    background-color: #fff;
    cursor: pointer;
  
    &:last-child {
      margin-right: 0;
    }
    
    &.active {
       border-color: #f6a132;
    }
  }
  
  .card {
    .icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin-bottom: 16px;
  
      svg {
        width: 40px;
        height: 40px;
      }
    }
  
    .title {
      margin-bottom: 12px;
      line-height: 20px;
      opacity: 0.8;
      font-size: 16px;
      font-weight: 500;
      color: #343945;
    }
  
    .description {
      height: 24px;
      opacity: 0.8;
      font-size: 12px;
      color: #78839e;
    }
  }
}

.installContent {
  width: 100%;
  min-height:220px;
  background-color: #f9fafb;
  .markdown {
    width: 788px;
    margin: 220px auto 84px;
    
    .title {
      font-size: 24px;
      font-weight: 500;
      color: ${v.N500};
      text-align: center;
    }
  }
}
`
