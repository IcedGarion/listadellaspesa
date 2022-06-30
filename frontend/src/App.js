import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ElementList from './ElementList';
import ElementEdit from "./ElementEdit";
import Redirect from "react-router-dom/es/Redirect";

class App extends Component {
  render() {
      return (
          <Router forceRefresh={true}>
              <Switch>
                  <Route exact path='/' component={ElementList}>
                      <Redirect to="/lista" />
                  </Route>
                  <Route exact path='/lista' component={ElementList}/>
                  <Route exact path='/lista/:id' component={ElementEdit}/>
              </Switch>
          </Router>
      )
  }
}

export default App;