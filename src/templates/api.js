import React from 'react';
import styled from 'styled-components';

import Layout from 'layout';
import Header from 'components/Header';
import Helmet from 'react-helmet';

export default class Api extends React.Component {
  componentDidMount() {
    const {state}=this.props.pageContext;
    // window.__redoc_state = JSON.stringify(state);

    this.tmCheckRedoc=setInterval(()=> {
      if(typeof Redoc !== 'undefined' && typeof Redoc.hydrate === 'function'){
        Redoc.hydrate(state, document.getElementById('redoc'));
        clearInterval(this.tmCheckRedoc);
      }
    }, 50);
  }

  render() {
    const {html, css}=this.props.pageContext;

    return (
      <Layout>
        <Helmet>
          <style>
            {
              `
              .redoc-json {
                text-align: left !important;
              }
              `
            }
          </style>
        </Helmet>

        <Header isBlankBg />
        <Content id="redoc" dangerouslySetInnerHTML={{__html: css + html }} />
      </Layout>
    )
  }
}

const Content=styled.div`
  position: relative;
  top: 72px;
  background: #fff;
`
