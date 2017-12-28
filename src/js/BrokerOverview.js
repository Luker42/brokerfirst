import React, { Component } from 'react';
import axios from 'axios';
import Page from './Page';
import Broker from './Broker';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-grid-system'; 
import '../css/BrokerOverview.css';

class BrokerOverview extends Component {
  state = {
    brokers: [],
    neighborhoods: [],
    brokerIndex: 1
  }

  // Set state to passed in neighborhoods and call load brokers as callback
  componentDidMount = () => {
    this.setState(() => {
      if (typeof(this.props.match.params.neighborhoods) !== 'undefined') {
        return {
          neighborhoods: this.props.match.params.neighborhoods
        };
      }
    }, this.loadBrokers());   
  };

  loadBrokers = () => {
    axios.get('http://localhost:8888/get_brokers.php', {
      params: {
        neighborhoods: this.state.neighborhoods
      }
    }).then((response) => {
      console.log(response);
      this.setState({brokers: response.data});
      this.loadAdditionalBrokerInfo(response.data.map(broker => broker.broker_id));
    }).catch((error) => {
      console.log('s');
    });
  };

  loadAdditionalBrokerInfo = (brokerIds) => {
    axios.get('http://localhost:8888/get_additional_broker_info.php', {
      params: {
        brokerIds: brokerIds
      }
    }).then((response) => {
      console.log(response);
      this.setState((prevState) => {
        return {
          brokers: _.map(prevState.brokers, function(broker){
                    return _.extend(broker, _.findWhere(response.data, { broker_id: broker.broker_id }));
                  })
        }
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <Page 
      	pageContent={
          
          <div className="broker-overview-body-container">
            <div className="broker-overview-container">
              <div className="broker-overview-top-container">
                <Row>
                  <Col size={4}>
                  <label>
                    Price: <input type="text" placeholder="Min"/>
                    to <input type="text" placeholder="Max"/>
                  </label>
                  </Col>
                </Row>
                <div className="neighborhoods">

                </div>
              </div>
              <div className="broker-list">
                {this.state.brokers.map((broker) => {
                  return (
                    <Link
                      to={`/broker/${broker.broker_id}`}
                      key={broker.broker_id}
                    >
                      <Broker
                        {...broker}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
      		}
      />
    );
  }
}

export default BrokerOverview;