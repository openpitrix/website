import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Caret } from 'assets/arrow-black.svg'

export default class Select extends React.Component {
  // static propTypes = {
  //   children: PropTypes.any,
  //   className: PropTypes.string,
  //   defaultValue: PropTypes.string,
  //   name: PropTypes.string,
  //   onChange: PropTypes.func,
  //   value: PropTypes.string
  // };

  static defaultProps = {
    className: '',
    name: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      value: this.props.defaultValue,
    }

    this.childNodes = []
    this.currentLabel = ''

    this.handleControlClick = this.handleControlClick.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    const { onChange } = this.props

    if (value !== prevState.value) {
      if (typeof onChange === 'function') {
        onChange(this.state.value)
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  }

  handleOutsideClick(e) {
    if (this.wrapper && !this.wrapper.contains(e.target)) {
      this.setState({ isOpen: false })
    }
  }

  handleOptionClick(e) {
    const curVal = e.currentTarget.getAttribute('value')

    this.setState({
      isOpen: false,
      value: curVal,
    })
  }

  handleControlClick() {
    const { isOpen } = this.state
    const { disabled } = this.props

    document[isOpen ? 'removeEventListener' : 'addEventListener'](
      'click',
      this.handleOutsideClick
    )
    this.setState({ isOpen: !isOpen })
  }

  setChildNodes() {
    const { children } = this.props
    const value = this.props.value || this.state.value

    this.currentLabel = ''
    this.childNodes =
      React.Children.map(children, child => {
        const checked = String(value) === child.props.value

        if (checked) {
          this.currentLabel = child.props.children
        }

        return React.cloneElement(child, {
          ...child.props,
          onClick: this.handleOptionClick,
          isSelected: checked,
        })
      }) || []

    if (!this.currentLabel) {
      this.currentLabel = value
    }

    return this.childNodes
  }

  renderControl() {
    return (
      <div className="control" onClick={this.handleControlClick}>
        <div className="controlLabel">{this.currentLabel}</div>
        <Caret />
      </div>
    )
  }

  renderOptions() {
    const { isOpen } = this.state

    return this.childNodes.length > 0 ? (
      <Options isOpen={isOpen}>{this.childNodes}</Options>
    ) : null
  }

  render() {
    const { name } = this.props
    const { value } = this

    this.setChildNodes()

    return (
      <SelectWrap
        ref={ref => {
          this.wrapper = ref
        }}
      >
        <input name={name} defaultValue={value} type="hidden" />
        {this.renderControl()}
        {this.renderOptions()}
      </SelectWrap>
    )
  }
}

const SelectWrap = styled.div`
  display: inline-block;
  position: relative;
  width: 216px;
  text-align: left;
  i {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .control {
    position: relative;
    box-sizing: border-box;
    height: 40px;
    padding: 8px 12px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(73, 33, 173, 0.06),
      0 4px 8px 0 rgba(35, 35, 36, 0.04);
    border: solid 1px #d5dae5;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    word-break: break-all;
    overflow: hidden;
    & > svg {
      float: right;
      with: 16px;
      height: 16px;
    }

    .controlLabel {
      display: inline-block;
      line-height: 1.71;
      color: #343945;
      font-weight: 500;
    }
  }
`

const Options = styled.div`
  display: none;
  position: absolute;
  z-index: 11;
  width: 100%;
  // padding: 8px 12px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(73, 33, 173, 0.1),
    0 4px 8px 0 rgba(35, 35, 36, 0.08);
  border: solid 1px #d5dae5;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`
