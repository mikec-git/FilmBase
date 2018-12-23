import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import initStore from './store/initStore';
import { LoadYoutube } from './shared/LoadYoutube';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import './index.scss';

window.addEventListener('DOMContentLoaded', LoadYoutube); 
const store = initStore();

const app = (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
// serviceWorker.unregister();