import React, { Component } from 'react';
import axios from 'axios';
import Page from './Page';
import _ from 'underscore';
import Review from './Review';
import Listing from './Listing';
import Availability from './Availability';
import BrokerInfo from './BrokerInfo';
import { Col, Row } from 'react-grid-system'; 
import '../css/BrokerView.css';

const adjustRight = {'marginRight': '40px' };

class BrokerView extends Component {
  state = {
    brokerId: '',
    broker: {},
    reviews: [],
    listings: [],
    isCurrentBrokerAccount: false
  }

  componentDidMount = () => {
    this.setState(() => {
      if (typeof(this.props.match.params.brokerId) !== 'undefined') {
        return {
          brokerId: this.props.match.params.brokerId,
          isCurrentBrokerAccount: localStorage.broker_id === this.props.match.params.brokerId
        };
      }
    }, () => {
        this.loadBrokerInfo();
        this.loadListings();
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
            this.loadAdditionalBrokerInfo([this.state.brokerId]);
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
  * Loads additional broker info after initial broker page load
  */
  loadAdditionalBrokerInfo = (brokerIds) => {
    axios.get('http://localhost:8888/get_additional_broker_info.php', {
      params: {
        brokerIds: brokerIds
      }
    }).then((response) => {
      if (response.data.length === 1) {
        this.setState((prevState) => {
          return {
            broker: Object.assign(prevState.broker, response.data[0])
          }
        });
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  /**
  * Lazy loading reviews after info data is received
  */
  loadBrokerReviews = () => {
    axios.get('http://localhost:8888/get_broker_reviews.php', {
      params: {
        brokerId: this.state.brokerId
      }
    }).then((response) => {
      if (response.data) {
        this.setState({reviews: response.data});
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  /**
  * Lazy loading listings
  */
  loadListings = () => {
    axios.get('http://localhost:8888/get_broker_listings.php', {
      params: {
        brokerId: this.state.brokerId
      }
    }).then((response) => {
      if (response.data) {
        this.setState({listings: response.data})
      }
    }).catch((error) => {
      console.log(error)
    });
  };


  brokerAvailability = () => {
    return (
      <div className="brokerview-availability">
        <Availability/>
      </div>
    );
  }


  render() {
    return (
      <Page 
        pageContent={(
          <div className="brokerview-container">
            {this.state.isCurrentBrokerAccount &&
              <div className="brokerview-fill-out-info">
                <h3>This is your account! Add more information so we can make you show up in more peoples searches.</h3>
              </div>
            }
            <Row>
            <Col
              lg={4} 
              className="brokerview-info"
              style={adjustRight}
            >
              <BrokerInfo 
                broker={this.state.broker}
                isCurrentBrokerAccount={this.state.isCurrentBrokerAccount}
              />
            </Col>
            <Col lg={7}>
              <h2>Availability</h2>
              {this.brokerAvailability()}
            </Col>
            </Row>
            <Row className="brokerview-middle-container">
              <Col
                lg={4}
                className="brokerview-listings"
                style={adjustRight}
              >
                <div className='brokerview-listings-container'>
                  <h2>Check out this broker's listings!</h2>
                  {this.state.listings.length > 0 && 
                    this.state.listings.map((listing) => {
                      return (
                        <Listing
                          key={listing.listing_id}
                          {...listing}
                        />
                      );
                    })
                  }
                  {this.state.listings.length === 0 &&
                    <div className='brokerview-no-listings'>
                      Sorry, this broker doesn't have any listings currently
                    </div>
                  }
                </div>
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