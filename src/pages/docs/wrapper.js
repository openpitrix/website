import React from 'react'
import styled from 'styled-components'

export default styled.div`
.body {
  min-height: calc(100vh - 324px);
}
.main-body {
  display: flex;
  color: #8454cd;
  flex-flow: row wrap;
  font-size: 16px;
  padding: 64px 20px;
  position: relative;
  left: 128px;
  width: 720px;
  margin-left: auto;
  margin-right: auto;
  
  a {
    display: block;
    color: #8454cd;
    & + a{
      margin-top: 16px;
    }
  }
  span {
    display: block;
    font-size: 12px;
    width: 80%;
    color: #78839e;
    margin: 11px 0 24px;
  }
  
  > div {
    width: 100%;
    margin-bottom: 64px;
  }
}

footer {
  margin: 24px 24px;
  .logo {
    width: 114px;
    height: 16px;
  }
  .l-right {
    float: right;
    color: #78839e;
    font-size: 12px;
    a {
      display: none;
      margin-right: 20px;
      color: #8454cd;
    }
  }
}
@media only screen and (min-width: 768px) {
  .main-body {
    // padding: 64px 24.0972222%;
    > div {
      width: 50%;
      margin-bottom: 64px;
    }
    span {
      width: 65%;
    }
  }
  footer {
    margin: 24px 184px;
    .l-right {
      a {
        display: inline-block;
      }
    }
  }
}
@media only screen and (min-width: 1280px) {
  .main-body {
    > div {
    width: 33.3%;
    margin-bottom: 64px;
    }
  }
}
`