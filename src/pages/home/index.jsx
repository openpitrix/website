import React, { Component } from 'react';

import Header from '../../components/Header';

import { Style } from './styled';

export default class Home extends Component {
  render() {
    return (
      <Style>
        <Header />
      </Style>
    )
  }
}
