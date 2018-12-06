import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {  
  imgConfig: null,
  movieGenres: null,
  listLength: null,
  loadingInit: false,
  loading: false,
  loadingDetails: false,
  movies: {},
  currentMovieDetails: {},
  page: null,
  maxPage: null,
  showPage: null,
  error: null,
  translateSlide: 0
};

// =========================== //
//   FETCHING MOVIES FROM API  //
// =========================== //
const fetchMoviesStart = (state, action) => {
  const { listLength, imgConfig, movieGenres } = action;
  return { ...state, loadingInit: true, listLength, imgConfig, movieGenres };
};

const fetchMoviesInitSuccess = (state, action) => {
  const { fetchedMovies }         = action;
  const {imgConfig, movieGenres}  = state;

  // Extracting relevant data
  const nowPlaying = u.filterByVideoData(fetchedMovies['nowPlaying'].results, 'langImg'),
        upcoming  = u.filterByVideoData(fetchedMovies['upcoming'].results, 'langImg'),
        popular   = u.filterByVideoData(fetchedMovies['popular'].results, 'langImg');

  // Getting base url for backdrop images
  let baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 3),
      baseUrlPoster   = u.getBaseUrl(imgConfig, 'poster', 1),
      baseUrl         = [baseUrlBackdrop, baseUrlPoster];

  const movies = {
    nowPlaying: u.updateCategory('Now Playing', u.updateInitData(nowPlaying, baseUrl, movieGenres)),
    upcoming: u.updateCategory('Upcoming', u.updateInitData(upcoming, baseUrl)),
    popular: u.updateCategory('Popular', u.updateInitData(popular, baseUrl))
  };

  return { ...state, movies, loadingInit: false };
};

const fetchMoviesInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// =========================== //
//   FETCHING MOVIE DETAILS    //
// =========================== //
const getMovieDetailsStart = (state, action) => {
  return { ...state, loadingDetails: true };
}

const getMovieDetailsSuccess = (state, action) => {
  const imgConfig = action.config,
        videos    = u.filterByVideoData(action.fetchedDetails['videos'].results, 'videoSite'),
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
    
  return { ...state, currentMovieDetails, loadingDetails: false };
};

const getMovieDetailsFail = (state, action) => {
  return { ...state, loadingDetails: false, error: action.error };
};

const clearMovieDetails = (state, action) => {
  return { ...state, currentMovieDetails: null }
}

const resetTranslateMovie = (state, action) => {
  return { ...state, translateSlide: 0 }
}

// =========================== //
//           CAROUSEL          //
// =========================== // 
const changeCarouselMovie = (state, action) => {
  const nowPlaying      = state.movies['nowPlaying'].videos;
  const activeIndex     = nowPlaying.findIndex(movie => movie.active);
  const newActiveIndex  = nowPlaying.findIndex(movie => movie.id === action.movieId);

  const updatedNowPlayingMovies = {
    ...state.movies['nowPlaying'],
    videos: u.updateCarouselState(nowPlaying, activeIndex, newActiveIndex)
  };
  const updatedTranslateSlide = -newActiveIndex * action.element.offsetWidth;

  return { 
    ...state, 
    movies: {...state.movies, nowPlaying: updatedNowPlayingMovies}, 
    translateSlide: updatedTranslateSlide };
};

const changeCarouselMovieArrow = (state, action) => {
  const nowPlaying  = state.movies['nowPlaying'].videos;
  const activeIndex = nowPlaying.findIndex(movie => movie.active);  
  
  const {newActiveIndex, updatedTranslateSlide} = u.updateIndexAndTranslation(action.arrowDirection, activeIndex, action.element, action.showLength);
  
  const updatedNowPlayingMovies = {
    ...state.movies['nowPlaying'],
    videos: u.updateCarouselState(nowPlaying, activeIndex, newActiveIndex)
  };
  
  return { 
    ...state, 
    movies: {...state.movies, nowPlaying: updatedNowPlayingMovies},
    translateSlide: updatedTranslateSlide };
};

const resizeCarouselSlide = (state, action) => {
  const activeIndex       = state.movies['nowPlaying'].videos.findIndex(movie => movie.active);
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
  [actionTypes.GET_MOVIE_DETAILS_START]: getMovieDetailsStart,
  [actionTypes.GET_MOVIE_DETAILS_SUCCESS]: getMovieDetailsSuccess,
  [actionTypes.GET_MOVIE_DETAILS_FAIL]: getMovieDetailsFail,
  [actionTypes.CLEAR_MOVIE_DETAILS]: clearMovieDetails,
  [actionTypes.RESET_TRANSLATE_MOVIE]: resetTranslateMovie
});

export default reducer;