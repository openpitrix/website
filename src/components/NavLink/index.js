import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const NavLink = ({ to, children }) => (
  <StyledLink>
    <Link
      to={to}
      getProps={({ isPartiallyCurrent, location }) => {
        if (to === '/') {
          return location.pathname === to ? { className: 'active' } : null
        }
        return isPartiallyCurrent ? { className: 'active' } : null
      }}
    >
      {children}
    </Link>
  </StyledLink>

)

export default NavLink

const StyledLink = styled.span`
  display: inline-block;
        
  a {
    color: #a2a9be;
    &.active {
      color: #000;
      font-weight: 500;
      border-bottom: 2px solid #f6a132;
      padding-bottom: 8px;
    }
  }
`