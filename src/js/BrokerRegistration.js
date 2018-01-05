import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Page from '../js/Page';
import { Redirect } from 'react-router-dom'
import '../css/Login.css';

class BrokerRegistration extends Component {
	state = {
		isLoggingIn: true,
		brokerage: '',
		brokerageOptions: [],
		emailValue: '',
		password: '',
		firstName: '',
		lastName: '',
		redirect: false
	};

	handleEmailChange = (e) => {
		this.setState({emailValue: e.target.value});
	};

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	};

	handleFirstNameChange = (e) => {
		this.setState({firstName: e.target.value});
	};

	handleLastNameChange = (e) => {
		this.setState({lastName: e.target.value});
	}

	handleRegisterClick = () => {
		axios.get('http://localhost:8888/create_broker_account.php', {
			params: {
				brokerFirstName: this.state.firstName,
				brokerLastName: this.state.lastName,
				brokerEmail: this.state.emailValue,
				brokerPassword: this.state.password
			}
		}).then((response) => {
			console.log(response);
			if (response.data) {
				const { broker, token } = response.data;
				console.log(broker, token);
				localStorage.clear();
				localStorage.setItem('token', token);
        localStorage.setItem('broker_id', broker);

				//window.location = `/broker/${response.data.broker_id}`
			} else if (!response) {
				//TODO make screen show duplicate email
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	/**
  * Renders a suggestion in the neighborhood selection autosuggest
  */
	renderBrokerageSuggestion = suggestion => {
	  return (
	    <span>{suggestion.neighborhood_name}</span>
	  );
	};

	getBrokerageSuggestionValue = suggestion => {
  	return suggestion.neighborhood_name;
	}

	onChange = (event, { newValue }) => {
		this.setState({brokerage: newValue});
	};

	getBrokerages = value => {
		axios.get('http://localhost:8888/get_neighborhoods.php', {
			params: {
				neighborhood: value.value
			}
		}).then((response) => {
			this.setState({brokerageOptions: response.data})
		}).catch((error) => {
			console.log(value.value);
		});
	};

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
  	this.setState({brokerage: suggestion});
  };

  renderInputComponent = inputProps => {
	  return (
		  <div className="inputContainer">
		    <input {...inputProps} />
		  </div>
	  );
 	}

	render() {
		return (
			<Page
				pageContent={(
					<div className='login-container'>
				  	<div className="form">
					    <div className="register-form">
					      <input
					      	type="text"
					      	placeholder="First name"
					      	onChange={this.handleFirstNameChange}
					      />
					      <input
					      	type="text"
					      	placeholder="Last name"
					      	onChange={this.handleLastNameChange}
					      />
					      <input
					      	type="password"
					      	placeholder="Password"
									onChange={this.handlePasswordChange}
					      />
					      <input
						      type="text"
						      placeholder="Email Address"
						      onChange={this.handleEmailChange}
					      />
					      <Autosuggest
		      				suggestions={this.state.brokerageOptions}
		      				onSuggestionsFetchRequested={this.getBrokerages}
		      				onSuggestionsClearRequested={() => this.setState({brokerageOptions: []})}
		      				getSuggestionValue={this.getBrokerageSuggestionValue}
		      				renderSuggestion={this.renderBrokerageSuggestion}
		      				onSuggestionSelected={this.onSuggestionSelected}
		      				renderInputComponent={this.renderInputComponent}
		      				inputProps={{
		      					value: this.state.brokerage,
		      					placeholder: 'Brokerage',
		    						onChange: this.onChange
		    					}}
	    					/>
					      <button
					      	onClick={this.handleRegisterClick}
					      	disabled={this.state.password === '' || this.state.emailValue === '' || this.state.firstName === '' || this.state.lastName === ''}
					      >
					      	Create broker account
					      </button>
					    </div>
					  </div>
					  {this.state.redirect && 
					  	<Redirect
					  		to={
					  			{
					  			pathname: '/',
					  			state: {isLoggedIn: true}
					  			}
					  		}
					  		loggedIn={true}
					  	/>
						}
					</div>
				)}
			/>
		);
	}
}

export default BrokerRegistration;
