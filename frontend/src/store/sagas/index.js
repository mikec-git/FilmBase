import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { fetchMoviesInitSaga, getMovieDetailsSaga } from './MoviesSaga';

export function* watchMovies() {
  yield all ([
    takeEvery(actionTypes.FETCH_MOVIES_INIT, fetchMoviesInitSaga),
    takeEvery(actionTypes.GET_MOVIE_DETAILS, getMovieDetailsSaga)
  ])
}

