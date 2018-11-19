import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { fetchNowPlayingMoviesSaga, getMovieDetailsSaga } from './MoviesSaga';

export function* watchMovies() {
  yield all ([
    takeEvery(actionTypes.FETCH_NOW_PLAYING_MOVIES, fetchNowPlayingMoviesSaga),
    takeEvery(actionTypes.GET_MOVIE_DETAILS, getMovieDetailsSaga)
  ])
}

