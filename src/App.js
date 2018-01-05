import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import login_helper from './js/login_helper';
import Home from './js/Home';
import BrokerOverview from './js/BrokerOverview';
import BrokerView from './js/BrokerView';
import BrokerRegistration from './js/BrokerRegistration';
import Login from './js/Login';

class App extends Component {
  state = {
    isLoggedIn: !!(localStorage.token && localStorage.user_id)
  }

  handleLoginClick = (emailValue, password) => {
    axios.get('http://localhost:8888/login.php', {
      params: {
        email: emailValue,
        password: password

      }
    }).then((response) => {
      if (response.data) {
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        this.setState({isLoggedIn: true});
      }
    }).catch((error) => {
      alert('Login Error');
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Home isLoggedIn={this.state.isLoggedIn}/>} />
          <Route exact path="/search/" component={BrokerOverview} />
          <Route path="/search/:neighborhoods" component={BrokerOverview} />
          <Route exact path="/broker/:brokerId" component={BrokerView} />
          <Route path="/login" render={() =>
              <Login
                handleLoginClick={this.handleLoginClick}
              />
            }
          />
          <Route exact path="/broker_registration" component={BrokerRegistration} />
        </div>
      </Router>
    );
  }
}

export default App;
