import React from 'react';
import ReactDOM from 'react-dom';
import GenericList from './GenericList';

it('renders GenericList without crashing', () => {
  const div = document.createElement('div');
  const list = [{name: "bob", age: 20, id: 5}, {name: "Ben", age: 55, id:6}]
  const propertiesToDisplay = ["name"]
  ReactDOM.render(<GenericList list={list} propertiesToDisplay={propertiesToDisplay}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
