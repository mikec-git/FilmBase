import * as actionTypes from './actionTypes';

// ================================= //
//    FETCHING NOW PLAYING MOVIES    //
// ================================= //
export const fetchNowPlayingMovies = () => {
  return { type: actionTypes.FETCH_NOW_PLAYING_MOVIES };
}

export const fetchNowPlayingSuccess = (fetchedNowPlaying) => {
  return { type: actionTypes.FETCH_NOW_PLAYING_SUCCESS, fetchedNowPlaying };
}

export const fetchNowPlayingFail = (error) => {
  return { type: actionTypes.FETCH_NOW_PLAYING_FAIL, error };
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

