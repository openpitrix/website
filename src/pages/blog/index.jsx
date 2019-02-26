import React, { Component } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { Style } from './styled'

export default class Blog extends Component {


  render() {
    const { blogs, menus } = this.props.data

    return (
      <Style>
        <Header hasBg />
        <Footer />
      </Style>
    )
  }
}

export const pageQuery = graphql`
  query queryBlogs {
    blogs: markdownRemark(
      fields: { slug: { eq: "/blog/zh-CN/openpitrix-insight/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
    menus: allContentJson(filter: { id: { eq: "blog-zh-CN" } }) {
      edges {
        node {
          id
          chapters {
            title
            chapters {
              title
              entries {
                entry {
                  id
                  childMarkdownRemark {
                    ...ChildMarkdownRemark
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
