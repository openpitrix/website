import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { getScrollTop } from '../../utils'

import styles from './index.module.scss'

const headerLinks = [
  { name: '首页', link: '/', active: '/' },
  { name: '安装', link: '/install', active: '/install' },
  { name: '文档', link: '/document', active: '/document' },
  { name: '博客', link: '/blog', active: '/blog' },
]

export default class Header extends React.Component {
  state = {
    showMenus: false,
    isDarkBg: false,
  }

  static propTypes = {
    hasBg: PropTypes.bool,
    isBlankBg: PropTypes.bool,
    hasLightBg: PropTypes.bool,
    maxTop: PropTypes.number,
  }

  static defaultProps = {
    hasBg: false,
    isBlankBg: false,
    hasLightBg: false,
    maxTop: 0,
  }

  async componentDidMount() {
    const { maxTop } = this.props

    if (maxTop > 0) {
      window.onscroll = this.handleScroll
    }
  }

  handleScroll = () => {
    const { maxTop } = this.props
    const { isDarkBg } = this.state
    const scrollTop = getScrollTop()

    if (scrollTop >= maxTop && !isDarkBg) {
      this.setState({ isDarkBg: true })
    } else if (scrollTop < maxTop && isDarkBg) {
      this.setState({ isDarkBg: false })
    }
  }

  changeMeuns = () => {
    const showMenus = this.state.showMenus

    this.setState({ showMenus: !showMenus })
  }

  renderMenus() {
    return (
      <div className={styles.meuns}>
        <img
          onClick={this.changeMeuns}
          className={styles.close}
          src="/images/close.svg"
        />
        <ul>
          {headerLinks.map(item => (
            <li key={item.name}>
              <a
                onClick={this.changeMeuns}
                key={item.name}
                href={item.link}
                className={classnames({
                  [styles.active]: location.pathname === item.active,
                })}
              >
                {item.name}
              </a>
            </li>
          ))}

          <li className={styles.demo}>
            <a onClick={this.changeMeuns} href="#" target="_blank">
              Demo
            </a>
          </li>
          <li className={styles.github}>
            <a
              onClick={this.changeMeuns}
              href="https://github.com/openpitrix/openpitrix"
              target="_blank"
            >
              <label className={styles.githubIcon}>
                <img src="/images/github.svg" />
              </label>
              Github
            </a>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    const { isBlankBg, hasBg, hasLightBg } = this.props
    const { showMenus } = this.state
    const isDarkBg = !isBlankBg && (this.state.isDarkBg || hasBg)
    const logoSrc = isBlankBg ? '/images/op-logo.svg' : '/images/op-logo-blank.svg'

    return (
      <div
        className={classnames(styles.header, {
          [styles.blankHeader]: isBlankBg,
          [styles.darkHeader]: isDarkBg,
          [styles.lightHeader]: hasLightBg,
        })}
      >
        <div className={styles.wrapper}>
          <a className={styles.logo} href="/">
            {!isBlankBg && <label className={styles.border} />}
            <img src={logoSrc} />
          </a>

          <div className={styles.links}>
            {headerLinks.map(item => (
              <a
                key={item.name}
                href={item.link}
                className={classnames({
                  [styles.active]: location.pathname === item.active,
                })}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className={styles.otherLinks}>
            <a href="#">Demo</a>
            <a href="https://github.com/openpitrix/openpitrix" target="_blank">
              <label className={styles.github}>
                <img src="/images/github.svg" />
              </label>
              Github
            </a>
          </div>
          <img
            onClick={this.changeMeuns}
            className={styles.menuIcon}
            src="/images/menu.svg"
          />
        </div>

        {showMenus && this.renderMenus()}
      </div>
    )
  }
}
