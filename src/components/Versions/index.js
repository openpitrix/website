/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery, navigate } from 'gatsby'
import { sortVersions } from 'utils'

import Select from 'components/Select'

class Versions extends Component {
  state = {
    currentVersion: '',
    latestVersion: ''
  }

  componentDidMount() {
    const { versions } = this.props.data
    const sortedVersions = sortVersions(versions)
    const latestVersion = sortedVersions[0]

    const parts = location.pathname.match(/docs\/?(v[^\/]+)/)
    let currentVersion = parts && parts[1] ? parts[1] : ''

    this.setState({
      latestVersion,
      currentVersion: currentVersion || latestVersion
    })
  }

  handleChangeVersion = version => {
    this.setState({
      currentVersion: version
    }, ()=> {
      // todo: default entry link
      navigate(`/docs/${version}/zh-CN/introduction/basic`)
    })
  }

  render() {
    const {currentVersion, latestVersion}=this.state
    const {versions}=this.props.data

    return (
      <VersionsWrapper>
        <Select
          defaultValue={currentVersion}
          onChange={this.handleChangeVersion}
        >
          {
            sortVersions(versions).map((version, idx) => (
              <Select.Option key={idx} value={version}>
                OpenPitrix {version}
                {version === latestVersion && (
                  <span className="latest-ver">最新</span>
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
  height: 40px;
  margin-bottom: 24px;

  .latest-ver {
    display: inline-block;
    margin-left: 8px;
    padding: 2px;
    border-radius: 1px;
    background-color: #fac846;
    font-size: 12px;
    color: #343945;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      {
        versions: allMarkdownRemark(filter: {fields: {slug: {regex: "/^/docs//"}}}) {
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
