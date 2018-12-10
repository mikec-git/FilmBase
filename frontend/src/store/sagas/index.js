import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { fetchMoviesInitSaga, getMovieDetailsSaga, changeMovieListSaga } from './MoviesSaga';
import { fetchTVInitSaga, getTVDetailsSaga, changeTVListSaga } from './TVSaga';
import { fetchConfigInitSaga } from './AppSaga';
import { getSearchbarResultsSaga, changeSearchListSaga } from './SearchSaga';
import { getDiscoverInitSaga, getDiscoverResultsSaga, changeDiscoverListSaga } from './DiscoverSaga';
import { getLoginInitSaga, loginSaga, loginApprovedSaga } from './LoginSaga';
import { getProfileInitSaga } from './ProfileSaga';

const watchMovies = [
  takeEvery(actionTypes.FETCH_MOVIES_INIT, fetchMoviesInitSaga),
  takeEvery(actionTypes.CHANGE_MOVIE_LIST, changeMovieListSaga),
  takeLatest(actionTypes.GET_MOVIE_DETAILS, getMovieDetailsSaga)
];

const watchTV = [
  takeEvery(actionTypes.FETCH_TV_INIT, fetchTVInitSaga),
  takeEvery(actionTypes.CHANGE_TV_LIST, changeTVListSaga),
  takeLatest(actionTypes.GET_TV_DETAILS, getTVDetailsSaga)
];

const watchApp = [
  takeEvery(actionTypes.FETCH_CONFIG_INIT, fetchConfigInitSaga )
];

const watchSearch = [
  takeLatest(actionTypes.GET_SEARCHBAR_RESULTS, getSearchbarResultsSaga),
  takeLatest(actionTypes.CHANGE_SEARCH_LIST, changeSearchListSaga),
];

const watchDiscover = [
  takeEvery(actionTypes.GET_DISCOVER_INIT, getDiscoverInitSaga),
  takeEvery(actionTypes.GET_DISCOVER_RESULTS, getDiscoverResultsSaga),
  takeEvery(actionTypes.CHANGE_DISCOVER_LIST, changeDiscoverListSaga),
];

const watchLogin = [
  takeLatest(actionTypes.GET_LOGIN_INIT, getLoginInitSaga),
  takeLatest(actionTypes.LOGIN, loginSaga),
  takeLatest(actionTypes.LOGIN_APPROVED, loginApprovedSaga)
];

const watchProfile = [
  takeLatest(actionTypes.GET_PROFILE_INIT, getProfileInitSaga)
]


export default function* rootSaga() {
  yield all([
    ...watchMovies,
    ...watchTV,
    ...watchSearch,
    ...watchDiscover,
    ...watchApp,
    ...watchLogin,
    ...watchProfile
  ]);
};