import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  movies: null,
  nowPlayingMovies: null,
  translateSlide: 0,
  currentMovieDetails: null,
  showLength: null
};

// =========================== //
//   FETCHING MOVIES FROM API  //
// =========================== //
const fetchMoviesStart = (state, action) => {
  return { ...state, loading: true };
};

const fetchMoviesInitSuccess = (state, action) => {
  return { ...state, nowPlayingMovies: action.fetchedNowPlaying, showLength: action.showLength, loading: false };
};

const fetchMoviesInitFail = (state, action) => {
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
  const updatedTranslateSlide = -newActiveIndex * action.element.offsetWidth;

  return { ...state, nowPlayingMovies: updatedNowPlayingMovies, translateSlide: updatedTranslateSlide };
};

const changeCarouselMovieArrow = (state, action) => {
  const activeIndex = state.nowPlayingMovies.findIndex(movie => movie.active);
  
  let newActiveIndex = null;
  let updatedTranslateSlide = state.translateSlide;
  if(action.arrowDirection === 'left') {
    if(activeIndex - 1 >= 0) {
      newActiveIndex = activeIndex - 1;
      updatedTranslateSlide += action.element.offsetWidth;
    } else {
      newActiveIndex = state.showLength-1;
      updatedTranslateSlide = action.element.offsetWidth * -(state.showLength-1);
    }
  } else {
    if(activeIndex + 1 < state.showLength) {
      newActiveIndex = activeIndex + 1;
      updatedTranslateSlide -= action.element.offsetWidth;
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
  const newTranslateSlide = -action.element.offsetWidth * activeIndex;
  return { ...state, translateSlide: newTranslateSlide };
};


// =========================== //
//           REDUCER           //
// =========================== //
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MOVIES_START: return fetchMoviesStart(state, action);
    case actionTypes.FETCH_MOVIES_INIT_SUCCESS: return fetchMoviesInitSuccess(state, action);
    case actionTypes.FETCH_MOVIES_INIT_FAIL: return fetchMoviesInitFail(state, action);
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