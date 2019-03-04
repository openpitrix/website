import React from 'react'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

import { ReactComponent as Previous } from 'assets/previous.svg'
import { ReactComponent as Next } from 'assets/next.svg'

class Footer extends React.Component {
  render() {
    const { prev, next } = this.props

    return (
      <div>
        <Pagination>
          {!isEmpty(prev) && (
            <Link href={prev.href}>
              <Previous />
              <label>上一篇:</label> {prev.text}
            </Link>
          )}
          {!isEmpty(next) && (
            <Link href={next.href} right>
            <label>下一篇:</label> {next.text}
              <Next />
            </Link>
          )}
        </Pagination>
      </div>
    )
  }
}

const Pagination = styled.div`
  height: 53px;
  padding: 12px 0;
`

const Link = styled.a`
  float: ${({ right }) => (right ? 'right' : 'none')};
  line-height: 2;
  font-size: 14px;
  color: #474e5d;

  & > svg {
    width: 20px;
    height: 20px;
    margin: ${({ right }) => (right ? '0 0 0 12px' : '0 12px 0 0')};
    vertical-align: bottom;
  }

  &:hover {
    color: #8454cd;
  }

 @media only screen and (max-width: 768px) {
  font-size: 12px;
 }

 @media only screen and (max-width: 400px) {
  >label {
    display: none;
  }
 }
`

const FooterText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #5d6b79;
  text-align: center;
`

export default Footer
