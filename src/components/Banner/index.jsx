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

export default class Banner extends React.Component {
  render() {

    return (
      <Style >
        <div className='banner'>
          <div className="wrapper">
            <a className="logo"  href="/">
              <LogoBlank />
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
