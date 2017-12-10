import React, { Component } from 'react';
import StarRating from 'react-star-ratings';
import '../css/Broker.css';

class Broker extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="broker">
        <div className="broker-avatar-container">
          <div className="broker-availability">
            Availabilty: 10/29
          </div>
          <img
            className="broker-avatar"
            src={this.props.broker_avatar}
            alt={this.props.broker_alt}
          />
        </div>
        <div className="broker-info">
          <div className="broker-name">
            {`${this.props.broker_first_name} ${this.props.broker_last_name}`}
          </div>
          <a href="#" className="brokerage">
            {this.props.brokerage_name}
          </a>
        </div>
        <div className="broker-rating">
          <StarRating
            rating={Math.round(this.props.broker_rating * 10) / 10}
            starWidthAndHeight={'20px'}
            numOfStars={5}
            starRatedColor={'#f8f90d'}
            starEmptyColor={'rgb(109, 122, 130)'}
          />
          <a href="#" className="broker-reviews-button">
            Reviews...
          </a>
        </div>
      </div>
    );
  }
}

export default Broker;