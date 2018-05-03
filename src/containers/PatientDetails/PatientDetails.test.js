import React from 'react';
import ReactDOM from 'react-dom';
import PatientDetails from './PatientDetails';
import { MemoryRouter as Router, Route} from "react-router-dom";

it('renders PatientDetails without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Router initialEntries={["/patients/55"]}>
  <div> 
    <Route path="/patients/:id" component={PatientDetails} />
  </div>
  </Router>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
