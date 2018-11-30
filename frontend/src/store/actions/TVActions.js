import * as actionTypes from './actionTypes';

// ================================= //
//           FETCHING TV         //
// ================================= //
export const fetchTVInit = () => {
  return { type: actionTypes.FETCH_TV_INIT };
}

export const fetchTVStart = () => {
  return { type: actionTypes.FETCH_TV_START };
}

export const fetchTVInitSuccess = (fetchedTV, configAndGenres) => {
  return { type: actionTypes.FETCH_TV_INIT_SUCCESS, fetchedTV, configAndGenres };
}

export const fetchTVInitFail = (error) => {
  return { type: actionTypes.FETCH_TV_INIT_FAIL, error };
}

// ================================= //
//            TV DETAILS          //
// ================================= //

export const getTVDetails = (tvId) => {
  return { type: actionTypes.GET_TV_DETAILS, tvId }
}

export const getTVDetailsSuccess = (fetchedDetails, config) => {
  return { type: actionTypes.GET_TV_DETAILS_SUCCESS, fetchedDetails, config }
}

export const getTVDetailsFail = (error) => {
  return { type: actionTypes.GET_TV_DETAILS_FAIL, error }
}

export const clearTVDetails = () => {
  return { type: actionTypes.CLEAR_TV_DETAILS }
}

// ================================= //
//              CAROUSEL             //
// ================================= //
export const changeCarouselTV = (tvId, element) => {
  return { type: actionTypes.CHANGE_CAROUSEL_TV, tvId, element };
}

export const changeCarouselTVArrow = (arrowDirection, element) => {
  return { type: actionTypes.CHANGE_CAROUSEL_TV_ARROW, arrowDirection, element };
}

export const resizeCarouselSlideTV = (element) => {
  return { type: actionTypes.RESIZE_CAROUSEL_SLIDE_TV, element };
}