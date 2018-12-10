import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

export default function initStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware  = createSagaMiddleware();
  const middleWare      = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store           = createStore(rootReducer, middleWare);

  sagaMiddleware.run(rootSaga);
  return store;
}