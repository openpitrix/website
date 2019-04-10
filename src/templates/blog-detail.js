import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'layout'
import Header from 'components/Header'

import {formatTime} from 'utils'

import './markdown.css'

export default class BlogDetail extends React.Component{

  render() {
    const {post, site}=this.props.data
    const {frontmatter, html}=post
    const {title, author, date}=frontmatter

    return (
      <Layout>
        <Helmet>
          <title>{`${title} | ${site.siteMetadata.title}`}</title>
        </Helmet>

        <Header isBlankBg />

        <Container>
          <ArchiveList>
            Archive list
          </ArchiveList>

          <Article>
            <ArticleMeta>
              <h1>{title}</h1>
              <ArticleCaption>By: <strong>{author}</strong> | {formatTime(date)}</ArticleCaption>
            </ArticleMeta>

            <div className="md-body" dangerouslySetInnerHTML={{ __html: html }} />
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
const ArchiveList=styled.div`
  position: fixed;
  top: 100px;
  bottom: 66px;
  width: 260px;
  border: 1px dashed #ccc;
`
const Article = styled.div`
    margin-left: 280px;
    width: 760px;
`
const ArticleMeta=styled.div`
  overflow: hidden;
  padding: 30px 0 0;
  > h1 {
    color: #6626AF;
    font-size: 28px;
    font-weight: 500;
    line-height: 40px;
    margin: 0 0 8px;
  }
`
const ArticleCaption=styled.p`
    color: #300E56;
    font-size: 14px;
    font-weight: normal;
    line-height: 18px;
    > strong {
      font-weight: 400;
      color: #F4971C;
    }
`

