import React, { Component } from 'react'
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'

import { ReactComponent as DocsIcon } from '../assets/docs.svg'
import { ReactComponent as OpenPitrix } from '../assets/openpitrix.svg'
import { ReactComponent as Arrow } from '../assets/arrow-solid.svg'

class VersionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
    };
    this.toggleVersions = this.toggleVersions.bind(this);
  }

  toggleVersions() {
    const { extended } = this.state;
    this.setState({
      extended: !extended
    });
  }

  render() {
    const { versions, current } = this.props;
    const { extended } = this.state;
    return (
      <VersionsWrapper>
        <div className="version-text">
          <p style={{ textTransform: 'capitalize' }}>
            <strong>OpenPitrix</strong>
            {current}
          </p>
        </div>
        {versions.group.length > 1 && <Arrow onClick={this.toggleVersions} className="version-arrow"/>}
        <div className="version-menu">
          {
            extended &&
            versions.group.map(({ fieldValue }) => (
              <GatsbyLink
                className={
                  current === fieldValue ?
                    'version-menu-item active' :
                    'version-menu-item'
                }
                to={`/${fieldValue}/zh-CN/basic/`}
                key={fieldValue}
              >
                OpenPitrix {fieldValue}
              </GatsbyLink>))
          }
        </div>
      </VersionsWrapper>
    )
  }
}

const VersionsWrapper = styled.div`
  padding: 24px 20px 63px;

  .version-logo {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    vertical-align: middle;
  }

  .version-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    strong {
      font-weight: bold;
      margin-right: 8px;
    }

    .openpitrix-icon {
      display: block;
      width: 104px;
      height: 16px;
    }

    & > p {
      margin: 0 auto 24px;
    }
  }

  .version-arrow {
    float: right;
    width: 16px;
    height: 16px;
    margin-top: 3px;
    vertical-align: middle;
    cursor: pointer;
  }
  .version-menu {
    position: absolute;
    left: 0;
    width: 280px;
    z-index: 2;
  }
  .version-menu-item {
    display: block;
    color: white;
    font-size: 14px;
    padding: 8px 24px;
    background: #343945;
    &.active,
    &:hover {
      background: #474e5d;
      cursor: pointer;
    }
  }
`

export default VersionComponent
