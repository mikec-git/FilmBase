import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility';

const initialState = {
  loading: false,
  initLoaded: false,
  error: null,
  nowPlayingMovies: null,
  upcomingMovies: null,
  popularMovies: null,
  currentMovieDetails: null,
  translateSlide: 0,
  showLength: 7,
  listLength: 18
};

// =========================== //
//   FETCHING MOVIES FROM API  //
// =========================== //
const fetchMoviesStart = (state, action) => {
  return { ...state, loading: true };
};

const fetchMoviesInitSuccess = (state, action) => {
  // Extracting relevant data
  const nowPlaying  = u.filterData(action.fetchedMovies['nowPlaying'].results, 'langImg'),
        upcoming    = u.filterData(action.fetchedMovies['upcoming'].results, 'langImg'),
        popular     = u.filterData(action.fetchedMovies['popular'].results, 'langImg'),
        imgConfig   = action.configAndGenres['imgConfig'],
        movieGenres = action.configAndGenres['movieGenres'];

  // Getting base url for backdrop images
  let baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 3),
      baseUrlPoster   = u.getBaseUrl(imgConfig, 'poster', 1),
      baseUrl         = [baseUrlBackdrop, baseUrlPoster];
      
  const nowPlayingMovies = u.updatedInitData(nowPlaying, baseUrl, movieGenres),
        upcomingMovies   = u.updatedInitData(upcoming, baseUrl),
        popularMovies    = u.updatedInitData(popular, baseUrl);

  return { ...state, nowPlayingMovies, upcomingMovies, popularMovies, loading: false, initLoaded: true };
};

const fetchMoviesInitFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const getMovieDetailsSuccess = (state, action) => {
  const imgConfig = action.config,
        videos    = u.filterData(action.fetchedDetails['videos'].results, 'videoSite'),
        cast      = u.extractUpTo(action.fetchedDetails['credits'].cast, 11),
        crew      = u.extractUpTo(action.fetchedDetails['credits'].crew, 11),
        details   = action.fetchedDetails['details'],
        reviews   = action.fetchedDetails['reviews'].results;

  const baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 0),
        baseUrlProfile  = u.getBaseUrl(imgConfig, 'poster', 1);
  
  u.sortVideoType(videos);
  u.getProfilePath(cast, baseUrlProfile);
  u.getProfilePath(crew, baseUrlProfile);
  
  const currentMovieDetails = {
    ...details, videos, cast, crew, reviews,
    backdrop_path: baseUrlBackdrop.concat(details.backdrop_path)
  };
    
  return { ...state, currentMovieDetails, loading: false };
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
const changeCarouselMovie = (state, action) => {
  const activeIndex     = state.nowPlayingMovies.findIndex(movie => movie.active);
  const newActiveIndex  = state.nowPlayingMovies.findIndex(movie => movie.id === action.movieId);

  const updatedNowPlayingMovies = u.updateCarouselMovieState(state, activeIndex, newActiveIndex);
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

  const updatedNowPlayingMovies = u.updateCarouselMovieState(state, activeIndex, newActiveIndex);
  
  return { ...state, nowPlayingMovies: updatedNowPlayingMovies, translateSlide: updatedTranslateSlide };
};

const resizeCarouselSlide = (state, action) => {
  const activeIndex       = state.nowPlayingMovies.findIndex(movie => movie.active);
  const newTranslateSlide = -action.element.offsetWidth * activeIndex;
  return { ...state, translateSlide: newTranslateSlide };
};

// =========================== //
//           REDUCER           //
// =========================== //
const reducer = u.createReducer(initialState, {
  [actionTypes.FETCH_MOVIES_START]: fetchMoviesStart,
  [actionTypes.FETCH_MOVIES_INIT_SUCCESS]: fetchMoviesInitSuccess,
  [actionTypes.FETCH_MOVIES_INIT_FAIL]: fetchMoviesInitFail,
  [actionTypes.CHANGE_CAROUSEL_MOVIE]: changeCarouselMovie,
  [actionTypes.CHANGE_CAROUSEL_MOVIE_ARROW]: changeCarouselMovieArrow,
  [actionTypes.RESIZE_CAROUSEL_SLIDE]: resizeCarouselSlide,
  [actionTypes.GET_MOVIE_DETAILS_SUCCESS]: getMovieDetailsSuccess,
  [actionTypes.GET_MOVIE_DETAILS_FAIL]: getMovieDetailsFail,
  [actionTypes.CLEAR_MOVIE_DETAILS]: clearMovieDetails
});

export default reducer;