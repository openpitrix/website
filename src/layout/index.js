import React from 'react'
import Helmet from 'react-helmet';

import Header from 'components/Header'
import {StaticQuery, graphql} from 'gatsby';

import './index.css'

const Layout = ({ children, data }) => {
  const {title, keywords, description}=data.site.siteMetadata;

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      />
      <Header/>
      {children}
    </>
  )
}

export default props=> (
  <StaticQuery
    query={
      graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title,
        keywords,
        description
      }
    }
  }
`
    }
    render={data=> <Layout data={data} {...props} />}
  />
)