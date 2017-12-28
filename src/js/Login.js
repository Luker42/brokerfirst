import React, { Component } from 'react';
import axios from 'axios';
import Page from '../js/Page';
import { Redirect } from 'react-router-dom'
import '../css/Login.css';

class Login extends Component {
	state = {
		isLoggingIn: true,
		emailValue: '',
		password: '',
		redirect: false
	};

	handleEmailChange = (e) => {
		this.setState({emailValue: e.target.value});
	};

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	handleFormTypeChange = (e) => {
		e.preventDefault();
		this.setState(prevState => {
			return {
				isLoggingIn: !prevState.isLoggingIn
			};
		})
	}

	render() {
		return (
			<Page
				pageContent={(
					<div className='login-container'>
					  <div className="form">
					    {!this.state.isLoggingIn &&
						    <div className="register-form">
						      <input
						      	type="text"
						      	placeholder="Name"
						      />
						      <input type="password" placeholder="Password"/>
						      <input type="text" placeholder="Email Address"/>
						      <button
						      	onClick={this.handleRegisterClick}
						      	disabled={this.state.password === '' || this.state.emailValue === ''}
						      >
						      	Create
						      </button>
						      <p className="message">Already registered?&nbsp;
						      	<a 
						      		href=""
						      		onClick={this.handleFormTypeChange}
						      	>
						      		Sign In
						      	</a>
						      </p>
						    </div>
					  	}
					  	{this.state.isLoggingIn &&
						    <div className="login-form">
						      <input
						      	type="text"
						      	placeholder="Email"
						      	onChange={this.handleEmailChange}
						      	value={this.state.emailValue}
						      />
						      <input
						      	type="password"
						      	placeholder="Password"
						      	onChange={this.handlePasswordChange}
						      	value={this.state.password}
						      />
						      <button
						      	onClick={() => this.props.handleLoginClick(this.state.emailValue, this.state.password)}
						      	disabled={this.state.password === '' || this.state.emailValue === ''}
						      >
						      	Login
						      </button>
						      <p className="message">Not registered?&nbsp;
						      	<a
						      		href=""
						      		onClick={this.handleFormTypeChange}
						      	>
						      		Create an account
						      	</a>
						      </p>
						    </div>
					 		}
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

export default Login;
