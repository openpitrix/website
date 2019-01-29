import styled from 'styled-components'

export const Style = styled.div`
.header, .header-dark {
  position: fixed;
  top: 0;
  left:0;
  z-index: 2;
  width: 100%;
  height: 72px;
  background-color:#fff;
  
  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .header-logo {
    float: left;
    display: block;
    margin-top: 24px;
    height: 24px;
    width: 178px;

    @media only screen and (max-width: 768px) {
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 30px;
      margin-left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  .links {
    float: right;
    a {
      display: inline-block;
      margin: 26px 36px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #343945;
    }
    a:hover, a.active {
      color: #5628b4;
    }
  }
}

.header-dark {
 background-color:#343945;
 .links {
    float: right;
    a {
      color: #8c96ad;
    }
    a:hover, a.active {
      color: #fff;
    }
  }
}
`
