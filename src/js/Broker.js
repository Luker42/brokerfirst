import React, { Component } from 'react';
import StarRating from 'react-star-ratings';
import { Row, Col } from 'react-grid-system';
import '../css/Broker.css';

class Broker extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="broker">
        <Row>
        <Col lg={3} md={3} sm={3} xs={3} >
          <div className="broker-avatar-container">
            <img
              className="broker-avatar"
              src={this.props.broker_avatar}
              alt={this.props.broker_alt}
            />
          </div>
        </Col>
        <Col lg={4} md={4} sm={4} xs={4} className='broker-info-col'>
          <div className="broker-info">
            <div className="broker-name">
              {`${this.props.broker_first_name} ${this.props.broker_last_name}`}
            </div>
            <div className="brokerage">
              {this.props.brokerage_name}
            </div>
            <div className="broker-rating">
              <StarRating
                rating={Math.round(this.props.broker_rating * 10) / 10}
                starWidthAndHeight={'20px'}
                numOfStars={5}
                starRatedColor={'#f6b85c'}
                starEmptyColor={'rgb(109, 122, 130)'}
              />
              <div className="broker-reviews-button">
                Reviews...
              </div>
            </div>
          </div>
        </Col>
        <Col lg={4} md={4} sm={4} xs={4} className="next-available">
          <div className="next-available-text">
            Next available appointment
          </div>
          <button 
            className="next-available-button"
            onClick={(e) => {
              e.preventDefault();
              window.location = '/';
            }}
          >
            Oct. 29 10:00AM
          </button>
        </Col>
        </Row>
      </div>
    );
  }
}

export default Broker;