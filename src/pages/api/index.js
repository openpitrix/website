import React from 'react';
import styled from 'styled-components';
import { RedocStandalone } from 'redoc';

import Layout from 'layout';
import Header from 'components/Header';

import specJson from '../../../api.swagger.json';

export default class Api extends React.Component {
  render() {
    return (
      <Layout>
        <Header isBlankBg />

        <Content>
          <RedocStandalone
            options={{
              nativeScrollbars: true
            }}
            spec={specJson}
          />
        </Content>
      </Layout>
    )
  }
}


const Content=styled.div`
  position: relative;
  top: 80px;
`
