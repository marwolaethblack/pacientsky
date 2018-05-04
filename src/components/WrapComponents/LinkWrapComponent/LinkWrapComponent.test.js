import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import LinkWrapComponent from './LinkWrapComponent';


it('renders LinkWrapComponent without crashing', () => {
  const div = document.createElement('div');
  let Lwc = LinkWrapComponent("/patients")
  ReactDOM.render(<Router><div><Lwc id="1">Hello</Lwc></div></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

