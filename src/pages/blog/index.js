import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'layout'
import Header from 'components/Header'

export default class Blogs extends React.Component {

  render() {
    const {edges} = this.props.data.blogs

    return (
      <Layout>
        <Header isBlankBg/>

        <ArticleList>
            {
              edges.map(({node})=> {
                const {excerpt, fields}=node
                const {slug}=fields

                return (
                  <div key={slug}>
                    <p>
                      {excerpt}
                    </p>
                    <span>
                      <a href={slug}>详情...</a>
                    </span>
                  </div>
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
    blogs: allMarkdownRemark(filter: {fields: {slug: {regex: "/^/blog//"}}}) {
      edges {
        node {
          excerpt
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
  top: 72px;
  
  > div {
    margin: 0 auto;
    width: 80vw;
    margin-top: 30px;
    > p {
      // border: 1px solid #aaa;
      margin-bottom: 20px;
    }
  }
`
