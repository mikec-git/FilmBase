import * as actionTypes from '../actions/actionTypes';
import createReducer from './CreateReducer';

const initialState = {
  imgConfig: null,
  movieGenres: null,
  tvGenres: null,
  error: null,
  loading: false,
  initLoaded: false
};

const fetchConfigInitStart = (state, action) => {
  return { ...state, loading: true };
}

const fetchConfigInitSuccess = (state, action) => {
  const imgConfig   = action.configData[0],
        movieGenres = action.configData[1],
        tvGenres    = action.configData[2];
  return { ...state, imgConfig, movieGenres, tvGenres, loading: false, initLoaded: true };
};

const fetchConfigInitFail = (state, action) => {
  return { ...state, error: action.error, loading: false }
};

const reducer = createReducer(initialState, {
  [actionTypes.FETCH_CONFIG_INIT_START]: fetchConfigInitStart,
  [actionTypes.FETCH_CONFIG_INIT_SUCCESS]: fetchConfigInitSuccess,
  [actionTypes.FETCH_CONFIG_INIT_FAIL]: fetchConfigInitFail,
});

export default reducer;