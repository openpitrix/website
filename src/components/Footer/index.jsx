import React from 'react'

import { ReactComponent as LogoBlank } from '../../assets/op-logo-blank.svg'

import { Style } from './styled'

export default class Footer extends React.Component {
  render() {
    return (
      <Style>
        <div className="wrapper">
          <a className="logo" href="/">
            <LogoBlank/>
          </a>
          <label className="copyright">Openpitrix Technology © 2019</label>
        </div>
      </Style>
    )
  }
}
