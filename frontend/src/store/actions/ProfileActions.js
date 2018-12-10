import * as actionTypes from './actionTypes';

export const getProfileInit = () => {
  return { type: actionTypes.GET_PROFILE_INIT };
}

export const getProfileInitStart = (imgConfig) => {
  return { type: actionTypes.GET_PROFILE_INIT_START, imgConfig };
}

export const getProfileInitSuccess = (profileData) => {
  return { type: actionTypes.GET_PROFILE_INIT_SUCCESS, profileData };
}

export const getProfileInitFail = (error) => {
  return { type: actionTypes.GET_PROFILE_INIT_FAIL, error };
}

export const clearProfileData = () => {
  return { type: actionTypes.CLEAR_PROFILE_DATA };
}