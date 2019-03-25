import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import 'antd/dist/antd.css';

import Main from './pages/Main';
import NoMatch from './pages/NoMatch';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
