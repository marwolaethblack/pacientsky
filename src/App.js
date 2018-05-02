import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Patients from './containers/Patients/Patients';
import Medicine from './containers/Medicine/Medicine';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        Hello
        <Route exact path="/" component={Patients} />
        <Route path="/medicine" component={Medicine} />
        </div>
      </Router>
    );
  }
}

export default App;
