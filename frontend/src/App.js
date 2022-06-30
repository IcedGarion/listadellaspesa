import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ElementList from './ElementList';
import ElementEdit from "./ElementEdit";

class App extends Component {
  render() {
      return (
          <Router forceRefresh={true}>
              <Switch>
                  <Route exact path='/' component={Home} target={Home}/>
                  <Route exact path='/lista' component={ElementList}/>
                  <Route exact path='/lista/:id' component={ElementEdit}/>
              </Switch>
          </Router>
      )
  }
}

export default App;