import React, { Component } from 'react';
import axios from 'axios';
import StarRating from 'react-star-ratings';
import Page from './Page';
import Review from './Review';
import { Col, Row } from 'react-grid-system'; 
import '../css/BrokerView.css';

const adjustRight = {'margin-right': '40px' };

class BrokerView extends Component {
  state = {
    brokerId: '',
    broker: {},
    reviews: []
  };

  componentDidMount = () => {
    this.setState(() => {
      if (typeof(this.props.match.params.brokerId) !== 'undefined') {
        return {
          brokerId: this.props.match.params.brokerId
        };
      }
    }, () => {
        this.loadBrokerInfo()
      }
    );  
  };

  /**
  * Load broker info to populate page. In the future this will be divided up between two functions 
  * for lazy loading
  */
  loadBrokerInfo = () => {
    axios.get('http://localhost:8888/get_broker_info.php', {
      params: {
        brokerId: this.state.brokerId
      }
    }).then((response) => {
      if (response.data) {
        this.setState(
          {broker: response.data},
          () => {
            this.loadBrokerReviews();
          }
        )
      } else {
        window.location = '/';
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  /**
  * Lazy loading reviews after info data is received
  */
  loadBrokerReviews = () => {
    axios.get('http://localhost:8888/get_broker_reviews.php', {
      params: {
        brokerId: this.state.brokerId
      }
    }).then((response) => {
      console.log(response)
      if (response.data) {
        this.setState({reviews: response.data});
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  brokerInfo = () => {
    return (
      <div className="broker">
        <div className="broker-avatar-container">
          <img
            className="broker-avatar"
            src={this.state.broker.broker_avatar}
            alt={this.state.broker.broker_alt}
          />
        </div>
        <div className="broker-info">
          <div className="broker-name">
            {`${this.state.broker.broker_first_name} ${this.state.broker.broker_last_name}`}
          </div>
          <a href="#" className="brokerage">
            {this.state.broker.brokerage_name}
          </a>
        </div>
        <div className="broker-rating">
          <StarRating
            rating={Math.round(this.state.broker.broker_rating * 10) / 10}
            starWidthAndHeight={'20px'}
            numOfStars={5}
          />
        </div>
      </div>
    );
  }

  brokerAvailability = () => {
    return (
      <div className="brokerview-availability">
      </div>
    );
  }


  render() {
    return (
      <Page 
        pageContent={(
          <div className="brokerview-container">
            <Row>
            <Col
              lg={4} 
              className="brokerview-info"
              style={adjustRight}
            >
              {this.brokerInfo()}
            </Col>
            <Col lg={7} className="brokerview-availability">
              {this.brokerAvailability()}
            </Col>
            </Row>
            <Row className="brokerview-middle-container">
              <Col
                lg={4}
                className="brokerview-listings"
                style={adjustRight}
              >
                <h2>Check out this broker's listings!</h2>
              </Col>
              <Col lg={7} className="brokerview-reviews">              
                <h2>Verified Reviews</h2>
                {this.state.reviews.length > 0 &&
                  this.state.reviews.map((review) => {
                    return (
                      <Review
                        key={review.review_id}
                        {...review}
                      />
                    );
                  })
                }
                {this.state.reviews.length === 0 && 
                  <div className="no-reviews">
                    Apologies, this broker doesn't have any reviews yet. But trust us, we'll vouch for them.
                  </div>
                }
              </Col>
            </Row>
          </div>
        )}
      />
    );
  }
}

export default BrokerView;