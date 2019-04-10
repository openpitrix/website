import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'layout'
import Header from 'components/Header'

import {formatTime} from 'utils'

export default class Blogs extends React.Component {

  render() {
    const {site, blogs}=this.props.data

    return (
      <Layout>
        <Helmet>
          <title>{`Blog | ${site.siteMetadata.title}`}</title>
        </Helmet>

        <Header isBlankBg/>

        <ArticleList>
            {
              blogs.edges.map(({node})=> {
                const {excerpt, fields, frontmatter}=node
                const {slug}=fields
                const {title, description, author, date}=frontmatter

                return (
                  <article key={slug}>
                    <ArticleTitle><a href={slug}>{title}</a></ArticleTitle>
                    <ArticleCaption>By: <strong>{author}</strong> | {formatTime(date)}</ArticleCaption>
                    <ArticleDesc>{description || excerpt}</ArticleDesc>
                    <a href={slug}>[阅读全文..]</a>
                  </article>
                )
              })
            }
        </ArticleList>

      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    blogs: allMarkdownRemark(
      filter: {fields: {slug: {regex: "/^/blog//"}, language: {eq: "zh"}}}
      sort: {fields: [frontmatter___date, frontmatter___title], order: DESC}
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            description
            author
            date
          }
          fields {
            slug
            language
          }
        }
      }
    }
  }
  
`

const ArticleList=styled.div`
  position: relative;
  max-width: 1128px;
  margin: 0 auto;
  top: 72px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    margin: 0 32px;
  }
  
  > article {
    margin-top: 30px;
  }
`

const ArticleTitle=styled.h2`
    color: #6626AF;
    font-size: 28px;
    font-weight: 500;
    line-height: 40px;
    margin: 0 0 8px;
    
    >a, a:active {
      color: #6626AF;
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
const ArticleDesc=styled.p`
  margin-bottom: 20px;
`
