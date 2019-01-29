import React from 'react'

import { Style } from './styled'

export default class DocBanner extends React.Component {
  render() {
    return (
      <Style>
        <h3 className='title'>欢迎使用 OpenPitrix 文档</h3>
        <div className='search'>
          <input placeholder='请输入关键字搜索'/>
        </div>
      </Style>
    )
  }
}
