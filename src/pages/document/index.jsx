import React, { Component } from 'react'
import GatsbyLink from 'gatsby-link'
import _, { get } from 'lodash'

import Header from '../../components/Header'
import DocBanner from '../../components/DocBanner'
import Footer from '../../components/Footer'

import { Style } from './styled'

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

class HomePage extends Component {
  renderCard(document) {
    const chapters = _.get(document, 'chapters', []);
    const link = getChildLink(document);

    return (
      <div className="card">
        <div className="title">
          <GatsbyLink to={link}>
            {document.title}
          </GatsbyLink>
        </div>
        <div className="describe">{document.describe}</div>
        {chapters.map(item => (
          <GatsbyLink className="tagLink" key={`${item.title} link`} to={getChildLink(item)}>
            {item.title}
          </GatsbyLink>
        ))}
      </div>
    )
  }

  render() {
    const { menus } = this.props.data
    const chapters = _.get(menus, 'edges[0].node.chapters', [])

    return (
      <div>
        <Header isDarkBg />

        <Style>
          <DocBanner />
          <div className="download"></div>
          <div className="documents">
            {chapters.map(item => (
              <div className="cardOuter" key={item.title}>
                <img className="icon" src={item.icon} />
                {this.renderCard(item)}
              </div>
            ))}
          </div>
          {/*<div className="community">
            <div className="inner">
              推荐您免费下载和使用最新的 OpenPitrix 社区版
              <a href="#">获取社区版</a>
            </div>
          </div>*/}
          <Footer />
        </Style>
      </div>
    )
  }
}

export default HomePage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query documentQuery {
    menus: allContentJson(filter: { id: { eq: "v0.3-zh-CN" } }) {
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
