import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Modal from '../Modal'

import styles from './index.module.scss'

export default class DownloadModal extends React.Component {
  state = {
    mail: '',
    mailError: '',
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,
  }

  onClose = () => {
    this.props.onClose && this.props.onClose()
  }

  onSubmit = () => {
    const { mail } = this.state
    const regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

    if (!mail || !regex.test(mail)) {
      this.setState({ mailError: '输入的邮箱名称为空或格式不正确' })
    } else {
      this.setState({ mailError: '' })
      this.props.onSubmit && this.props.onSubmit()
    }
  }

  clearError = () => {
    this.setState({ mailError: '' })
  }

  changeInput = e => {
    this.setState({ mail: e.target.value })
  }

  render() {
    const { isOpen } = this.props
    const { mail, mailError } = this.state

    return (
      <Modal isOpen={isOpen} onClose={this.onClose}>
        <div className={styles.downloadModal}>
          <div className={styles.content}>
            <div className={styles.title}>获取社区版</div>
            <div className={styles.description}>
              已经有超过 1000 名用户下载并使用了 OpenPitrix ，如有问题可通过
              <a href="#"> GitHub </a>
              或者 <a href="#">Slack</a> 与我们联系
            </div>
            <img
              className={classnames(styles.downloadBg, 'mobileShow')}
              src="/images/modal/downloadBg.svg"
            />
            <div className={styles.button}>
              <input
                placeholder="name@example.com"
                value={mail}
                onChange={this.changeInput}
                onFocus={this.clearError}
              />
              <button onClick={this.onSubmit}>
                <img src="/images/modal/download.svg" />
                下载
              </button>
            </div>
            <p className={styles.error}>{mailError}</p>
          </div>
          <img
            className={classnames(styles.downloadBg,'webShow')}
            src="/images/modal/downloadBg.svg"
          />
        </div>
      </Modal>
    )
  }
}
