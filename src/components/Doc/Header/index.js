import React from 'react'
import { Link } from 'gatsby'

import { getScrollTop } from 'utils'
import { ReactComponent as Logo } from 'assets/logo2.svg'
import { ReactComponent as IconGithub } from 'assets/github.svg'

import Wrapper from './wrapper'

const NavLink = ({ to, children }) => (
  <li>
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
  </li>
)

class Header extends React.Component {
  state = {
    isExpand: false,
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const classes = this.headerRef.classList
    const headerShadow = classes.contains('header-shadow')

    if (scrollTop >= 10 && !headerShadow) {
      classes.add('header-shadow')
    } else if (scrollTop < 10 && headerShadow) {
      classes.remove('header-shadow')
    }
  }

  handleExpand = () => {
    const { isExpand } = this.state
    this.setState({
      isExpand: !isExpand,
    })
  }

  render() {
    return (
      <Wrapper
        isExpand={this.props.isExpand}
        ref={ref => {
          this.headerRef = ref
        }}
      >
        <div className="expand" onClick={this.handleExpand}>
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>

        <div className="items">
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="nav-links">
            <NavLink to="/">首页</NavLink>
            <NavLink to="/install">安装</NavLink>
            <NavLink to="/docs">文档</NavLink>
            <NavLink to="#">博客</NavLink>
          </ul>
          <ul className="right-links">
            <NavLink to="#">Demo</NavLink>
            <li className="github-icon">
              <a
                href="https://github.com/openpitrix/openpitrix"
                target="_blank"
              >
                <IconGithub />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </Wrapper>
    )
  }
}

export default Header
