import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/order
import store from './store';
import './index.css';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
