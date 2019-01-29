import styled from 'styled-components'

export const Style = styled.div`
.banner {
  /*  position: fixed;
    top: 0;
    left:0;
    z-index: 2;*/
  width: 100%;
  height: 428px;
  background-image: radial-gradient(circle at 51% 150%, #f6a132, #724eae 30%, #343945);

  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .logo {
    float: left;
    display: block;
    margin-top: 26px;
    width: 149px;
    height: 20px;
    svg {
      height: 20px;
      width: 100%
    }
  }

  .links {
    float: left;
    margin-top: 26px;
    margin-left: 56px;

    a {
      display: inline-block;
      margin: 0 24px;
      padding-bottom: 8px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #a2a9be;
      border-bottom: 2px solid transparent;
    }

    a:hover, a.active {
      color: #fff;
    }

    a.active {
      border-color: #f6a132;
    }
  }
}
`
