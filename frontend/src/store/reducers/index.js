import { combineReducers } from 'redux';
import appReducer from './AppReducer';
import moviesReducer from './MoviesReducer';

export default combineReducers(
  {
    movies: moviesReducer,
    app: appReducer
  }
);