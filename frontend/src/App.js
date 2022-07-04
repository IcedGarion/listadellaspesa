import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ElementList from './ElementList';

class App extends Component {
  render() {
      return (
          <Router forceRefresh={true}>
              <Switch>
                  <Route exact path='/' component={ElementList}>
                      <Redirect to="/lista" />
                  </Route>
                  <Route exact path='/lista' component={ElementList}/>
              </Switch>
          </Router>
      )
  }
}

export default App;