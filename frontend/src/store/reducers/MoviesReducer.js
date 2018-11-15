import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  movies: null,
  nowPlayingMovies: null
};

// FETCHING MOVIES FROM MOVIE DB API
const fetchMoviesStart = (state, action) => {
  return { ...state, loading: true };
};

const fetchNowPlayingSuccess = (state, action) => {
  return { ...state, nowPlayingMovies: action.fetchedNowPlaying, loading: false };
};

const fetchNowPlayingFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// CHANGING CAROUSEL MOVIE 
const updateCarouselMovieState = (state, activeIndex, newActiveIndex) => {
  let updatedState              = [...state.nowPlayingMovies];
  updatedState[activeIndex]     = { ...updatedState[activeIndex], active: false };
  updatedState[newActiveIndex]  = { ...updatedState[newActiveIndex], active: true };
  return updatedState;
}

const changeCarouselMovie = (state, action) => {
  const activeIndex     = state.nowPlayingMovies.findIndex(movie => movie.active);
  const newActiveIndex  = state.nowPlayingMovies.findIndex(movie => movie.id === action.movieId);

  const updatedNowPlayingMovies = updateCarouselMovieState(state, activeIndex, newActiveIndex);
  
  return { ...state, nowPlayingMovies: updatedNowPlayingMovies };
};

const changeCarouselMovieArrow = (state, action) => {
  const activeIndex = state.nowPlayingMovies.findIndex(movie => movie.active);
  
  let newActiveIndex = null;
  if(action.arrowDirection === 'left') {
    newActiveIndex = activeIndex - 1 >= 0 ? 
      activeIndex - 1 : state.nowPlayingMovies.length-1;
  } else {
    newActiveIndex = activeIndex + 1 < state.nowPlayingMovies.length ? 
      activeIndex + 1 : 0;
  }

  const updatedNowPlayingMovies = updateCarouselMovieState(state, activeIndex, newActiveIndex);
  
  return { ...state, nowPlayingMovies: updatedNowPlayingMovies };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state,action);
    case actionTypes.FETCH_NOW_PLAYING_SUCCESS: return fetchNowPlayingSuccess(state,action);
    case actionTypes.FETCH_NOW_PLAYING_FAIL: return fetchNowPlayingFail(state,action);
    case actionTypes.CHANGE_CAROUSEL_MOVIE: return changeCarouselMovie(state,action);
    case actionTypes.CHANGE_CAROUSEL_MOVIE_ARROW: return changeCarouselMovieArrow(state,action);
    default: return state;
  }
}

export default reducer;