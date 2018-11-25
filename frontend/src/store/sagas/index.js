import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { fetchMoviesInitSaga, getMovieDetailsSaga } from './MoviesSaga';
import { fetchConfigInitSaga } from './AppSaga';

const watchMovies = [
  takeEvery(actionTypes.FETCH_MOVIES_INIT, fetchMoviesInitSaga),
  takeLatest(actionTypes.GET_MOVIE_DETAILS, getMovieDetailsSaga)
];

const watchApp = [
  takeEvery(actionTypes.FETCH_CONFIG_INIT, fetchConfigInitSaga )
];


export default function* rootSaga() {
  yield all([
    ...watchMovies,
    ...watchApp
  ]);
};