import React, { Component } from "react"
import GatsbyLink from 'gatsby-link'
import get from 'lodash/get';
import {graphql} from 'gatsby';

import {ReactComponent as LogoGray} from 'assets/op-logo-gray.svg'
import {Banner, Nav} from 'components/Doc';
import Layout from 'layout';
import Wrapper from './wrapper';

const getChildLink = (item) => {
  let link = '';
  if (item.entry) {
    link = get(item, 'entry.childMarkdownRemark.fields.slug');
  } else if (item.chapters) {
    link = get(item, 'chapters[0].entry.childMarkdownRemark.fields.slug');
  } else if (item.entries) {
    link = get(item, 'entries[0].entry.childMarkdownRemark.fields.slug');
  }
  return link
}

export default class Docs extends Component {
  render() {
    const { menus } = this.props.data;

    return (
      <Layout>
        <Wrapper>
          <Banner/>
          <Nav/>
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
                to={`/v0.3/zh-CN/basic/`}
              >
                OpenPitrix Documentation
              </GatsbyLink>
              OpenPitrix © 2019
            </div>
          </footer>

        </Wrapper>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const queryAllDocs = graphql`
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
