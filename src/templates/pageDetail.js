import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'layout'
import { Nav as DocNav, Header, Footer } from 'components/Doc'
import Headings from 'components/Headings'

import last from 'lodash/last'

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
    this.checkLocalHref()
    document.addEventListener('click', this.handleClick)

    if (
      this.markdownRef &&
      !this.scroll &&
      typeof SmoothScroll !== 'undefined'
    ) {
      this.scroll = new SmoothScroll('a[href*="#"]', {
        offset: 100,
      })
    }

    this.scrollToHash()

    // toc component may not rendered when exec this func
    setTimeout(this.getPrevAndNext, 300)
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
        href = href.split('#').join('/#')
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
        return null
      }
      if (!isPrev && currentIndex === links.length - 1) {
        return null
      }

      const index = isPrev ? currentIndex - 1 : currentIndex + 1
      const link = links[index]
      if (link.querySelectorAll('svg').length > 0) {
        return link
      }

      return isPrev
        ? prevOrNext(links, currentIndex - 1, isPrev)
        : prevOrNext(links, currentIndex + 1, isPrev)
    }

    if (!this.tocRef) {
      this.tocRef = document.getElementById('toc-wrap')
    }

    const linkDoms = this.tocRef.querySelectorAll('a[href]')
    const prev = {}
    const next = {}

    linkDoms.forEach((link, index) => {
      if (this.isCurrentLink(link)) {
        const prevLink = prevOrNext(linkDoms, index, true)
        if (prevLink) {
          prev.text = prevLink.text
          prev.href = prevLink.pathname
        }

        const nextLink = prevOrNext(linkDoms, index, false)
        if (linkDoms[index + 1]) {
          next.text = nextLink.text
          next.href = nextLink.pathname
        }

        this.setState({ prev, next })
        return
      }
    })
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
    const { slug } = this.props.pageContext
    const { html, frontmatter, headings } = this.props.data.post

    // fixme
    if (!frontmatter.id) {
      frontmatter.id = slug
    }

    const { prev, next } = this.state

    return (
      <Layout>
        <Helmet>
          <title>{`${frontmatter.title} | ${
            this.props.data.site.siteMetadata.title
          }`}</title>
        </Helmet>

        <Header />

        <BodyGrid>
          <DocNav />

          <MainContainer isExpand={this.state.isExpand}>
            <MarkdownWrapper>
              <MarkdownBody
                className="md-body"
                ref={ref => {
                  this.markdownRef = ref
                }}
              >
                <h1>{frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </MarkdownBody>

              <FooterWrapper>
                <Footer prev={prev} next={next} />
              </FooterWrapper>
            </MarkdownWrapper>

            <HeadingsWrapper>
              <Headings
                title={frontmatter.title}
                headings={headings}
                current={this.props.location.hash}
                onHeadClick={this.handleHeadClick}
              />
            </HeadingsWrapper>
          </MainContainer>
        </BodyGrid>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  fragment mdChild on MarkdownRemark {
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

  query MarkdownBySlug($slug: String!, $version: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
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
    # toggle lang
    languages: allMarkdownRemark(
      filter: { fields: { version: { eq: $version } } }
    ) {
      group(field: fields___language) {
        fieldValue
      }
    }
  }
`

const BodyGrid = styled.div`
  overflow-x: hidden;
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

const MarkdownBody = styled.div`
  padding: 104px 40px;
  padding-bottom: 40px;
`

const MarkdownWrapper = styled.div`
  padding-right: 280px;

  @media only screen and (max-width: 1280px) {
    padding-right: 0;
  }
`

const HeadingsWrapper = styled.div`
  position: fixed;
  top: 72px;
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
