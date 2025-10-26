// Import React and ReactDOM to render the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App.jsx';

// Import global CSS styles
import './index.css';

// Import Provider from react-redux to connect Redux with React
import { Provider } from 'react-redux';

// Import the Redux store configured in store.js
import store from './store.js';

// Render the React app into the root HTML element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
