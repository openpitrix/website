/* eslint-disable no-undef, no-restricted-globals */
import React from 'react'
import styled from 'styled-components'
import {graphql, StaticQuery} from 'gatsby';
import get from 'lodash/get';
import find from 'lodash/find';

import ChapterList from './chapter'

class TableOfContents extends React.Component {
  componentWillMount() {
    const urlParts=location.pathname.split('/').filter(Boolean)
    this.slugId=`${urlParts[1]}-${urlParts[2]}`
  }

  render() {
    const { toc } = this.props.data
    const chapters = get(find(toc.edges, ({node})=> node.id === this.slugId), 'node.chapters', [])

    if(!find(chapters, {idKey: 'doc-home-entry'})){
      chapters.unshift({
        title: "首页",
        idKey: 'doc-home-entry',
        entry: {
          childMarkdownRemark: {
            fields: {
              slug: "/docs"
            }
          }
        },
        entries: null
      })
    }

    return (
      <TOCWrapper id="toc-wrap">
        {chapters.map((chapter, index) => (
          <ChapterList {...chapter} key={index} />
        ))}
      </TOCWrapper>
    )
  }
}

const query=graphql`
  fragment frgMd on MarkdownRemark {
    fields {
      slug
    }
  }
  query {
    toc: allContentJson {
      edges {
        node {
          id
          chapters {
            title
            entry {
              id
              childMarkdownRemark {
                ...frgMd
              }
            }
            entries {
              entry {
                id
                childMarkdownRemark {
                  ...frgMd
                }
              }
            }
            chapters {
              title
              entry {
                id
                childMarkdownRemark {
                  ...frgMd
                }
              }
              entries {
                entry {
                  id
                  childMarkdownRemark {
                    ...frgMd
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

export default props=> <StaticQuery query={query} render={data=> {
  return <TableOfContents data={data} {...props} />
}}/>

const TOCWrapper = styled.div`
  margin: 0;
`
