import React from 'react'
import PropTypes from 'prop-types'
import GatsbyLink from 'gatsby-link'
import styled from 'styled-components'
import classnames from 'classnames'

import { ReactComponent as Arrow } from 'assets/arrow-black.svg'
import { ReactComponent as IconHome } from 'assets/home.svg'

class Link extends React.Component {
  static contextTypes = {
    location: PropTypes.object,
  }

  constructor(props, { location = {} }) {
    super(props)

    this.state = {
      pathname: location.pathname,
      hash: location.hash,
    }
  }

  componentDidMount() {
    if (!this.state.pathname) {
      let { pathname, hash } = window.location

      this.setState({
        pathname,
        hash,
      })
    }
  }

  render() {
    const { to, ...rest } = this.props
    const { pathname, hash } = this.state
    const selected = pathname + decodeURIComponent(hash) === to

    return (
      <GatsbyLink
        to={to}
        {...rest}
        className={classnames({ 'selected-link': selected })}
      />
    )
  }
}

class LinkWithHeadings extends React.Component {
  static contextTypes = {
    location: PropTypes.object,
  }

  state = {
    open: false
  }

  componentDidMount() {
    const { location = window.location } = this.context
    const { fields } = this.props.entry.childMarkdownRemark || this.props.entry

    this.setState({
      open: location.pathname === fields.slug,
    })
  }

  handleClick = () => {
    this.setState(({ open }) => ({
      open: !open,
    }))
  }

  render() {
    const { entry, level, title, idKey } = this.props
    const { headings, fields, frontmatter = {} } = entry.childMarkdownRemark || entry
    const { open } = this.state
    const possibleTitle = title || frontmatter.title

    let heads = []

    if (headings) {
      heads = headings.filter(head => head.depth === 2)
    }

    return (
      <div>
        <Link to={fields.slug}>
          <Title level={level} onClick={this.handleClick} active={open}>
            {idKey === 'doc-home-entry' ? (
              <IconHome className="no-rotate" />
            ) : (
              <Arrow className={classnames({ 'arrow-open': open })} />
            )}
            <span title={possibleTitle}>{possibleTitle}</span>
          </Title>
        </Link>
        <HeadingsWrapper
          className={classnames('heads-toggle', { 'heads-open': open })}
        >
          {heads.length > 0 && (
            <Headings heads={heads} prefix={fields.slug} level={level + 1} />
          )}
        </HeadingsWrapper>
      </div>
    )
  }
}

const Headings = ({ heads, prefix, level }) => (
  <StyledList>
    {heads.map(({ value }, key) => (
      <ListItem key={key}>
        <Link
          to={
            prefix +
            '#' +
            value
              .replace(/[:.]/g, '')
              .split(' ')
              .join('-')
              .toLowerCase()
          }
        >
          <Title level={level}>{value}</Title>
        </Link>
      </ListItem>
    ))}
  </StyledList>
)

const Links = ({ entries, level }) => (
  <StyledList>
    {entries.map(({ entry }, key) => (
      <ListItem key={key}>
        <LinkWithHeadings entry={entry} level={level} />
      </ListItem>
    ))}
  </StyledList>
)

export default class ChapterList extends React.Component {
  static contextTypes = {
    location: PropTypes.object,
  }

  state={
    open: false,
    pathname: ''
  }

  constructor(props, context) {
    super(props)
    this.pathname = (context.location || {}).pathname
  }

  checkSlug(){
    const {props}=this
    let open=false

    if (props.entries) {
      const slugs = props.entries.map(
        ({ entry }) => entry.childMarkdownRemark.fields.slug
      )

      open = slugs.includes(this.pathname)
    } else if (props.chapters) {
      const slugs = []
      props.chapters.forEach(chapter => {
        if(chapter.slug){
          slugs.push(chapter.slug)
        }
        else if (chapter.entry) {
          slugs.push(chapter.entry.childMarkdownRemark.fields.slug)
        }
        else if (chapter.entries) {
          slugs.push(
            ...chapter.entries.map(
              ({ entry }) => entry.childMarkdownRemark.fields.slug
            )
          )
        }
        else if (Array.isArray(chapter.chapters)) {
          slugs.push(...chapter.chapters.map(({slug})=> slug))
        }
      })

      open = slugs.includes(this.pathname)
    }

    this.setState({
      open,
      pathname: this.pathname
    })
  }

  componentDidMount() {
    if (!this.state.pathname) {
      this.pathname = window.location.pathname

      this.checkSlug()
    }
  }

  handleClick = () => {
    this.setState(({ open }) => ({
      open: !open,
    }))
  }

  render() {
    const { chapters, entry, entries, title, idKey, level = 0 } = this.props
    const { open } = this.state

    return (
      <StyledList>
        {title && (
          <ListItem key={`${title}${level}`}>
            {entry ? (
              <LinkWithHeadings {...{ entry, level, title, idKey }} />
            ) : (
              <Title level={level} onClick={this.handleClick} active={open}>
                <Arrow className={classnames({ 'arrow-open': open })} />
                <span title={title}>{title}</span>
              </Title>
            )}
          </ListItem>
        )}
        <ListItem className={classnames('list-toggle', { 'list-open': open })}>
          {entries && <Links entries={entries} level={level + 1} />}
        </ListItem>
        <ListItem className={classnames('list-toggle', { 'list-open': open })}>
          {chapters &&
            chapters.map((chapter, index) => (
              <ChapterList {...chapter} level={level + 1} key={`${index}`} />
            ))}
        </ListItem>
      </StyledList>
    )
  }
}

const StyledList = styled.ol`
  list-style: none;
  margin: 0;
`

const ListItem = styled.li`
  margin: 0;

  .selected-link > h5 {
    color: #6d35c3;
    // background-color: rgb(255,255,255, 0.1);
  }

  &.list-toggle > ol > li {
    height: 0;
    overflow: hidden;
  }

  &.list-open > ol > li {
    height: auto;
  }
`

const Title = styled.h5`
  position: relative;
  font-weight: normal;
  line-height: 24px;
  text-align: left;
  color: #576075;
  opacity: ${({ active }) => {
    return active ? 1 : 0.8
  }};
  cursor: pointer;
  margin-bottom: ${({ level }) => {
    switch (level % 4) {
      case 0:
        return '16px'
      default:
        return '12px'
    }
  }};
  padding-left: ${({ level }) => {
    switch (level % 4) {
      case 1:
        return '24px'
      case 2:
        return '48px'
      case 3:
        return '72px'
      default:
        return '0'
    }
  }};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ active }) => {
    return active ? '#6d35c3' : 'none'
  }}

  &:hover {
    background-color: rgb(255,255,255,0.2);
  }

  & > svg {
    width: 16px;
    height: 16px;
    margin-top: 4px;
    margin-right: 8px;
    vertical-align: sub;
    transform: rotate(-90deg);
    transition: all 0.2s ease;

    &.arrow-open {
      transform: rotate(0);
    }
    &.no-rotate {
      transform: rotate(0);
    }
  }
`

const HeadingsWrapper = styled.div`
  &.heads-toggle > ol > li {
    height: 0;
    overflow: hidden;
  }

  &.heads-open > ol > li {
    height: auto;
  }
`
