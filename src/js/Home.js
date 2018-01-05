import React, { Component } from 'react';
import Page from './Page';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import '../css/Home.css';

class Home extends Component {
  state = {
  	isNewUserModalOpen: true,
  	neighborhoodOptions: [],
  	neighborhood: "",
  	neighborhoods: []
  };

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
		  <div className="inputContainer">
		    <input {...inputProps} />
		    <Link
					className="neighborhood-router-link"
					to={`/search/${this.state.neighborhoods.map(a => a.neighborhood_id)}`}
				>
					<button
						className="homepage-neighborhood-search"
					>
							<i className="fa fa-search" aria-hidden="true"></i>
					</button>
				</Link>
		  </div>
	  );
 	}

 	Homepage = () => {
 		return (
 			<div className='home'>
    		<div className='home-hero-image'>
    			<div className='neighborhood-vertical-align'>
      			<div className='neighborhood-autosuggest'>
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
 					</div>
    		</div>
    		<div className='home-middle-content'>
    			<div className='home-content'>
    			<div className='home-broker-join-left'>
	    			<div className='home-section-title'>
	    				Are you NOT a shit broker?
	    			</div>
    				<ul className='home-broker-join-list'>
    					<li className='home-broker-join-list-element'>
    						Broker's benefit when they sign up with us! 
    					</li>
    					<li className='home-broker-join-list-element'>
    						Sign up is a breeze, simply make a premium account and update your calendar
    					</li>
    					<li className='home-broker-join-list-element'>
    						Brokers love the increase in business!
    					</li>
    				</ul>
						<button
							className="home-broker-join-button"
							onClick={() => {
								window.location = 'broker_registration'
							}}
						>
							Enroll as a broker
					</button>
    			</div>
    			<div className='home-broker-join-icon'>
    				<img src='icons/city.svg' className='home-broker-join-icon-svg' />
    			</div>
    			</div>
    		</div>
      </div>
    );
 	}

  render() {
    return (
      <Page 
      	pageContent={this.Homepage()}
      />
    );
  }
}

export default Home;