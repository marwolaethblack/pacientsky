import React from 'react';
import ReactDOM from 'react-dom';
import GenericButton from './GenericButton';


it('renders GenericButton without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GenericButton onClick={e => console.log("hello")}> Button </GenericButton>, div);
  ReactDOM.unmountComponentAtNode(div);
});




