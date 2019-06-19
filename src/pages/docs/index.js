import React, { Component } from 'react'
import GatsbyLink from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'
import {graphql} from 'gatsby'

import { Banner, Nav } from 'components/Doc'
import Header from 'components/Header'
import Layout from 'layout'

const getChildLink = item => {
  let link = ''
  if (item.entry) {
    link = get(item, 'entry.childMarkdownRemark.fields.slug')
  } else if (item.chapters) {
    link = get(item, 'chapters[0].entry.childMarkdownRemark.fields.slug')
  } else if (item.entries) {
    link = get(item, 'entries[0].entry.childMarkdownRemark.fields.slug')
  }
  return link
}

export default class Docs extends Component {
  render() {
    const { menus } = this.props.data

    return (
      <Layout>
        <Header isBlankBg />
        <Wrapper>
          <Banner />
          <Nav />

          <div className="body">
            <div className="main-body">
              {menus.edges[0].node.chapters.map(item => {
                const link = getChildLink(item)
                const children = item.chapters || item.entries

                return (
                  <div className="block" key={`${link} div`}>
                    <GatsbyLink
                      className="title"
                      key={`${link} link`}
                      to={link}
                    >
                      {item.title}
                    </GatsbyLink>
                    <div
                      className="description"
                      key={`${link} describe`}
                    >
                      {item.describe}
                    </div>
                    {children &&
                      children.map(child => {
                        let childLink = getChildLink(child)
                        let { title } = child
                        if (!title) {
                          title = get(
                            child,
                            'entry.childMarkdownRemark.frontmatter.title'
                          )
                        }
                        if (!title) {
                          title = get(
                            child,
                            'entries[0].entry.childMarkdownRemark.childMarkdownRemark.frontmatter.title'
                          )
                        }
                        return (
                          <GatsbyLink
                            key={childLink}
                            to={childLink}
                          >
                            {title}
                          </GatsbyLink>
                        )
                      })}
                  </div>
                )
              })}
            </div>
          </div>

          <footer>Openpitrix Technology © 2019</footer>
        </Wrapper>
      </Layout>
    )
  }
}

const Wrapper = styled.div`
  .body {
    min-height: calc(100vh - 324px);
    max-width: calc(100vw - 256px);
    margin-left: 256px;
    padding-top: 64px;
    background: #fff;
  }

  .main-body {
    display: flex;
    color: #8454cd;
    flex-flow: row wrap;
    font-size: 16px;
    position: relative;
    padding: 64px 24px 0;
    max-width: 920px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    .block {
      margin-bottom: 40px;
      width: 50%;
    }

    .title {
      margin-bottom: 16px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 500;
      color: #343945;
    }

    .description {
      margin-bottom: 8px;
      line-height: 20px;
      font-size: 12px;
      width: calc(100% - 24px);
      color: #78839e;
    }

    a {
      display: block;
      color: #6d35c3;
      line-height: 28px;
      font-size: 14px;
    }
  }

  footer {
    padding-top: 100px;
    margin-left: 256px;
    line-height: 48px;
    text-align: center;
    font-size: 14px;
    color: #8c96ad;
    background: #fff;
  }

  @media only screen and (max-width: 768px) {
    .body {
      margin-left: 16px;
      max-width: calc(100vw - 32px);
    }

    .main-body {
      .block {
        width: 100%;
      }
    }

    footer {
      padding-top: 0;
      margin-left: 0;
    }
  }
`

export const pageQuery = graphql`
  fragment ChildMarkdownRemark on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
    }
    headings {
      value
      depth
    }
  }

  query {
    menus: allDocsJson(filter: { id: { eq: "v0.4-zh-CN" } }) {
      edges {
        node {
          id
          chapters {
            title
            describe
            entry {
              id
              childMarkdownRemark {
                ...ChildMarkdownRemark
              }
            }
            entries {
              entry {
                id
                childMarkdownRemark {
                  ...ChildMarkdownRemark
                }
              }
            }
            chapters {
              title
              entry {
                id
                childMarkdownRemark {
                  ...ChildMarkdownRemark
                }
              }
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
