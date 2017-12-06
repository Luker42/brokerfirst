import React, { Component } from 'react';
import Page from './Page';

class Brokers extends Component {
  
  render() {
    console.log(this.props);
    return (
      <Page 
      	pageContent={(
      		<div>Brokers!</div>
      		)}
      />
    );
  }
}

export default Brokers;