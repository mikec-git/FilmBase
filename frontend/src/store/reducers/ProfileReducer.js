import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  imgConfig: null,
  loadingInit: false,
  authType: null,
  accountId: null,
  profile: null,
  favorite: null,
  rated: null,
  error: null
};

const getProfileInitStart = (state, action) => {
  return { ...state, loadingInit: true, imgConfig: action.imgConfig };
};

const getProfileInitSuccess = (state, action) => {
  let { authType, accountId, favoriteMovies, favoriteTV, ratedMovies, ratedTV, name, userName } = action.profileData;
  const { imgConfig } = state;
  
  const baseUrlPoster = u.getBaseUrl(imgConfig, 'poster', 1),
        baseUrl       = [null, baseUrlPoster];

  if(authType === 'login') {
    favoriteMovies  = u.updateInitData(favoriteMovies, baseUrl);
    favoriteTV      = u.updateInitData(favoriteTV, baseUrl);
  }
  ratedMovies     = u.updateInitData(ratedMovies, baseUrl);
  ratedTV         = u.updateInitData(ratedTV, baseUrl);

  const profile   = { name, userName },
        favorite  = { movies: favoriteMovies, tv: favoriteTV },
        rated     = { movies: ratedMovies, tv: ratedTV };

  return { ...state, loadingInit: false, accountId, authType, profile, favorite, rated };
};

const getProfileInitFail = (state, action) => {
  return { ...state, loadingInit: false, error: action.error };
};

const clearProfileData = (state, action) => {
  return { ...state, authType: null, accountId: null, profile: null, favorite: null, rated: null };
}

const reducer = u.createReducer(initialState, {
  [actionTypes.GET_PROFILE_INIT_START]: getProfileInitStart,
  [actionTypes.GET_PROFILE_INIT_SUCCESS]: getProfileInitSuccess,
  [actionTypes.GET_PROFILE_INIT_FAIL]: getProfileInitFail,
  [actionTypes.CLEAR_PROFILE_DATA]: clearProfileData
});

export default reducer;