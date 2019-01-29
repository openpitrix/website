import styled from 'styled-components'

export const Style = styled.div`
.header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 72px;
  
  .wrapper {
    margin: 0 auto;
    width: 1200px;
    height: 72px;
  }

  .logo {
    float: left;
    display: block;
    margin: 26px 0;
    width: 149px;
    height: 20px;
    svg {
      height: 20px;
      width: 100%;
    }
  }

  .links {
    float: left;
    margin: 26px 0;
    margin-left: 56px;

    a {
      display: inline-block;
      margin: 0 24px;
      padding-bottom: 8px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      opacity: 0.8;
      border-bottom: 2px solid transparent;
    }

    a:hover,
    a.active {
      opacity: 1;
    }

    a.active {
      border-color: #f6a132;
    }
  }


  .otherLinks {
    float: right;
    margin: 26px 0;

    a {
      display: inline-block;
      margin-right: 48px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;

      &:last-child {
        margin-right: 0;
      }
    }

    .github {
      float: left;
     display: inline-block;
     width: 16px;
     height: 16px;
     margin-right: 4px;
     margin-top: 2px;
    }
  }
}

.blankHeader {
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

.darkHeader {
  background-image: radial-gradient(circle at 0 0, #8454cd,  #343945);
}
.
`
