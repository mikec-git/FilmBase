import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { fetchMoviesInitSaga, getMovieDetailsSaga } from './MoviesSaga';
import { fetchConfigInitSaga } from './AppSaga';

export function* watchMovies() {
  yield all ([
    takeEvery(actionTypes.FETCH_MOVIES_INIT, fetchMoviesInitSaga),
    takeEvery(actionTypes.GET_MOVIE_DETAILS, getMovieDetailsSaga)
  ]);
}

export function* watchApp() {
  yield all ([
    takeEvery(actionTypes.FETCH_CONFIG_INIT, fetchConfigInitSaga )
  ]);
}