import React from 'react';
import ReactDOM from 'react-dom';
import GenericForm from './GenericForm';

it('renders GenericForm without crashing', () => {
  const div = document.createElement('div');
  const config = [
      {
          property: 'firstName',
          label: 'First Name:',
          input: {
              type: 'text',
              placeholder: 'Your name'
          }
      }
    ];
  ReactDOM.render(<GenericForm config={config}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
