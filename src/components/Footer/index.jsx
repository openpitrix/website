import React from 'react';

import { ReactComponent as LogoBlank } from '../../assets/op-logo-blank.svg';
import links from './links';

import { Style } from './styled';

export default class Footer extends React.Component {
  renderLinks() {
    return (
      <div className="links">
        {links.map(link => (
          <div className="module" key={link.title}>
            <div className="title">{link.title}</div>
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
      <Style>
        {this.renderLinks()}
        <div className="wrapper">
          <a className="logo" href="/">
            <LogoBlank />
          </a>
          <label className="copyright">Openpitrix Technology © 2019</label>
        </div>
      </Style>
    )
  }
}
