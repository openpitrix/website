/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery, navigate } from 'gatsby'
import {sortVersions} from 'utils'

import Select from 'components/Select';

class Versions extends Component {
  getCurrentVersion(){
    const parts=location.pathname.match(/docs\/?(v[^\/]+)/);
    return parts && parts[1] ? parts[1] : null;
  }

  handleChangeVersion=version=> {
    // todo: default entry
    const docEntry=`/docs/${version}/zh-CN/user-guide/introduction/`;
    navigate(docEntry);
  }

  render() {
    const { versions } = this.props.data
    const sortedVersions=sortVersions(versions)
    const latestVer=sortedVersions[0];
    const currentVersion=this.getCurrentVersion() || latestVer;

    return (
      <VersionsWrapper>
        <Select defaultValue={currentVersion} onChange={this.handleChangeVersion}>
          {
            sortedVersions.map((version, idx)=> (
              <Select.Option key={idx} value={version}>
                OpenPitrix {version}
                {version === latestVer && (
                  <span className='latest-ver'>最新</span>
                )}
              </Select.Option>
            ))
          }
        </Select>
      </VersionsWrapper>
    )
  }
}

const VersionsWrapper = styled.div`
  padding: 20px;
  padding-bottom: 24px;
  
  .latest-ver {
    display: inline-block;
    margin-left: 8px;
    padding: 2px;
    border-radius: 1px;
    background-color: #fac846;
    font-family: PingFangSC san-serif;
    font-size: 12px;
    color: #343945;
  }
`

export default props => (
  <StaticQuery
    query={graphql`{
    versions: allMarkdownRemark {
      group(field: fields___version) {
        fieldValue
      }
    }
  }
`}
    render={data => {
      return <Versions data={data} {...props} />
    }}
  />
)

