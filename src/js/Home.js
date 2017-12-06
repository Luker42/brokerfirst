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
				<button
					className="homepage-neighborhood-search"
				>
					<Link
						className="neighborhood-router-link"
						to={`/search/${this.state.neighborhoods.map(a => a.neighborhood_id)}`}
					>
						<i className="fa fa-search" aria-hidden="true"></i>
					</Link>
				</button>
		  </div>
	  );
 	}

  render() {
    return (
      <Page 
      	pageContent={(
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
       		</div>
        )}
      />
    );
  }
}

export default Home;