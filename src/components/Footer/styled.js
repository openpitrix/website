import styled from 'styled-components'

export const Style = styled.div`
  width: 100%;
  background-color:#343945;
  
  .wrapper {
    box-sizing: border-box;
    max-width: 1200px;
    width:100%
    height: 72px;
    padding: 28px 0;
    margin: 0 auto;
    
    .logo {
      float: left;
      display: inline-block;
      height: 16px;
      width: 119px;
      svg {
        height: 16px;
        width: 100%;
      }
    }
  
   .copyright {
      float: right;
      display: inline-block;
      line-height: 26px;
      font-size: 14px;
      color: #fff;
      opacity: 0.8;
   }
  }
  
 .links {
  display: flex;
  max-width: 1200px;
  width:100%
  margin: 0 auto;
  padding: 76px 0 62px;

  .module {
    flex: 1;

    .title {
      margin-bottom: 12px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }

    li {
      margin-bottom: 12px;
      line-height: 24px;
      font-size: 14px;
      a {
        color: #d5dae5;
      }
    }
  }
}

`
