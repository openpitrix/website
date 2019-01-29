import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Header from '../components/Header'
import Versions from '../components/Versions'
import DocFooter from '../components/DocFooter'
import Headings from '../components/Headings'
import TableOfContents from '../components/TableOfContents/index'

import { ReactComponent as Logo } from '../assets/op-logo.svg'
import last from 'lodash/last';

import './markdown.css'
import './b16-tomorrow-dark.css'

export default class MarkdownTemplate extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
  }

  state = {
    isExpand: false,
    prev: {},
    next: {},
  }

  componentDidMount() {
    // if (typeof docsearch === 'function') {
    //   docsearch({
    //     apiKey: '221332a85783d16a5b930969fe4a934a',
    //     indexName: 'openpitrix',
    //     inputSelector: '.ks-search > input',
    //     debug: false,
    //   })
    // }
    this.checkLocalHref();
    document.addEventListener('click', this.handleClick)

    if (this.markdownRef && !this.scroll && typeof SmoothScroll !== 'undefined') {
      this.scroll = new SmoothScroll('a[href*="#"]', {
        offset: 100,
      })
    }

    this.scrollToHash()
    this.getPrevAndNext()
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  scrollToHash = () => {
    setTimeout(() => {
      if (this.props.location.hash) {
        const id = decodeURIComponent(this.props.location.hash).slice(1)
        const element = document.getElementById(id)
        element && element.scrollIntoView()
      }
    }, 100)
  }

  checkLocalHref() {
    let { href } = location
    if (last(href) !== '/') {
      if (href.includes('#') && !href.includes('/#')) {
        href = href.split('#').join('/#');
      }
      location.replace(`${href}/`)
    }
  }

  getChildContext() {
    return {
      location: this.props.location,
    }
  }

  handleExpand = () => {
    this.setState(({ isExpand }) => ({
      isExpand: !isExpand,
    }))
  }

  isCurrentLink = link => {
    let ret = false

    if (link.classList) {
      ret = link.classList.contains('selected-link')
    } else {
      ret = new RegExp('(^| )selected-link( |$)', 'gi').test(link.className)
    }

    return ret
  }

  getPrevAndNext = () => {
    const prevOrNext = (links, currentIndex, isPrev) => {
      if (isPrev && currentIndex === 0) {
        return null;
      }
      if (!isPrev && currentIndex === links.length - 1) {
        return null;
      }

      const index = isPrev ? currentIndex - 1 : currentIndex + 1;
      const link = links[index];
      if (link.querySelectorAll('svg').length > 0) {
        return link;
      }

      return isPrev ?
             prevOrNext(links, currentIndex - 1, isPrev) :
             prevOrNext(links, currentIndex + 1, isPrev);

    }
    if (this.tocRef) {
      const linkDoms = this.tocRef.querySelectorAll('a[href]')
      const prev = {}
      const next = {}

      linkDoms.forEach((link, index) => {
        if (this.isCurrentLink(link)) {
          const prevLink = prevOrNext(linkDoms, index, true);
          if (prevLink) {
            prev.text = prevLink.text
            prev.href = prevLink.pathname
          }

          const nextLink = prevOrNext(linkDoms, index, false);
          if (linkDoms[index + 1]) {
            next.text = nextLink.text
            next.href = nextLink.pathname
          }

          this.setState({ prev, next })
          return
        }
      })
    }
  }

  handleClick = e => {
    if (this.markdownRef && this.markdownRef.contains(e.target)) {
      this.setState({ isExpand: false })
    }
  }

  handleHeadClick = head => {
    this.scroll.animateScroll(document.querySelector(head), null, {
      offset: 100,
    })
  }

  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug

    const post = postNode.frontmatter

    if (!post.id) {
      post.id = slug
    }

    const {
      prev,
      next,
    } = this.state

    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${
            this.props.data.site.siteMetadata.title
          }`}</title>
        </Helmet>
        <BodyGrid>
          <NavContainer isExpand={this.state.isExpand}>
            <Versions
              versions={this.props.data.versions}
              current={postNode.fields.version}
            />
            <ToCContainer
              innerRef={ref => {
                  this.tocRef = ref
              }}
            >
              <TableOfContents
                chapters={
                  this.props.data.tableOfContents.edges[0].node.chapters
                }
              />
            </ToCContainer>
            <footer className="op-footer">
              <Logo className="logo"/>
              <div className="copy">
                Openpitrix Technology © 2018
              </div>
            </footer>
          </NavContainer>
          <MainContainer isExpand={this.state.isExpand}>
            <MarkdownWrapper>
              <Header
                location={this.props.location}
                isExpand={this.state.isExpand}
                toggleExpand={this.handleExpand}
              />
              <MarkdownBody
                className="md-body"
                innerRef={ref => {
                  this.markdownRef = ref
                }}
              >
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
              </MarkdownBody>
              <FooterWrapper>
                <DocFooter prev={prev} next={next} />
              </FooterWrapper>
            </MarkdownWrapper>
            <HeadingsWrapper>
              <Headings
                title={postNode.frontmatter.title}
                headings={postNode.headings}
                current={this.props.location.hash}
                onHeadClick={this.handleHeadClick}
              />
            </HeadingsWrapper>
          </MainContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  overflow-x: hidden;
`

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-image: linear-gradient(0deg, #8454CD 0%, #854FB9 32%, #484999 100%);
  box-shadow: 4px 0 8px 0 rgba(101, 125, 149, 0.2);
  transition: left 0.2s ease-in-out;
  overflow-y: auto;
  color: #fff;
  z-index: 2;

  @media only screen and (max-width: 768px) {
  left: ${({ isExpand }) => {
  return isExpand ? 0 : '-290px'
  }};
  }
`

const MainContainer = styled.div`
  margin-left: 280px;

  & > div {
  margin: auto;
  }

  & > h1 {
  color: #303e5a;
  }

  @media only screen and (max-width: 768px) {
  width: 100vw;
  margin-left: ${({ isExpand }) => {
  return isExpand ? '280px' : '0'
  }};
  transition: margin-left 0.2s ease-in-out;
  }
`

const ToCContainer = styled.div`
  padding: 10px 0;
  min-height: calc(100vh - 220px);
`


const MarkdownBody = styled.div`
  padding: 120px 40px;
`

const MarkdownWrapper = styled.div`
  padding-right: 280px;

  @media only screen and (max-width: 1280px) {
  padding-right: 0;
  }
`

const HeadingsWrapper = styled.div`
  position: fixed;
  top: 120px;
  right: 20px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  box-shadow: -1px 0 0 0 #d5dee7;

  @media only screen and (max-width: 1280px) {
  display: none;
  }
`

const FooterWrapper = styled.div`
  max-width: 1217px;
  padding: 0 30px;
  margin: 0 auto;
`

/* eslint no-undef: "off" */
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
  query MarkdownBySlug($slug: String!, $id: String!, $version: String!) {
    site {
      siteMetadata {
        title
      }
    }
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
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
    versions: allMarkdownRemark {
      group(field: fields___version) {
        fieldValue
      }
    }
    languages: allMarkdownRemark(
      filter: { fields: { version: { eq: $version } } }
    ) {
      group(field: fields___language) {
        fieldValue
      }
    }
    tableOfContents: allContentJson(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
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
