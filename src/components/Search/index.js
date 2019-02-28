import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

import { ReactComponent as SearchIcon } from 'assets/search.svg'

class Search extends React.Component {
  static defaultProps = {
    placeholder: '请输入关键字进行搜索',
  }

  render() {
    const { className, placeholder } = this.props

    return (
      <SearchWrapper className={classnames('search', className)}>
        <SearchIcon />
        <input type="text" placeholder={placeholder} />
      </SearchWrapper>
    )
  }
}

const SearchWrapper = styled.div`
  position: relative;
  max-width: 460px;
  height: 36px;

  .algolia-autocomplete {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .algolia-autocomplete .ds-dropdown-menu {
    transform: translateY(6px);
  }

  input {
    width: 100%;
    height: 100%;
    padding: 7px 20px 7px 40px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.7;
    color: #fff;
    border-radius: 18px;
    border: solid 1px #eff0f5;
    transition: all 0.2s ease;

    &::placeholder {
      color: white;
      font-weight: normal;
    }

    &:focus {
      outline: none;
      // background-color: #fff;
    }
  }

  & > svg {
    position: absolute;
    top: 50%;
    left: 14px;
    width: 14px;
    height: 14px;
    transform: translateY(-50%);
  }
`

export default Search
