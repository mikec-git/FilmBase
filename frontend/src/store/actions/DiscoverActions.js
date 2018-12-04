import * as actionTypes from './actionTypes';

// ================================= //
//           DISCOVER QUERY          //
// ================================= //

export const getDiscoverInit = (queryParams) => {
  return { type: actionTypes.GET_DISCOVER_INIT, queryParams };
}

export const getDiscoverInitStart = () => {
  return { type: actionTypes.GET_DISCOVER_INIT_START };
}

export const getDiscoverInitSuccess = ({initResults, imgConfig, listLength, searchString}) => {
  return { type: actionTypes.GET_DISCOVER_INIT_SUCCESS, initResults, imgConfig, listLength, searchString };
}

export const getDiscoverInitFail = (error) => {
  return { type: actionTypes.GET_DISCOVER_INIT_FAIL, error };
}

// FILTER RESULTS //
export const getDiscoverResults = (queryParams) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS, queryParams };
}

export const getDiscoverResultsStart = () => {
  return { type: actionTypes.GET_DISCOVER_RESULTS_START };
}

export const getDiscoverResultsSuccess = ({discoverResults, searchString}) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS_SUCCESS, discoverResults, searchString };
}

export const getDiscoverResultsFail = (error) => {
  return { type: actionTypes.GET_DISCOVER_RESULTS_FAIL, error };
}

// CHANGE LIST //
export const changeDiscoverList = (direction) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST, direction };
}

export const changeDiscoverListStart = (direction, hasLooped) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST_START, direction, hasLooped };
}

export const changeDiscoverListSuccess = (newData) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST_SUCCESS, newData };
}

export const changeDiscoverListFail = (error) => {
  return { type: actionTypes.CHANGE_DISCOVER_LIST_FAIL, error };
}