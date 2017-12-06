import React, { Component} from 'react';
import Header from './Header';
//import PropTypes from 'prop-types';
import SocialIcons from 'react-social-icons';
import '../css/Page.css';

class Page extends Component { 

  static urls = [
    'http://facebook.com',
    'http://twitter.com',
    'http://linkedin.com'
  ];

  render() {
    return (
      <div className='page-container'>
        <Header />
        <div className='page-content'>
          {this.props.pageContent}
        </div>
        <div className='footer'>
          <div className='footer-left'>
            <div className='footer-left-content'>
              &copy; 2017 BrokerFirst
            </div>
          </div>
          <div className='footer-center'>
            <div className='footer-center-content'>
              <SocialIcons
                  urls={this.urls}
                  color='black'
                />
            </div>
          </div>
          <div className='footer-right'>
            <div className='footer-right-content'>
              <ul className='footer-bar'>
                <li className='footer-bar-element'>
                  <a className='footer-bar-element-link' href=''>Brokers</a>
                </li>
                <li className='footer-bar-element'>
                  <a className='footer-bar-element-link' href=''>Neighborhoods</a>
                </li>
                <li className='footer-bar-element'>
                  <a className='footer-bar-element-link' href=''>About</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Page.PropTypes = {
//   'pageContent': PropTypes.Element
// };

export default Page;