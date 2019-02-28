import React, { Component } from 'react'
import GatsbyLink from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'

import { Banner, Nav, Header } from 'components/Doc'
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
        <Header/>
        <Wrapper>
          <Banner />
          <Nav />

          <div className="body">
            <div className="main-body">
              {menus.edges[0].node.chapters.map(item => {
                const link = getChildLink(item)
                const children = item.chapters || item.entries

                return (
                  <div key={`${link} div`}>
                    <GatsbyLink key={`${link} link`} to={link}>
                      {item.title}
                    </GatsbyLink>
                    <span key={`${link} describe`}>{item.describe}</span>
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
                          <GatsbyLink key={childLink} to={childLink}>
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
    position: relative;
    left: 256px;
  }
  .main-body {
    display: flex;
    color: #8454cd;
    flex-flow: row wrap;
    font-size: 16px;
    padding-top: 64px;
    position: relative;
    width: 920px;
    margin-left: auto;
    margin-right: auto;

    a {
      display: block;
      color: #8454cd;
      & + a {
        margin-top: 16px;
      }
    }
    span {
      display: block;
      font-size: 12px;
      width: 80%;
      color: #78839e;
      margin: 11px 0 24px;
    }

    > div {
      width: 100%;
      margin-bottom: 64px;
    }
  }

  footer {
    margin: 16px auto;
    text-align: center;
  }

  @media only screen and (min-width: 768px) {
    .main-body {
      // padding: 64px 24.0972222%;
      > div {
        width: 50%;
        margin-bottom: 64px;
      }
      span {
        width: 65%;
      }
    }
    footer {
      margin-left: 256px;
    }
  }
  @media only screen and (max-width: 768px) {
    .main-body {
      width: auto;
    }
  }

  // @media only screen and (min-width: 1280px) {
  //   .main-body {
  //     > div {
  //     width: 33.3%;
  //     margin-bottom: 64px;
  //     }
  //   }
  // }
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
    menus: allDocsJson(filter: { id: { eq: "v0.3-zh-CN" } }) {
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
