import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';

it('renders SearchResults without crashing', () => {
  const div = document.createElement('div');
  const results = [{ name: "bob", id:45}];
  ReactDOM.render(<SearchResults results={results} visible={true}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
