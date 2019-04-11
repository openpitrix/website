import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ReactComponent as IconCheck } from 'assets/check.svg'

export default class Option extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    isSelected: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { children, isSelected, ...rest } = this.props

    return (
      <OptionWrap>
        <div className="option" {...rest}>
          {children}
          {isSelected && <IconCheck />}
        </div>
      </OptionWrap>
    )
  }
}

const OptionWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 8px 12px;
  height: 40px;
  color: #576075;
  cursor: pointer;
  word-break: break-all;
  overflow: hidden;
  &:hover {
    background-color: #eff0f5;
  }

  svg {
    position: absolute;
    right: 18px;
    width: 16px;
    height: 16px;
  }
`
