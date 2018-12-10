import * as actions from '../actions/ProfileActions';
import { put, call, select, all } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';

export function* getProfileInitSaga(action) {
  const imgConfig = yield select(state => state.app.imgConfig);

  yield put(actions.getProfileInitStart(imgConfig));
  const session = JSON.parse(localStorage.getItem('session'));

  try {
    if(session.type === 'guest') {
      const pathStringTypes = {
        ratedMovies: '/rated/movies', 
        ratedTV: '/rated/tv'
      };
      const profileData = yield call(extractProfileData, session.type, pathStringTypes, {session});
      profileData.name      = 'Guest';
      profileData.authType  = 'guest';
      yield put(actions.getProfileInitSuccess(profileData));
      
    } else if(session.type === 'login') {
      const profileString = ['/account?api_key=', process.env.REACT_APP_TMDB_KEY,'&session_id=', session.session_id].join('');

      const profileDetails  = yield call(axiosTMDB3, profileString),
            accountId       = profileDetails.data.id;

      const pathStringTypes = {
        favoriteMovies: '/favorite/movies', 
        favoriteTV: '/favorite/tv', 
        ratedMovies: '/rated/movies', 
        ratedTV: '/rated/tv'
      };

      const profileData = yield call(extractProfileData, session.type, pathStringTypes, {session, accountId});
      profileData.accountId = accountId;
      profileData.userName  = profileDetails.data.username;
      profileData.name      = profileDetails.data.name;
      profileData.authType  = 'login';
      yield put(actions.getProfileInitSuccess(profileData));
    }
  } catch (error) {
    yield put(actions.getProfileInitFail(error));
  }
}

// UTILITY - getProfileInitSaga
function* extractProfileData(authType, pathStringTypes, ...rest) {
  const args        = rest[0],
        pathString  = {},
        profileData = {};

  if(authType === 'login') {
    for(let key in pathStringTypes) {
      pathString[key] = ['/account/', args.accountId, pathStringTypes[key], '?api_key=', process.env.REACT_APP_TMDB_KEY,'&session_id=', args.session.session_id,'&language=en-US&sort_by=created_at.desc&page=1'].join('');
    }
  } else if(authType === 'guest') {
    for(let key in pathStringTypes) {
      pathString[key] = ['/guest_session/', args.session.guest_session_id, pathStringTypes[key], '?api_key=', process.env.REACT_APP_TMDB_KEY,'&language=en-US&sort_by=created_at.desc&page=1'].join('');
    }
  }

  for(let key in pathString) {
    profileData[key] = yield call(getProfileData, pathString[key]);
  }
  return profileData;
}

function* getProfileData(pathString) {
  try {
    const result = yield call(axiosTMDB3, pathString);
    return result.data.results;
  } catch (error) {
    console.log(error);
  }
}
// UTILITY END - getProfileInitSaga