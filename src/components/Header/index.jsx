import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as LogoBlank } from '../../assets/op-logo-blank.svg';
import { ReactComponent as Github } from '../../assets/github.svg';
import { getScrollTop } from '../../utils';

import { Style } from './styled';

const headerLinks = [
  { name: '首页', link: '/home', active: '/home' },
  { name: '安装', link: '/install', active: '/install' },
  { name: '文档', link: '/document', active: '/document' },
  { name: '博客', link: '/blog', active: '/blog' },
];

export default class Header extends React.Component {
  state = {
    isDarkBg: false,
  }

  static propTypes = {
    isBlankBg: PropTypes.bool,
    maxTop: PropTypes.number
  }

  static defaultProps = {
    isBlankBg: false,
    maxTop: 0
  }

  async componentDidMount() {
    const { maxTop } = this.props;

    if(maxTop > 0) {
      window.onscroll = this.handleScroll;
    }

  }

  handleScroll = () => {
    const { maxTop } = this.props;
    const { isDarkBg } = this.state;
    const scrollTop = getScrollTop();

    if (scrollTop >= maxTop && !isDarkBg) {
      this.setState({ isDarkBg: true });
    } else if (scrollTop < maxTop && isDarkBg) {
      this.setState({ isDarkBg: false });
    }
  }

  render() {
    const blankBg = this.props.isBlankBg ? 'blankHeader' : '';
    const darkBg = this.state.isDarkBg ? 'darkHeader' : '';

    return (
      <Style>
        <div className={`header ${blankBg} ${darkBg}`}>
          <div className="wrapper">
            <a className="logo" href="/">
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

            <div className="otherLinks">
              <a href="#">Demo</a>
              <a href="https://github.com/openpitrix/openpitrix" target="_blank">
                <Github className="github"/> Github
              </a>
            </div>
          </div>
        </div>
      </Style>
    )
  }
}
