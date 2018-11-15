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

// ================================= //
//              CAROUSEL             //
// ================================= //
export const changeCarouselMovie = (movieId) => {
  return { type: actionTypes.CHANGE_CAROUSEL_MOVIE, movieId };
}

export const changeCarouselMovieArrow = (arrowDirection) => {
  return { type: actionTypes.CHANGE_CAROUSEL_MOVIE_ARROW, arrowDirection };
}