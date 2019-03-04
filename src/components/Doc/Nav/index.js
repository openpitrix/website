import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Search from 'components/Search'
import Versions from 'components/Versions'
import TableOfContents from 'components/TableOfContents'

export default class DocNav extends React.Component {
  static propTypes = {
    isExpand: PropTypes.bool,
  }

  static defaultProps = {
    isExpand: false,
  }

  render() {
    const { isExpand } = this.props;

    return (
      <Nav isExpand={isExpand}>
        <StyledSearch className="search" placeholder="请输入搜索内容" />
        <Versions />
        <TableOfContents />
      </Nav>
    )
  }
}

const Nav = styled.div`
  width: 256px;
  height: calc(100vh);
  position: fixed;
  top: 72px;
  padding: 24px 20px;
  left: 0;
  box-shadow: inset -1px 0 0 0 #eff0f5;
  background-color: #f9fafb;
  transition: all 0.2s ease-in-out;
  overflow: auto;

  @media only screen and (max-width: 768px) {
    left: ${({ isExpand }) => {
      return isExpand ? 0 : '-290px'
    }};
    top: 56px;
  }
`

const StyledSearch = styled(Search)`
  &.search {
    width: 216px;
    height: 32px;
    margin: 0 auto 20px;
    border-radius: 16px;

    input {
      background-color: #fff;
      border-radius: 16px;
      font-size: 14px;
      font-weight: normal;
      color: #576075;

      &:hover {
        border: solid 1px #8454cd;
      }

      &::placeholder {
        opacity: 0.5;
        font-family: PingFangSC san-serif;
        font-size: 12px;
        color: #78839e;
      }
    }
  }
`
