import { combineReducers } from 'redux';
import appReducer from './AppReducer';
import moviesReducer from './MoviesReducer';
import searchReducer from './SearchReducer';
import discoverReducer from './DiscoverReducer';
import tvReducer from './TVReducer';

export default combineReducers(
  {
    movies: moviesReducer,
    tv: tvReducer,
    search: searchReducer,
    discover: discoverReducer,
    app: appReducer
  }
);