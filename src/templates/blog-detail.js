import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'layout'
import Header from 'components/Header'

export default class BlogDetail extends React.Component{

  render() {
    const {post, site}=this.props.data
    const {frontmatter, html}=post
    const {title, description, author, date}=frontmatter

    return (
      <Layout>
        <Helmet>
          <title>{`${title} | ${site.siteMetadata.title}`}</title>
        </Helmet>

        <Header isBlankBg />

        <Article>
          <h1>{title}</h1>
          <p>{description}</p>

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Article>
      </Layout>
    )
  }
}

export const pageQuery=graphql`
  query BlogBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        author
        date
      }
      fields {
        language
      }
    }
  }
`

const Article = styled.div`
  position: relative;
  top: 72px;
  width: 80vw;
  margin: 0 auto;
  
`

