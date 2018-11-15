import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import moviesReducer from './store/reducers/MoviesReducer';
import { watchMovies } from './store/sagas/index';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware  = createSagaMiddleware();
const middleWare      = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

const rootReducer = combineReducers({
  movies: moviesReducer
});

const store = createStore(rootReducer, middleWare);

sagaMiddleware.run(watchMovies);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
