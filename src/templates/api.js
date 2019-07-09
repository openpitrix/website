import React from 'react';
import styled from 'styled-components';

import Layout from 'layout';
import Header from 'components/Header';

export default class Api extends React.Component {
  render() {
    // inject style tags
    const {html, css}=this.props.pageContext;

    return (
      <Layout>
        <Header isBlankBg />
        <Content dangerouslySetInnerHTML={{__html: `${html}${css}`}} />
      </Layout>
    )
  }
}

const Content=styled.div`
  position: relative;
  top: 72px;
  background: #fff;
`
