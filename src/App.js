import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './less/index.css';

import Header from './components/Layout/Header/Header';
import Patients from './containers/Patients/Patients';
import Medicine from './containers/Medicine/Medicine';
import PatientDetails from './containers/PatientDetails/PatientDetails';
import CreatePatient from './containers/CreatePatient/CreatePatient';

class App extends Component {
  render() {
    return (
        <div className="flex-column-center">
          <Header />
          <Route exact path="/" component={Patients} />
          <Route path="/medicine" component={Medicine} />
          <Route exact path="/patients/create" component={CreatePatient} />
          <Route path="/patients/:id/details" component={PatientDetails} />
        </div>
    );
  }
}

export default App;
