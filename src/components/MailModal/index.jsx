import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

import styles from './index.module.scss'

export default class MailModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    isMobile: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,
    isMobile: false,
  }

  onClose = () => {
    this.props.onClose && this.props.onClose();
  }

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit();
  }

  render() {
    const { isOpen, isMobile } = this.props

    return (
      <Modal isOpen={isOpen} onClose={this.onClose}>
        <div className={styles.mailModal}>
          <div className={styles.content}>
            <div className={styles.title}>邮件已发送，请注意查收。</div>
            <div className={styles.description}>
              已经有超过 1000 名用户下载并使用了 OpenPitrix ，如有问题可通过
              <a href="#"> GitHub </a>
              或者 <a href="#">Slack</a> 与我们联系
            </div>
            {isMobile && (
              <img className={styles.mailBg} src="/images/modal/mailBg.svg" />
            )}
            <a href="/document">
              <button onClick={this.onSubmit}>
                <img src="/images/modal/view.svg" />
                查看文档
              </button>
            </a>
          </div>
          {!isMobile && (
            <img className={styles.mailBg} src="/images/modal/mailBg.svg" />
          )}
        </div>
      </Modal>
    )
  }
}
