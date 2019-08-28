import React, {Fragment} from 'react';
import styled from 'styled-components';

import Layout from 'layout';
import Header from 'components/Header';
import Helmet from 'react-helmet';

export default class Api extends React.Component {
  constructor(props){
    super(props);
    this.state={
      redocLoaded: false
    }
  }

  componentDidMount() {
    this.tmCheckRedoc=setInterval(function(){
      if(typeof Redoc !== 'undefined' && typeof Redoc.hydrate === 'function'){
        clearInterval(this.tmCheckRedoc);
        this.tmCheckRedoc=null;

        this.setState({redocLoaded: true})
      }
    }.bind(this), 50);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.redocLoaded && this.state.redocLoaded){
      Redoc.hydrate(this.props.pageContext.state, document.getElementById('redoc'));
    }
  }

  renderLoading(){
    return (
      <Loading>Loading..</Loading>
    )
  }

  renderContent(){
    const {html, css}=this.props.pageContext;
    const cssParts = css.match(/<style\s+([^>]+)>([^<]+)<\/style>/);
    let cssBody;
    if(cssParts && cssParts.length){
      cssBody = cssParts[2]
    }

    return (
      <Fragment>
        <Helmet>
          <style>
            {
              `
              ${typeof cssBody === 'string' && cssBody}
              
              .redoc-json {
                text-align: left !important;
              }
              `
            }
          </style>
        </Helmet>
        <Content id="redoc" dangerouslySetInnerHTML={{ __html: html }}/>
      </Fragment>
    )
  }

  render() {
    const {redocLoaded}=this.state;

    return (
      <Layout>
        <Header isBlankBg />
        {!redocLoaded ? this.renderLoading() : this.renderContent()}
      </Layout>
    )
  }
}

const Content = styled.div`
  position: relative;
  top: 72px;
  background: #fff;
`

const Loading = styled.div`
  text-align: center;
  position: relative;
  top: 300px;
  color: black;
  font-size: 1.2rem;
`;