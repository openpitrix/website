import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { DiscussionEmbed } from "disqus-react"
import get from 'lodash/get'
import find from 'lodash/find'

import Layout from 'layout'
import Header from 'components/Header'
import ChapterList from 'components/TableOfContents/chapter'

import { formatTime } from 'utils'

import './markdown.css'

export default class BlogDetail extends React.Component {

  getTocFromPosts() {
    const { edges } = this.props.data.allPosts

    return edges.reduce((res, { node }) => {
      const { title, date } = node.frontmatter
      const { slug } = node.fields
      const [year, month] = formatTime(date, 'YYYY/MM').split('/')

      if (!find(res, { title: year })) {
        res.push({ title: year, chapters: [] })
      }

      const yearChapters = get(find(res, { title: year }), 'chapters')
      if (!find(yearChapters, { title: month })) {
        yearChapters.push({ title: month, chapters: [] })
      }

      const monthChapters = get(find(yearChapters, { title: month }), 'chapters')
      if (!find(monthChapters, { title })) {
        monthChapters.push({
          title, slug, entry: {
            fields: {
              slug,
            },
          },
        })
      }

      return res

    }, [])
  }

  render() {
    const { post, site } = this.props.data
    const { frontmatter, html } = post
    const { title, author, date } = frontmatter
    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: {
        identifier: frontmatter.title + frontmatter.date,
        title: frontmatter.title
      },
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${title} | ${site.siteMetadata.title}`}</title>
        </Helmet>

        <Header isBlankBg/>

        <Container>
          <ArchiveList>
            <h3>Blog Archive</h3>
            {
              this.getTocFromPosts().map((chapter, idx) => {

                return (
                  <ChapterList {...chapter} key={idx}/>
                )
              })
            }
          </ArchiveList>

          <Article>
            <ArticleMeta>
              <h1>{title}</h1>
              <ArticleCaption>By: <strong>{author}</strong> | {formatTime(date)}</ArticleCaption>
            </ArticleMeta>

            <div className="md-body" dangerouslySetInnerHTML={{ __html: html }}/>
            <DiscussionEmbed {...disqusConfig} />
          </Article>
        </Container>

      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allPosts: allMarkdownRemark(
      filter: {fields: {slug: {regex: "/^/blog//"}, language: {eq: "zh"}}}
      sort: {fields: [frontmatter___date, frontmatter___title], order: DESC}
    ) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
            language
          }
        }
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

const Container = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1128px;
    top: 72px;
`
const ArchiveList = styled.div`
  position: fixed;
  top: 100px;
  bottom: 66px;
  width: 260px;
  
  > h3 {
    color: #6626AF;
    font-size: 16px;
    line-height: 18px;
  }
  
  @media (max-width: 1128px){
    display: none;
  }
`
const Article = styled.div`
    margin-left: 280px;
    width: 760px;
    
    @media (max-width: 1128px){
      margin: 0 auto;
      width: 90vw;
    }
`
const ArticleMeta = styled.div`
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
const ArticleCaption = styled.p`
    color: #300E56;
    font-size: 14px;
    font-weight: normal;
    line-height: 18px;
    > strong {
      font-weight: 400;
      color: #F4971C;
    }
`

