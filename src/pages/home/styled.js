import styled from 'styled-components'

export const Style = styled.div`
.topBanner {
  height: 650px;
  background-image: radial-gradient(circle at 0 0, #8454cd, #343945);

  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .title {
    padding-top: 214px;
    line-height: 50px;
    font-size: 36px;
    color: #fff;
    font-weight: 200;

    .logo {
      float: left;
      margin-right: 4px;
      margin-top: 9px;
      width: 238px;
      height: 32px;
    }
  }

  .slogan {
    margin: 48px 0;
    line-height: 30px;
    font-size: 30px;
    font-weight: 500;
    color: #fff;
    >label {
      display: inline-block;
      padding: 8px 0 20px;
      border-top: 2px solid #f6a132;
      border-bottom: 2px solid #f6a132;
    }
  }

  button {
    width: 148px;
    height: 46px;
    border-radius: 3px;
    text-align: center;
    border: 1px solid #fabf3a;
    font-size: 16px;
    font-weight: 500;
    color: #fabf3a;
    background-color: transparent;
    cursor: pointer;
    
    /*&:hover {
      background-color: #fabf3a;
      color: #fff;
    }*/
  }
}



.bannerOuter {
  width: 100%;
  height: 676px;
  background-color: #f9fafb;
}

.homeBanner {
  width: 1200px;
  margin: 0 auto;

  .image {
    display: inline-block;
    margin-top: 100px;
    width: 538px;
    height: 454px;
    svg {
      width: 538px;
      height: 454px;
    }
  }

  .words {
    float: right;
    display: inline-block;
    margin-left: 24px;
    margin-top: 200px;
    transition: all 0.5s ease-in-out;
    transition-delay: 0.7s;
    transition-duration: 0.5s;
    
    &.left {
      float: left;
      margin-right: 24px;
    }
  }

  .name {
    margin-bottom: 24px;
    line-height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: #6d35c3;
  }

  .title {
    margin-bottom: 20px;
    line-height: 40px;
    font-size: 28px;
    font-weight: 500;
    color: #343945;

    > label {
      display: inline-block;
      padding-top: 8px;
      border-top: 2px solid #f6a132;
    }
  }

  .description {
    margin-bottom: 20px;
    width: 490px;
    line-height: 32px;
    font-size: 16px;
    color: #576075;
  }

  button {
    display: inline-block;
    padding: 0 16px;
    height: 44px;
    border-radius: 2px;
    border: 1px solid;
    text-align: center;
    cursor: pointer;
    color: #6d35c3;
    background-color: transparent;

    &:hover {
      background-color: #6d35c3;
      color: #fff;
    }
  }
}

.test {
  float: right ;
  width: 480px;
  height: 480px;
  background-image: radial-gradient(circle at 50% 0, #f7b236, rgba(252, 217, 102, 0));
  // background-image: radial-gradient(circle at 50% 50%, #f7b236, rgba(252, 217, 102, 0));
}

`
