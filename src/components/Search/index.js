import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import {Link, StaticQuery, graphql} from 'gatsby'
import Modal from 'components/Modal'

import { ReactComponent as SearchIcon } from 'assets/search.svg'

import styles from './index.module.scss'

const stripHtmlTag= html=>  html.replace(/(<([^>]+)>)/ig, '');

class Search extends React.Component {
  static defaultProps = {
    placeholder: '请输入关键字进行搜索',
  }

  state={
    query: '',
    results: [],
    openModal: false
  }

  constructor(props) {
    super(props)
    this.docs = this.normalizeDocs(props.data.searchIndex.edges)
  }

  normalizeDocs=(edges=[])=> {
    return edges.map(({node})=> {
      const {slug, version}=node.fields

      return {
        title: node.frontmatter.title,
        body: node.html,
        slug,
        version
      }
    })
  }

  getDocsByQuery=query=> {
    query=query.trim().toLowerCase()

    if(!query){
      return []
    }

    return this.docs.filter(doc=> {
      let {title, body}=doc
      title=stripHtmlTag(title).toLowerCase()
      body=stripHtmlTag(body).toLowerCase()

      return title.indexOf(query) > -1 || body.indexOf(query) > -1
    })
  }

  handleSearch= ev => {
    const query=ev.currentTarget.value

    this.setState({
      query,
      results: this.getDocsByQuery(query)
    })
  }

  handleKeyDown=ev=> {
    // press enter
    if(ev.which === 13){
      this.setState({
        openModal: true
      })
    }
  }

  handleCloseModal=e=> {
    this.setState({
      openModal: false
    })
  }

  render() {
    const { className, placeholder } = this.props
    const {query, results, openModal}=this.state

    return (
      <Wrapper className={classnames('search', className)}>
        <SearchWrapper>
          <SearchIcon />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={this.handleSearch}
            onKeyDown={this.handleKeyDown}
          />

          <ul className={classnames('search-results', {hasRes: results.length > 0})}>
            {
              results.map(({title, slug}, idx)=> (
                <li key={idx}>
                  <Link to={slug}>{title}</Link>
                </li>
              ))
            }
          </ul>
        </SearchWrapper>

        <Modal
          className={styles.searchModal}
          isOpen={openModal}
          onClose={this.handleCloseModal}
        >
          <SearchWrapper className="sch-wrap">
            <SearchIcon />
            <input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={this.handleSearch}
            />
          </SearchWrapper>

          {
            results.length ? (
              results.map(({title, body, slug, version}, idx)=> (
                  <SearchItem key={idx}>
                    <Link to={slug} className='title'>{title}</Link>
                    <div className='body'>
                      {stripHtmlTag(body).substring(0, 140) + '...'}
                    </div>
                    <div className='bottom-links'>
                      <span className='version'>OpenPitrix {version}</span>
                      <span className='link'>
                      <Link to={slug}>{[location.origin, slug].join('')}</Link>
                    </span>
                    </div>
                  </SearchItem>

                )
              )
              ) : (
                <div>搜索结果为空</div>
            )
          }
        </Modal>

      </Wrapper>
    )
  }
}

export default props=> (
  <StaticQuery query={
    graphql`{
       searchIndex: allMarkdownRemark(filter: {fields: {slug: {regex: "/^/docs//"}}}) {
           edges {
             node {
               fields {
                 slug
                 version
               }
               html
               frontmatter {
                 title
               }
             }
           }
         }
       }
    `
  } render={data=> (
    <Search data={data} {...props} />
  )}/>
)

const Wrapper=styled.div`
 
`

const SearchWrapper = styled.div`
  position: relative;
  max-width: 460px;
  height: 36px;
  z-index: 1;
  
  input {
    width: 100%;
    height: 100%;
    padding: 7px 20px 7px 40px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.7;
    color: #fff;
    border-radius: 18px;
    border: solid 1px #eff0f5;
    transition: all 0.2s ease;

    &::placeholder {
      color: white;
      font-weight: normal;
    }

    &:focus {
      outline: none;
      // background-color: #fff;
    }
  }

  & > svg {
    position: absolute;
    top: 50%;
    left: 14px;
    width: 14px;
    height: 14px;
    transform: translateY(-50%);
  }
  
  .search-results {
    background: white;
    margin-left: 18px;
    margin-right: 18px;
    max-height: 305px;
    overflow: scroll;
    &.hasRes {
      border-top: none;
      border: 1px solid #ddd;
    }
    
    li {
      list-style-type: none;
      margin-bottom: 4px;
      &:hover {
        background: #f2f2f2;
      }
      & > a{
        width: 100%;
        padding: 5px 10px;
        display: inline-block;
        color: #555;
      }
    }
  }
`

const SearchItem=styled.li`
  margin-bottom: 40px;
  
  .title {
    color: #8454cd;
    font-size: 24px;
    line-height: 1.5;  
  }
  .body {
    margin-top: 12px;
    margin-bottom: 16px;
    color: #474e5d;
  }
  .bottom-links {
    .version{
      margin-right: 13px;
      color: #8c96ad;
    }
    .link {
      color: #8454cd;
    }
  }
`
