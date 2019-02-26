import React from 'react'
import ReactModal from 'react-modal';
import PropTypes from 'prop-types'
import { omit } from 'lodash';

import { Style } from './styled'

const customStyles = {
  content : {
    position: 'absolute',
    width: '700px',
    height: '300px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

/*const { content } = ReactModal.defaultStyles

Object.assign(ReactModal.defaultStyles.overlay, customStyles.overlay)

ReactModal.defaultStyles.content = Object.assign(
  {},
  omit(content, ['top', 'left', 'right', 'bottom', 'padding']),
  customStyles.content
)*/
export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    closable: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    visible: PropTypes.bool,
    width: PropTypes.number,
  }

  static defaultProps = {
    width: 744,
  }

  render() {
    const {
      title,
      width,
      visible,
      children,
      onCancel,
      closable,
    } = this.props

    return (
      <Style>
      <ReactModal
        className='modal'
        style={customStyles}
        isOpen={visible}
        onRequestClose={onCancel}
        shouldCloseOnOverlayClick={false}
      >
        <div className="header">
          <div className="title">{title}</div>
            {closable && (
              <label className="close">X</label>
            )}
          </div>
        <div className="body">{children}</div>
      </ReactModal>
      </Style>
    )
  }
}
