import * as actionTypes from '../actions/actionTypes';
import createReducer from './CreateReducer';

const initialState = {
  loading: false,
  error: null,
  nowPlayingMovies: null,
  upcomingMovies: null,
  popularMovies: null,
  currentMovieDetails: null,
  translateSlide: 0,
  showLength: 7
};

// =========================== //
//   FETCHING MOVIES FROM API  //
// =========================== //
const fetchMoviesStart = (state, action) => {
  return { ...state, loading: true };
};

const fetchMoviesInitSuccess = (state, action) => {
  // Extracting relevant data
  const nowPlaying  = filterData(action.fetchedMovies['nowPlaying'].results, 'langImg'),
        upcoming    = filterData(action.fetchedMovies['upcoming'].results, 'langImg'),
        popular     = filterData(action.fetchedMovies['popular'].results, 'langImg'),
        imgConfig   = action.configAndGenres['imgConfig'],
        movieGenres = action.configAndGenres['movieGenres'];

  // Getting base url for backdrop images
  let baseUrlBackdrop = imgConfig.secure_base_url + imgConfig.backdrop_sizes[3],
      baseUrlPoster   = imgConfig.secure_base_url + imgConfig.poster_sizes[1],
      baseUrl         = [baseUrlBackdrop, baseUrlPoster];

  const nowPlayingMovies = [],
        upcomingMovies   = [],
        popularMovies    = [];

  pushUpdatedInitData(nowPlaying, nowPlayingMovies, baseUrl, true, movieGenres);
  pushUpdatedInitData(upcoming, upcomingMovies, baseUrl);
  pushUpdatedInitData(popular, popularMovies, baseUrl);
  nowPlayingMovies[0].active = true;

  return { ...state, nowPlayingMovies, upcomingMovies, popularMovies, loading: false };
};

const fetchMoviesInitFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

const getMovieDetailsSuccess = (state, action) => {
  const imgConfig = action.config,
        videos    = filterData(action.fetchedDetails['videos'].results, 'videoSite'),
        cast      = extractUpTo(action.fetchedDetails['credits'].cast, 11),
        crew      = extractUpTo(action.fetchedDetails['credits'].crew, 11),
        details   = action.fetchedDetails['details'],
        reviews   = action.fetchedDetails['reviews'].results;

  const baseUrlBackdrop = imgConfig.secure_base_url + imgConfig.backdrop_sizes[0];
  const baseUrlProfile  = imgConfig.secure_base_url + imgConfig.profile_sizes[1];
  
  sortVideoType(videos);
  getProfilePath(cast, baseUrlProfile);
  getProfilePath(crew, baseUrlProfile);
  
  const currentMovieDetails = {
    ...details, 
    videos, cast, crew, reviews,
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
const reducer = createReducer(initialState, {
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


// =========================== //
//     MOVIE FETCH UTILITY     //
// =========================== //
function pushUpdatedInitData(movies, updatedMovies, baseUrls, isCarousel, genres) {
  for(let movie of movies) {
    const genre = isCarousel ? 
      movie.genre_ids.map(id => genres.find(genre => genre.id === id).name) : null;

    updatedMovies.push({ 
      ...movie, 
      ...(isCarousel && {active: false, genre}), 
      backdrop_path: baseUrls[0].concat(movie.backdrop_path),
      poster_path: baseUrls[1].concat(movie.poster_path),
      vote_average: movie.vote_average.toFixed(1)
    });
  }
}

function filterData(data, type) {
  if(type === 'langImg') {
    return data.filter(movie => movie.backdrop_path && movie.original_language === 'en');
  } else if(type === 'videoSite') {
    return data.filter(video => video.site === 'YouTube');
  }
}

function extractUpTo(data, max) {
  return data.slice(0, max) || data;
}

function sortVideoType(videos) {
  videos.sort((a, b) => {
    let nameA = a.type.toLowerCase();
    let nameB = b.type.toLowerCase();
    return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
  });
}

function getProfilePath(staffData, baseUrl) {
  for (let i = 0; i < staffData.length; i++) {
    if(staffData[i].profile_path) {
      staffData[i].profile_path = baseUrl.concat(staffData[i].profile_path);
    }
  }
}