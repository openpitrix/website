import React from 'react'
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

        <Container>
          <Headings/>
          <Article>
            <ArticleMeta>
              <h1>{title}</h1>
              <p>{description}</p>
            </ArticleMeta>

            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Article>
        </Container>

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

const Container=styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1128px;
    top: 72px;
`
const Headings=styled.div`
  position: fixed;
  top: 100px;
  bottom: 66px;
  width: 260px;
`
const Article = styled.div`
    margin-left: 280px;
    width: 760px;
`
const ArticleMeta=styled.div`
  overflow: hidden;
  padding: 30px 0 0;
`

