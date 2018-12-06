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
  searchString: {},
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
  const { listLength, imgConfig, movieGenres, showPage } = action;
  return { ...state, loadingInit: true, listLength, imgConfig, movieGenres, showPage };
};

const fetchMoviesInitSuccess = (state, action) => {
  const { fetchedMovies, hasLooped, loopAgain, page, searchString } = action,
        {imgConfig, movieGenres} = state;
        
  const movies  = {},
        maxPage = {
    nowPlaying: fetchedMovies['nowPlaying'].total_pages,
    upcoming: fetchedMovies['upcoming'].total_pages,
    popular: fetchedMovies['popular'].total_pages };

  let nowPlaying  = null,
      upcoming    = null,
      popular     = null,
      baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 3),
      baseUrlPoster   = u.getBaseUrl(imgConfig, 'poster', 1),
      baseUrl         = [baseUrlBackdrop, baseUrlPoster];

  // Extracting relevant data
  if(!hasLooped || loopAgain['nowPlaying']) {
    nowPlaying = u.filterByVideoData(fetchedMovies['nowPlaying'].results, 'langImg');
    movies.nowPlaying = u.updateCategory('Now Playing', u.updateInitData(nowPlaying, baseUrl, movieGenres));
    if(loopAgain['nowPlaying']) {
      movies.nowPlaying.videos = state.movies.nowPlaying.videos.concat(movies.nowPlaying.videos);
    }
  }

  if(!hasLooped || loopAgain['upcoming']) {
    upcoming = u.filterByVideoData(fetchedMovies['upcoming'].results, 'langImg');
    movies.upcoming = u.updateCategory('Upcoming', u.updateInitData(upcoming, baseUrl));
    if(loopAgain['upcoming']) {
      movies.upcoming.videos = state.movies.upcoming.videos.concat(movies.upcoming.videos);
    }
  }

  if(!hasLooped || loopAgain['popular']) {
    popular = u.filterByVideoData(fetchedMovies['popular'].results, 'langImg');
    movies.popular = u.updateCategory('Popular', u.updateInitData(popular, baseUrl))
    if(loopAgain['popular']) {
      movies.popular.videos = state.movies.popular.videos.concat(movies.popular.videos);
    }
  }
  
  if(hasLooped) {
    return { 
      ...state, page, maxPage, loadingInit: false, searchString,
      movies: {...state.movies, ...movies}};
  } 
  if(!hasLooped) {
    return { ...state, page, maxPage, loadingInit: false, movies, searchString };
  }
};

const fetchMoviesInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// =========================== //
//       CHANGE MOVIE LIST     //
// =========================== //
const changeMovieListStart = (state, action) => {
  const { direction, hasLooped, category } = action;
  let   { maxPage, listLength, } = state;
  
  let page          = {...state.page},
      movies        = {...state.movies},
      showPage      = {...state.showPage},
      searchString  = {...state.searchString};
  
  if(direction === 'left' && showPage[category] > 1) {
    showPage[category]--;
  } else if(direction === 'right') {
    const sliceStart  = showPage[category] * listLength,
          sliceEnd    = (showPage[category]+1) * listLength;

    if(!hasLooped && movies[category].videos.slice(sliceStart, sliceEnd).length >= 0) {
      showPage[category]++;
    }
    if(page[category] < maxPage[category] && (movies[category].videos.slice(sliceStart, sliceEnd).length < listLength)) {
      page[category]++;
      searchString[category] = searchString[category].replace(/page=\d+(?=&?)/g, `page=${page[category]}`);
    } 
  }

  return { ...state, 
    page: { ...state.page, ...page }, 
    showPage: { ...state.showPage, ...showPage }, 
    searchString: { ...state.searchString, ...searchString }, 
    loading: true };
}

const changeMovieListSuccess = (state, action) => {
  const { direction, category, newData: newDataAction } = action;
  const { imgConfig, movies } = state;

  if(direction === 'left' || newDataAction === -1) {
    return { ...state, loading: false };
  }

  const newData       = newDataAction.results,
        baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];  

  let updatedResults = u.filterByVideoData(newData, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);

  let combinedResults     = movies[category].videos.concat(updatedResults),
      noDuplicateResults  = u.removeDuplicateById(combinedResults);
      
  return { 
    ...state, 
    movies: {
      ...movies,
      [category]: {
        ...movies[category],
        videos: noDuplicateResults
      }
    }, 
    loading: false };
}

const changeMovieListFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
}

// =========================== //
//   FETCHING MOVIE DETAILS    //
// =========================== //
const getMovieDetailsStart = (state, action) => {
  return { ...state, loadingDetails: true };
}

const getMovieDetailsSuccess = (state, action) => {
  const { 
    videos: videoResult, 
    credits: creditResult, 
    details, 
    reviews: reviewResult } = action.fetchedDetails;  
  const { imgConfig } = state,
        videos    = u.filterByVideoData(videoResult.results, 'videoSite'),
        cast      = u.extractUpTo(creditResult.cast, 11),
        crew      = u.extractUpTo(creditResult.crew, 11),
        reviews   = reviewResult.results;
        
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
  return { ...state, currentMovieDetails: {} }
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
  [actionTypes.CHANGE_MOVIE_LIST_START]: changeMovieListStart,
  [actionTypes.CHANGE_MOVIE_LIST_SUCCESS]: changeMovieListSuccess,
  [actionTypes.CHANGE_MOVIE_LIST_FAIL]: changeMovieListFail,  
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