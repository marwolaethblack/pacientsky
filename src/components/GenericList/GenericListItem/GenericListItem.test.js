import React from 'react';
import ReactDOM from 'react-dom';
import GenericListItem from './GenericListItem';

it('renders GenericListItem without crashing', () => {
  const div = document.createElement('div');
  const item = { name: "bob", id:45};
  const propertiesToDisplay = ["name"]
  ReactDOM.render(<GenericListItem item={item} propertiesToDisplay={propertiesToDisplay}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
