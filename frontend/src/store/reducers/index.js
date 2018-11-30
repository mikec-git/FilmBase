import { combineReducers } from 'redux';
import appReducer from './AppReducer';
import moviesReducer from './MoviesReducer';
import tvReducer from './TVReducer';

export default combineReducers(
  {
    movies: moviesReducer,
    tv: tvReducer,
    app: appReducer
  }
);