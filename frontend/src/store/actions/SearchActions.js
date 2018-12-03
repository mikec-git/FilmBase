import * as actionTypes from './actionTypes';

// ================================= //
//          SEARCHBAR QUERY          //
// ================================= //
export const getSearchbarResultsStart = () => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS_START };
}

export const getSearchbarResults = (queryParams) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS, queryParams };
}

export const getSearchbarResultsSuccess = ({results, imgConfig}) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS_SUCCESS, results, imgConfig };
}

export const getSearchbarResultsFail = (error) => {
  return { type: actionTypes.GET_SEARCHBAR_RESULTS_FAIL, error };
}