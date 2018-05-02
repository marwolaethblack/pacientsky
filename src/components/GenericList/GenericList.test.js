import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import GenericList from './GenericList';
import LinkWrapComponent from '../LinkWrapComponent/LinkWrapComponent';


it('renders GenericList without crashing', () => {
  const div = document.createElement('div');
  const list = [{name: "bob", age: 20, id: 5}, {name: "Ben", age: 55, id:6}]
  const propertiesToDisplay = ["name"]
  ReactDOM.render(<Router><div><GenericList list={list} propertiesToDisplay={propertiesToDisplay}/></div></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders GenericList with LinkWrapComponent without crashing', () => {
  const div = document.createElement('div');
  const list = [{name: "bob", age: 20, id: 5}, {name: "Ben", age: 55, id:6}]
  const propertiesToDisplay = ["name"]
  const Lwc = LinkWrapComponent("/patients")
  ReactDOM.render(<Router><div><GenericList list={list} propertiesToDisplay={propertiesToDisplay}  wrapComponent={Lwc}/> </div></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});