import React from 'react';

import links from './links.js';

import styles from './index.module.scss'

export default class Footer extends React.Component {
  renderLinks() {
    return (
      <div className={styles.links}>
        {links.map(link => (
          <div className={styles.module} key={link.title}>
            <div className={styles.title}>{link.title}</div>
            <ul>
              {link.items.map(item => (
                <li key={item.name}>
                  <a href={item.link} target="_blank">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.footer}>
        {this.renderLinks()}
        <div className={styles.wrapper}>
          <a className={styles.logo} href="/">
            <img src="/images/op-logo-blank.svg" />
          </a>
          <label className={styles.copyright}>Openpitrix Technology © 2019</label>
        </div>
      </div>
    )
  }
}
