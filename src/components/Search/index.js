import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import {Link, navigate, StaticQuery, graphql} from 'gatsby'

import { ReactComponent as SearchIcon } from 'assets/search.svg'

const stripHtmlTag= html=>  html.replace(/(<([^>]+)>)/ig, '');

class Search extends React.Component {
  static defaultProps = {
    placeholder: '请输入关键字进行搜索',
  }

  state={
    query: '',
    results: []
  }

  constructor(props) {
    super(props)
    this.docs = this.normalizeDocs(props.data.searchIndex.edges)
  }

  shouldComponentUpdate(prevProps, prevState) {
    return prevState.query !== this.state.query
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
      navigate(`/docs?query=${this.state.query}`)
    }
  }

  render() {
    const { className, placeholder } = this.props
    const {query, results}=this.state

    return (
      <SearchWrapper className={classnames('search', className)}>
        <SearchIcon />
        <input type="text" placeholder={placeholder} value={query} onChange={this.handleSearch} onKeyDown={this.handleKeyDown}/>
        <ul className='search-results'>
          {
            results.map(({title, slug}, idx)=> {
              return (
                <li key={idx}>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            })
          }
        </ul>
      </SearchWrapper>
    )
  }
}

export default props=> (
  <StaticQuery query={
    graphql`{
       searchIndex: allMarkdownRemark {
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

const SearchWrapper = styled.div`
  position: relative;
  max-width: 460px;
  height: 36px;

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
  
    li {
      list-style-type: none;
      padding: 3px;
      padding-left: 20px;
      margin-bottom: 4px;
      &:hover {
        background: #f2f2f2;
      }
      & > a{
        width: 100%;
        display: inline-block;
        color: #555;
      }
    }
  }
`
