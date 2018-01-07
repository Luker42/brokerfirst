import React, { Component } from 'react';
import axios from 'axios';
import Page from './Page';
import Broker from './Broker';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';
import Tag from './Tag';
import 'react-select/dist/react-select.css';
import '../css/BrokerOverview.css';

class BrokerOverview extends Component {
  state = {
    brokers: [],
    neighborhoods: [],
    brokerIndex: 1,
    lastScroll: 0,
    showingStickyHeader: false,
    languageFilter: {
      label: 'English',
      value: 1
    },
    timeOfDayFilter: {
      label: '',
      value: 0
    },
    neighborhoodOptions: [],
    neighborhood: "",
    neighborhoods: []
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
      this.setState({brokers: response.data});
      this.loadAdditionalBrokerInfo(response.data.map(broker => broker.broker_id));
    }).catch((error) => {
      console.log(error)
    });
  };

  loadAdditionalBrokerInfo = (brokerIds) => {
    axios.get('http://localhost:8888/get_additional_broker_info.php', {
      params: {
        brokerIds: brokerIds
      }
    }).then((response) => {
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

  /**
  * Renders a suggestion in the neighborhood selection autosuggest
  */
  renderNeighborhoodSuggestion = suggestion => {
    return (
      <span>{suggestion.neighborhood_name}</span>
    );
  };

  getNeighborhoodSuggestionValue = suggestion => {
    console.log(suggestion);
    return suggestion.neighborhood_name;
  }

  onChange = (event, { newValue }) => {
    this.setState({neighborhood: newValue});
  };

  getNeighborhoods = value => {
    axios.get('http://localhost:8888/get_neighborhoods.php', {
      params: {
        neighborhood: value.value
      }
    }).then((response) => {
      this.setState({neighborhoodOptions: response.data})
    }).catch((error) => {
      console.log(value.value);
    });
  };
  
  removeTag = tag => {
    this.setState((prevState) => {
      return {
        neighborhoods: prevState.neighborhoods.filter(t => t.neighborhood_id !== tag)
      };
    });
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.setState((prevState) => {
      return {
        neighborhoods: [...prevState.neighborhoods, suggestion],
        neighborhood: '' 
      };
    });
  };

  renderInputComponent = inputProps => {
    return (
      <div className="filterInputContainer">
        <input {...inputProps} />
      </div>
    );
  }

  render() {
    return (
      <Page 
      	pageContent={
          <div className="broker-overview-body-container">
            <div className="broker-overview-container">
              <div className="broker-overview-top-container">
                <div className='filter-neighborhood-autosuggest'>
                  <Autosuggest
                    suggestions={this.state.neighborhoodOptions}
                    onSuggestionsFetchRequested={this.getNeighborhoods}
                    onSuggestionsClearRequested={() => this.setState({neighborhoodOptions: []})}
                    getSuggestionValue={this.getNeighborhoodSuggestionValue}
                    renderSuggestion={this.renderNeighborhoodSuggestion}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderInputComponent={this.renderInputComponent}
                    inputProps={{
                      value: this.state.neighborhood,
                      placeholder: !(this.state.neighborhoods.length < 5) ? 'Only allowed 5 neighborhoods' : 'Add neighborhoods',
                      onChange: this.onChange,
                      disabled: !(this.state.neighborhoods.length < 5)
                    }}
                  />
                  <div>
                    {
                      this.state.neighborhoods.map((neighborhood) => {
                        return (
                          <Tag
                            key={neighborhood.neighborhood_id}
                            label={neighborhood.neighborhood_name}
                            value={neighborhood.neighborhood_id}
                            removeTag={this.removeTag}
                          />
                        );
                      })
                    }
                  </div>
                </div>
                <h3>Price Range</h3>
                  <input name='max' type="text" className="filter-input" placeholder="Max"/>
                  <input name='min' type="text" className="filter-input" placeholder="Min"/>
                  <label>
                    Language:&nbsp;
                    <Select
                      value={this.state.languageFilter.value}
                      onChange={(option) => this.setState({languageFilter: option})}
                      options={[
                        { value: 1, label: 'English' },
                        { value: 2, label: 'Spanish' },
                      ]}
                    />
                  </label>
                  <label>
                    Time of day:&nbsp;
                    <Select
                      value={this.state.timeOfDayFilter.value}
                      onChange={(option) => this.setState({timeOfDayFilter: option})}
                      options={[
                        { value: 1, label: 'Morning (8AM - 12PM)' },
                        { value: 2, label: 'Afternoon (12PM - 4PM)' },
                        { value: 3, label: 'Evening (4PM - 8PM)' }
                      ]}
                    />
                  </label>
              </div>
              <div className="broker-list">
                {this.state.brokers.map((broker) => {
                  return (
                    <Link
                      className="broker-link"
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