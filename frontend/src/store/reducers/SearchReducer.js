import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  loading: false,
  searchResults: [],
  error: null,
};

// SEARCHBAR
const getSearchbarResultsStart = (state, action) => {
  return { ...state, loading: true };
}

const getSearchbarResultsSuccess = (state, action) => {
  const imgConfig     = action.imgConfig;
  const { results }   = action.results;
  const baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1);
  const baseUrl       = [null, baseUrlPoster];

  let searchResults = u.filterByVideoData(results, 'search');
  searchResults     = u.updateInitData(searchResults, baseUrl);

  return { ...state, searchResults, loading: false };
}

const getSearchbarResultsFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
}


const reducer = u.createReducer(initialState, {
  [actionTypes.GET_SEARCHBAR_RESULTS_START]: getSearchbarResultsStart,
  [actionTypes.GET_SEARCHBAR_RESULTS_SUCCESS]: getSearchbarResultsSuccess,
  [actionTypes.GET_SEARCHBAR_RESULTS_FAIL]: getSearchbarResultsFail,
});

export default reducer;