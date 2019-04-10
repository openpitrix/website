import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'layout'
import Header from 'components/Header'

import {formatTime} from 'utils'

export default class Blogs extends React.Component {

  render() {
    const {edges} = this.props.data.blogs

    return (
      <Layout>
        <Header isBlankBg/>

        <ArticleList>
            {
              edges.map(({node})=> {
                const {excerpt, fields, frontmatter}=node
                const {slug}=fields
                const {title, description, author, date}=frontmatter

                return (
                  <article key={slug}>
                    <ArticleTitle><a href={slug}>{title}</a></ArticleTitle>
                    <ArticleCaption>By: {author} | {formatTime(date)}</ArticleCaption>
                    <ArticleDesc>{description || excerpt}</ArticleDesc>
                    <a href={slug}>详情...</a>
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
    blogs: allMarkdownRemark(filter: {fields: {slug: {regex: "/^/blog//"}, language: {eq: "zh-CN"}}}) {
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
    >a:active {
      color: #6626AF;
    }
`
const ArticleCaption=styled.p`
    color: #aaa;
    font-size: 14px;
    font-weight: normal;
    line-height: 18px;
`
const ArticleDesc=styled.p`
  margin-bottom: 20px;
`
