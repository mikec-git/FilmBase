import * as actions from '../actions/SearchActions';
import { put, call, select } from 'redux-saga/effects';
import { axiosMovie3 } from '../../shared/AxiosMovieAPI';

export function* getSearchbarResultsSaga(action) {
  yield put(actions.getSearchbarResultsStart());

  try {
    const imgConfig     = yield select(state => state.app.imgConfig);
    const searchResults = yield call(axiosMovie3, '/search/multi?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + action.queryParams + '&page=1&include_adult=false');
      yield put(actions.getSearchbarResultsSuccess(
        { results: searchResults.data, imgConfig }
      ));
  } catch(error) {
    yield put(actions.getSearchbarResultsFail(error));
  }
}
