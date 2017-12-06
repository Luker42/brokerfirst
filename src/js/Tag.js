import React, { Component } from 'react';
//import PropTypes from 'react/prop-types';
import '../css/Tag.css';




class Tag extends Component {
  // static PropTypes = {
  //   value: PropTypes.number.isRequired,
  //   label: PropTypes.string.isRequired,
  //   removeTag: PropTypes.func.isRequired
  // }
  RemoveComponent = (props) => {
    return (
      <a
        className='tag-remove'
        onClick={() => props.removeTag(props.value)}
      >
        {String.fromCharCode(215)}
      </a>
    );
  }

  render() {
    return (
      <span className='tag'>
        <span className='tag-label'>
          {this.props.label}
        </span>
        {this.RemoveComponent(this.props)}
      </span>
    );
  }
}



export default Tag;