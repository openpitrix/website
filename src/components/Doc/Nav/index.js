import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby'
import get from 'lodash/get';

import Versions from 'components/Versions'
import TableOfContents from 'components/TableOfContents/index'
import { ReactComponent as Logo } from 'assets/op-logo.svg'

const Nav=styled.div`
  width: 256px;
  height: calc(100vh);
  position: absolute;
  top: 72px;
  left: 0;
  box-shadow: inset -1px 0 0 0 #eff0f5;
  background-color: #f9fafb;
  transition: all 0.2s ease-in-out;
  
  @media only screen and (max-width: 768px) {
  left: ${({ isExpand }) => {
  return isExpand ? 0 : '-290px'
}};
  }

`;

class DocNav extends React.Component {
  render() {
    const {versions, tableOfContents}=this.props.data;

    return (
      <Nav>
        <Versions
          versions={versions}
          // current={postNode.fields.version}
        />
          {/*<TableOfContents*/}
            {/*chapters={*/}
              {/*get(tableOfContents, 'edges[0].node.chapters')*/}
            {/*}*/}
          {/*/>*/}

        {/*<footer className="op-footer">*/}
          {/*<Logo className="logo"/>*/}
          {/*<div className="copy">*/}
            {/*Openpitrix Technology © 2019*/}
          {/*</div>*/}
        {/*</footer>*/}
      </Nav>
    )
  }
}

export default props=> (
  <StaticQuery
    query={queryVersions}
    render={data=> {
      console.log('versions data: ', data);

      return <DocNav data={data} {...props} />
    }}
  />
)

/* eslint no-undef: "off" */
export const queryVersions= graphql`
  query navVersions {
    versions: allMarkdownRemark {
      group(field: fields___version) {
        fieldValue
      }
    }
  }
`;

export const queryChapters = graphql`
  fragment frgMd on MarkdownRemark {
    fields {
      slug
    }
  }
  query chapters {
    tableOfContents: allContentJson(filter: { id: { eq: "v0.3-zh-CN" } }) {
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
