import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  loadingInit: false,
  loading: false,
  results: [],
  page: null,
  maxPage: null,
  showPage: null,
  listLength: null,
  error: null,
  searchString: ''
};

// DISCOVER INIT
const getDiscoverInitStart = (state, action) => {
  return { ...state, loadingInit: true };
};

const getDiscoverInitSuccess = (state, action) => {
  const { results, page, total_pages: maxPage } = action.initResults,
        { imgConfig, listLength, searchString } = action,
        baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];
  
  let updatedResults = u.filterByVideoData(results, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);
  
  return { 
    ...state, 
    results: updatedResults, 
    page, 
    maxPage, 
    showPage: 1,
    loadingInit: false, 
    imgConfig, 
    listLength, 
    searchString 
  };
};

const getDiscoverInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

// FILTER RESULT
const getDiscoverResultsStart = (state, action) => {
  return { ...state, loading: true };
};

const getDiscoverResultsSuccess = (state, action) => {
  const { results, page, total_pages: maxPage } = action.discoverResults,
        { searchString } = action,
        baseUrlPoster = u.getBaseUrl(state.imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];

  let updatedResults = u.filterByVideoData(results, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);

  return { 
    ...state, 
    results: updatedResults, 
    page, 
    maxPage,
    showPage: 1,
    loading: false, 
    searchString 
  };
};

const getDiscoverResultsFail = (state, action) => {
  return { ...state, loading: false, error: action.error };
};

// CHANGE LIST 
const changeDiscoverListStart = (state, action) => {
  const { direction, hasLooped } = action,
        resultsLength = state.results.length,
        maxPage       = state.maxPage,
        listLength    = state.listLength;

  let searchString  = state.searchString,
      showPage      = state.showPage,
      page          = state.page;
  
  if(direction === 'left' && showPage > 1) {
    showPage--;
  } else if(direction === 'right' && page < maxPage) {
    if(!hasLooped) {
      showPage++;
    }
    if(showPage * listLength > resultsLength) {
      page++;
      searchString = searchString.replace(/page=\d+(?=&?)/g, `page=${page}`);
    } 
  }

  return { ...state, page, showPage, searchString, loading: true };
};

const changeDiscoverListSuccess = (state, action) => {
  const newData = action.newData.results;
  const baseUrlPoster = u.getBaseUrl(state.imgConfig, 'poster', 1),
  baseUrl = [null, baseUrlPoster];
  
  let updatedResults = u.filterByVideoData(newData, 'langPosterImg');
      updatedResults = u.updateInitData(updatedResults, baseUrl);

  let combinedResults     = state.results.concat(updatedResults);
  let noDuplicateResults  = u.removeDuplicateById(combinedResults);

  return { ...state, results: noDuplicateResults, loading: false };
};

const changeDiscoverListFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

// REDUCER //
const reducer = u.createReducer(initialState, {
  [actionTypes.GET_DISCOVER_INIT_START]: getDiscoverInitStart,
  [actionTypes.GET_DISCOVER_INIT_SUCCESS]: getDiscoverInitSuccess,
  [actionTypes.GET_DISCOVER_INIT_FAIL]: getDiscoverInitFail,
  [actionTypes.GET_DISCOVER_RESULTS_START]: getDiscoverResultsStart,
  [actionTypes.GET_DISCOVER_RESULTS_SUCCESS]: getDiscoverResultsSuccess,
  [actionTypes.GET_DISCOVER_RESULTS_FAIL]: getDiscoverResultsFail,
  [actionTypes.CHANGE_DISCOVER_LIST_START]: changeDiscoverListStart,
  [actionTypes.CHANGE_DISCOVER_LIST_SUCCESS]: changeDiscoverListSuccess,
  [actionTypes.CHANGE_DISCOVER_LIST_FAIL]: changeDiscoverListFail,
});

export default reducer;