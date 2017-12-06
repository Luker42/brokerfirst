import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom';
import '../css/Header.css';

class Header extends Component {
  render() {
    return (
      <Headroom>
      	<div className='header-full'>
	        <div className='header'>
	        	<div className='header-logo'>
	        		<Link 
	        			to='/'
	        			className='header-logo-link'
	        		>
	        		Broker | First
	        		</Link>
	        	</div>
	        	<ul className='navigation'>
	        		<li className='navigation-element'>
	        			<Link
        					to='/search'
        					className='navigation-element-link'
	        			>
	        				Brokers
	        			</Link>
	        		</li>
	        		<li className='navigation-element'>
	        			<a className='navigation-element-link' href=''>Neighborhoods</a>
	        		</li>
	        		<li className='navigation-element'>
	        			<a className='navigation-element-link' href=''>About</a>
	        		</li>
	        		<li className='navigation-element'>
	        			<a className='navigation-element-link' href=''>Login</a>
	        		</li>
	        	</ul> 
	        </div>
      	</div>
      </Headroom>
    );
  }
}

export default Header;
