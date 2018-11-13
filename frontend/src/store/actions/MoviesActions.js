import * as actionTypes from './actionTypes';

export const fetchNowPlayingMovies = () => {
  return { type: actionTypes.FETCH_NOW_PLAYING_MOVIES };
}

export const fetchNowPlayingSuccess = (fetchedNowPlaying) => {
  return { type: actionTypes.FETCH_NOW_PLAYING_SUCCESS, fetchedNowPlaying };
}

export const fetchNowPlayingFail = (error) => {
  return { type: actionTypes.FETCH_NOW_PLAYING_FAIL, error };
}

export const fetchMoviesStart = () => {
  return { type: actionTypes.FETCH_MOVIES_START };
}