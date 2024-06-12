
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from '../imports/ui/App';
import './main.css';

Meteor.startup(() => {
  const container = document.getElementById('render-target');
  const root = ReactDOM.createRoot(container); // Use createRoot
  root.render(<App />);
});