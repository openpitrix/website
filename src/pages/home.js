import React, { Component } from "react"
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'
import { ReactComponent as Logo } from '../assets/op-logo.svg'
import { ReactComponent as LogoGray } from '../assets/op-logo-gray.svg'
import get from 'lodash/get';

const getChildLink = (item) => {
  let link = '';
  if (item.entry) {
    link = get(item, 'entry.childMarkdownRemark.fields.slug');;
  } else if (item.chapters) {
    link = get(item, 'chapters[0].entry.childMarkdownRemark.fields.slug');
  } else if (item.entries) {
    link = get(item, 'entries[0].entry.childMarkdownRemark.fields.slug');
  }
  return link
}

class HomePage extends Component {
  render() {
    const { menus } = this.props.data;
    return (
      <HomeWrapper>
        <header className="header">
          <div>
            <Logo className="logo"/>
            <span className="text">文档中心</span>
          </div>
        </header>
        <div className="body">
          <div className="main-body">
            {
              menus.edges[0].node.chapters.map((item, index) => {
                const { entry, chapters } = item;
                const link = getChildLink(item);
                const children = item.chapters || item.entries;

                return (
                  <div key={`${link} div`}>
                    <GatsbyLink key={`${link} link`} to={link}>{item.title}</GatsbyLink>
                    <span  key={`${link} describe`}>{item.describe}</span>
                    {
                      children && children.map((child) => {
                        let childLink = getChildLink(child);
                        let childMarkdownRemark = null;
                        let { title } = child;
                        if (!title) {
                          title = get(child, 'entry.childMarkdownRemark.frontmatter.title');
                        }
                        if (!title) {
                          title = get(child, 'entries[0].entry.childMarkdownRemark.childMarkdownRemark.frontmatter.title');
                        }
                        return (
                          <GatsbyLink key={childLink} to={childLink}>{title}</GatsbyLink>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <footer>
          <LogoGray className="logo"/>
          <div className="l-right">
            <GatsbyLink
              to={`/v0.3/zh-CN/basic/#应用场景`}
            >
              Abount
            </GatsbyLink>
            OpenPitrix © 2018
          </div>
        </footer>
      </HomeWrapper>
    );
  }
}

const HomeWrapper = styled.div`
.header {
  background: url(/home-header.png) no-repeat center center;
  background-size: cover;
  height: 220px;
  padding: 24px;
  color: white;
  font-size: 16px;
  .logo {
    width: 114px;
    height: 16px;
    border-right: 1px solid #f7b236
    padding-right: 14px;
    margin-right: 14px;
  }
  .text {
    position: absolute;
    margin-top: -3px;
  }
}
.body {
  min-height: calc(100vh - 324px);
}
.main-body {
  display: flex;
  color: #8454cd;
  width: 100%;
  flex-flow: row wrap;
  font-size: 16px;
  padding: 64px 347px;
  a {
    display: block;
    color: #8454cd;
  }
  a + a {
  margin-top: 16px;
  }
  span {
  display: block;
  font-size: 12px;
  width: 170px;
  color: #78839e;
  margin: 11px 0 24px;
  }
  > div {
  width: 33.3%;
  margin-bottom: 64px;
  }
}
footer {
  margin: 24px 184px;
  .logo {
    width: 114px;
    height: 16px;
  }
  .l-right {
    float: right;
    color: #78839e;
    font-size: 12px;
    a {
      margin-right: 20px;
      color: #8454cd;
    }
  }
}
`

export default HomePage

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query homeQuery {
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
`;
