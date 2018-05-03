import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from './Header';


it('renders Header without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><div><Header /></div></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

