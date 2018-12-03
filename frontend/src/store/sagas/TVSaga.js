import * as actions from '../actions/TVActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosMovie3 } from '../../shared/AxiosMovieAPI';

// ================================== //
//             FETCH TV INIT          //
// ================================== //
export function* fetchTVInitSaga(action) {
  yield put(actions.fetchTVStart());
  
  try {
    let [imgConfig, tvGenres, movieGenres] = yield all([
      select(state => state.app.imgConfig),
      select(state => state.app.tvGenres),
      select(state => state.app.movieGenres)
    ]);
    
    const {airingToday, onTheAir, popular} = yield all({
      airingToday: call(axiosMovie3, '/tv/airing_today?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'),
      
      onTheAir: call(axiosMovie3, '/tv/on_the_air?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'),
      
      popular: call(axiosMovie3, '/tv/popular?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1')
    });
    
    tvGenres = tvGenres.concat(movieGenres);
    
    yield put(actions.fetchTVInitSuccess(
      { airingToday: airingToday.data, 
        onTheAir: onTheAir.data, 
        popular: popular.data },
      { imgConfig, 
        tvGenres }
    ));
  } catch(error) {
    yield put(actions.fetchTVInitFail(error));
  }
}

// ================================== //
//      GET INDIVIDUAL TV DETAILS     //
// ================================== //
export function* getTVDetailsSaga(action) {
  yield put(actions.getTVDetailsStart());

  try {
    const imgConfig = yield select(state => state.app.imgConfig);
    const {videos, credits, details, reviews} = yield all({
      videos: call(axiosMovie3, '/tv/' + action.tvId + '/videos?api_key=' + process.env.REACT_APP_TMDB_KEY),

      credits: call(axiosMovie3, '/tv/' + action.tvId + '/credits?api_key=' + process.env.REACT_APP_TMDB_KEY),
      
      details: call(axiosMovie3, '/tv/' + action.tvId + '?api_key=' + process.env.REACT_APP_TMDB_KEY),
      
      reviews: call(axiosMovie3, '/tv/' + action.tvId + '/reviews?api_key=' + process.env.REACT_APP_TMDB_KEY)   
    });
    
    yield put(actions.getTVDetailsSuccess(
      { videos: videos.data, 
        credits: credits.data, 
        details: details.data, 
        reviews: reviews.data },
      imgConfig
    ));
  } catch(error) {
    yield put(actions.getTVDetailsFail(error));
  }  
}