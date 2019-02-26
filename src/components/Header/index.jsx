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
    isDarkBg: false,
  }

  static propTypes = {
    hasBg: PropTypes.bool,
    isBlankBg: PropTypes.bool,
    maxTop: PropTypes.number,
  }

  static defaultProps = {
    hasBg: false,
    isBlankBg: false,
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

  render() {
    const { isBlankBg, hasBg } = this.props

    return (
      <div
        className={classnames(styles.header, {
          [styles.blankHeader]: isBlankBg,
          [styles.darkHeader]: this.state.isDarkBg || hasBg,
        })}
      >
        <div className={styles.wrapper}>
          <a className={styles.logo} href="/">
            <img src="/images/op-logo-blank.svg" />
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
        </div>
      </div>
    )
  }
}
