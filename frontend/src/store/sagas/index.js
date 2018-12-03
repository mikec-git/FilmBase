import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { fetchMoviesInitSaga, getMovieDetailsSaga } from './MoviesSaga';
import { fetchTVInitSaga, getTVDetailsSaga } from './TVSaga';
import { fetchConfigInitSaga } from './AppSaga';
import { getSearchbarResultsSaga } from './SearchSaga';

const watchMovies = [
  takeEvery(actionTypes.FETCH_MOVIES_INIT, fetchMoviesInitSaga),
  takeLatest(actionTypes.GET_MOVIE_DETAILS, getMovieDetailsSaga)
];

const watchTV = [
  takeEvery(actionTypes.FETCH_TV_INIT, fetchTVInitSaga),
  takeLatest(actionTypes.GET_TV_DETAILS, getTVDetailsSaga)
];

const watchApp = [
  takeEvery(actionTypes.FETCH_CONFIG_INIT, fetchConfigInitSaga )
];

const watchSearch = [
  takeLatest(actionTypes.GET_SEARCHBAR_RESULTS, getSearchbarResultsSaga)
];


export default function* rootSaga() {
  yield all([
    ...watchMovies,
    ...watchTV,
    ...watchSearch,
    ...watchApp
  ]);
};