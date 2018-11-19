import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  movies: null,
  nowPlayingMovies: null,
  translateSlide: 0,
  currentMovieDetails: null
};

// =========================== //
//   FETCHING MOVIES FROM API  //
// =========================== //
const fetchMoviesStart = (state, action) => {
  return { ...state, loading: true };
};

const fetchNowPlayingSuccess = (state, action) => {
  return { ...state, nowPlayingMovies: action.fetchedNowPlaying, loading: false };
};

const fetchNowPlayingFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const getMovieDetailsSuccess = (state, action) => {
  return { ...state, loading: false, currentMovieDetails: action.details };
};

const getMovieDetailsFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const clearMovieDetails = (state, action) => {
  return { ...state, currentMovieDetails: null }
}

// =========================== //
//           CAROUSEL          //
// =========================== // 
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
  const updatedTranslateSlide = -newActiveIndex * action.element.clientWidth;

  return { ...state, nowPlayingMovies: updatedNowPlayingMovies, translateSlide: updatedTranslateSlide };
};

const changeCarouselMovieArrow = (state, action) => {
  const activeIndex = state.nowPlayingMovies.findIndex(movie => movie.active);
  
  let newActiveIndex = null;
  let updatedTranslateSlide = state.translateSlide;
  if(action.arrowDirection === 'left') {
    if(activeIndex - 1 >= 0) {
      newActiveIndex = activeIndex - 1;
      updatedTranslateSlide += action.element.clientWidth;
    } else {
      newActiveIndex = state.nowPlayingMovies.length-1;
      updatedTranslateSlide = action.element.clientWidth * -(state.nowPlayingMovies.length-1);
    }
  } else {
    if(activeIndex + 1 < state.nowPlayingMovies.length) {
      newActiveIndex = activeIndex + 1;
      updatedTranslateSlide -= action.element.clientWidth;
    } else {
      newActiveIndex = 0;
      updatedTranslateSlide = 0;
    }
  }

  const updatedNowPlayingMovies = updateCarouselMovieState(state, activeIndex, newActiveIndex);
  
  return { ...state, nowPlayingMovies: updatedNowPlayingMovies, translateSlide: updatedTranslateSlide };
};

const resizeCarouselSlide = (state, action) => {
  const activeIndex = state.nowPlayingMovies.findIndex(movie => movie.active);
  const newTranslateSlide = -action.element.clientWidth * activeIndex;
  return { ...state, translateSlide: newTranslateSlide };
};


// =========================== //
//           REDUCER           //
// =========================== //
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state, action);
    case actionTypes.FETCH_NOW_PLAYING_SUCCESS: return fetchNowPlayingSuccess(state, action);
    case actionTypes.FETCH_NOW_PLAYING_FAIL: return fetchNowPlayingFail(state, action);
    case actionTypes.CHANGE_CAROUSEL_MOVIE: return changeCarouselMovie(state, action);
    case actionTypes.CHANGE_CAROUSEL_MOVIE_ARROW: return changeCarouselMovieArrow(state, action);
    case actionTypes.RESIZE_CAROUSEL_SLIDE: return resizeCarouselSlide(state, action);
    case actionTypes.GET_MOVIE_DETAILS_SUCCESS: return getMovieDetailsSuccess(state, action);
    case actionTypes.GET_MOVIE_DETAILS_FAIL: return getMovieDetailsFail(state, action);
    case actionTypes.CLEAR_MOVIE_DETAILS: return clearMovieDetails(state, action);
    default: return state;
  }
}

export default reducer;