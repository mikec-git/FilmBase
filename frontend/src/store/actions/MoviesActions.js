import * as actionTypes from './actionTypes';

// ================================= //
//        FETCHING MOVIES INIT       //
// ================================= //
export const fetchMoviesInit = () => {
  return { type: actionTypes.FETCH_MOVIES_INIT };
}

export const fetchMoviesInitSuccess = (fetchedNowPlaying, showLength) => {
  return { type: actionTypes.FETCH_MOVIES_INIT_SUCCESS, fetchedNowPlaying, showLength };
}

export const fetchMoviesInitFail = (error) => {
  return { type: actionTypes.FETCH_MOVIES_INIT_FAIL, error };
}

// ================================= //
//           MOVIES GENERAL          //
// ================================= //
export const fetchMoviesStart = () => {
  return { type: actionTypes.FETCH_MOVIES_START };
}

export const getMovieDetails = (movieId) => {
  return { type: actionTypes.GET_MOVIE_DETAILS, movieId }
}

export const getMovieDetailsSuccess = (details) => {
  return { type: actionTypes.GET_MOVIE_DETAILS_SUCCESS, details }
}

export const getMovieDetailsFail = (error) => {
  return { type: actionTypes.GET_MOVIE_DETAILS_FAIL, error }
}

export const clearMovieDetails = () => {
  return { type: actionTypes.CLEAR_MOVIE_DETAILS }
}

// ================================= //
//              CAROUSEL             //
// ================================= //
export const changeCarouselMovie = (movieId, element) => {
  return { type: actionTypes.CHANGE_CAROUSEL_MOVIE, movieId, element };
}

export const changeCarouselMovieArrow = (arrowDirection, element) => {
  return { type: actionTypes.CHANGE_CAROUSEL_MOVIE_ARROW, arrowDirection, element };
}

export const resizeCarouselSlide = (element) => {
  return { type: actionTypes.RESIZE_CAROUSEL_SLIDE, element };
}

