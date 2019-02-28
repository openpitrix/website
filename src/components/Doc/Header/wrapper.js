import React from 'react'
import styled from 'styled-components'

export default styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  // opacity: 0.92;
  background: white;
  transition: left 0.2s cubic-bezier(0.79, 0.33, 0.14, 0.53);
  z-index: 99;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 60px;
    left: ${({ isExpand }) => {
      return isExpand ? '280px' : 0
    }};

    .nav-links,
    .right-links {
      display: none !important;
    }
  }

  .items {
    height: 100%;
    padding: 26px 32px;
    font-family: PingFangSC san-serif;
    font-size: 14px;

    .logo {
      display: inline-block;
      float: left;

      a {
        display: inline-block;
      }

      @media only screen and (max-width: 768px) {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 30px;
        margin-left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .nav-links,
    .right-links {
      display: inline-block;
      float: left;
      margin-left: 80px;
      list-style-type: none;

      li {
        display: inline-block;
        margin-right: 48px;

        a {
          color: #a2a9be;
          &.active {
            color: #000;
            font-weight: 500;
            border-bottom: 2px solid #f6a132;
            padding-bottom: 8px;
          }
        }

        &.github-icon {
          svg {
            vertical-align: middle;
            margin-right: 4px;
          }
        }
      }
    }

    .right-links {
      float: right;
      a {
        color: #343945 !important;
      }
    }
  }

  .expand {
    display: none;

    @media only screen and (max-width: 768px) {
      display: inline-block;
      margin-top: 21px;
      margin-left: 31px;
      cursor: pointer;
    }

    .line {
      display: block;
      width: 20px;
      height: 3px;
      border-radius: 1.5px;
      background-color: #b6c2cd;

      & + .line {
        margin-top: 4px;
      }
    }
  }
`
