import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Logo } from '../../assets/op-logo.svg';
import { ReactComponent as LogoBlank } from '../../assets/op-logo-blank.svg';

import { Style } from './styled';

const headerLinks = [
  { name: '首页', link: '/home', active: '/home' },
  { name: '安装', link: '/install', active: '/install' },
  { name: '文档', link: '/document', active: '/document' },
  { name: '博客', link: '/blog', active: '/blog' },
];

export default class Header extends React.Component {
  static propTypes = {
    isDarkBg: PropTypes.bool,
  }

  static defaultProps = {
    isDarkBg: false,
  }

  render() {
    const { isDarkBg } = this.props

    return (
      <Style isDarkBg>
        <div className={isDarkBg ? 'header-dark' : 'header'}>
          <div className="wrapper">
            <a href="/">
              {isDarkBg ? (
                <LogoBlank className="header-logo" />
              ) : (
                <Logo className="header-logo" />
              )}
            </a>

            <div className="links">
              {headerLinks.map(item => (
                <a
                  key={item.name}
                  href={item.link}
                  className={location.pathname === item.active ? 'active' : ''}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Style>
    )
  }
}
