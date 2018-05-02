import React from 'react';
import ReactDOM from 'react-dom';
import GenericList from './GenericList';

it('renders GenericList without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GenericList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
