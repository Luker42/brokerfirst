import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './js/Home';
import BrokerOverview from './js/BrokerOverview';
import BrokerView from './js/BrokerView'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/" component={BrokerOverview} />
          <Route path="/search/:neighborhoods" component={BrokerOverview} />
          <Route exact path="/broker/:brokerId" component={BrokerView} />
        </div>
      </Router>
    );
  }
}

export default App;
