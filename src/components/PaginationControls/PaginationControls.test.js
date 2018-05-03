import React from 'react';
import ReactDOM from 'react-dom';
import PaginationControls from './PaginationControls';


it('renders PaginationControls without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PaginationControls maxPages={10} currentPage={1} changePage={(p) => console.log(p)} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

