import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  movies: [],
  nowPlayingMovies: []
}

const fetchMoviesStart = (state, action) => {
  return { ...state, loading: true };
}

const fetchNowPlayingSuccess = (state, action) => {
  return { ...state, nowPlayingMovies: action.fetchedNowPlaying, loading: false };
}

const fetchNowPlayingFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
}


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state,action);
    case actionTypes.FETCH_NOW_PLAYING_SUCCESS: return fetchNowPlayingSuccess(state,action);
    case actionTypes.FETCH_NOW_PLAYING_FAIL: return fetchNowPlayingFail(state,action);
    default: return state;
  }
}

export default reducer;