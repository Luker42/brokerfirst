import React, { Component } from 'react';
import axios from 'axios';
import Page from './Page';
import Broker from './Broker';
import { Link } from 'react-router-dom';
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
      this.setState({brokers: response.data})
    }).catch((error) => {
      console.log('s');
    });
  };

  render() {
    console.log(this.props);
    return (
      <Page 
      	pageContent={
          
          <div className="broker-overview-body-container">
            <div className="broker-overview-container">
              <div className="broker-overview-top-container">
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