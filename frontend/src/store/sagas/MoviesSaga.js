import * as actions from '../actions/MoviesActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosMovie3 } from '../../shared/AxiosMovieAPI';

// ================================== //
//          FETCH MOVIES INIT         //
// ================================== //
export function* fetchMoviesInitSaga(action) {
  let page = 1,
      showPage = 1,
      maxIteration = 5,
      hasLooped = false;
      
  try {
    const [imgConfig, movieGenres, listLength] = yield all([
      select(state => state.app.imgConfig),
      select(state => state.app.movieGenres),
      select(state => state.app.listLength)
    ]);

    yield put(actions.fetchMoviesStart({listLength, imgConfig, movieGenres}));

    const {nowPlaying, upcoming, popular} = yield all({
      nowPlaying: call(axiosMovie3, ['/movie/now_playing?api_key=', process.env.REACT_APP_TMDB_KEY, '&language=en-US&page=1'].join('')),

      upcoming: call(axiosMovie3, ['/movie/upcoming?api_key=', process.env.REACT_APP_TMDB_KEY, '&language=en-US&page=1'].join('')),

      popular: call(axiosMovie3, ['/movie/popular?api_key=', process.env.REACT_APP_TMDB_KEY, '&language=en-US&page=1'].join(''))
    });

    // const {nowPlaying, upcoming, popular} = yield

    yield put(actions.fetchMoviesInitSuccess(
      { nowPlaying: nowPlaying.data, 
        upcoming: upcoming.data, 
        popular: popular.data }
    ));
  } catch(error) {
    yield put(actions.fetchMoviesInitFail(error));
  }
}

// ================================== //
//    GET INDIVIDUAL MOVIE DETAILS    //
// ================================== //
export function* getMovieDetailsSaga(action) {
  yield put(actions.getMovieDetailsStart());

  try {
    const imgConfig = yield select(state => state.app.imgConfig);
    const {videos, credits, details, reviews} = yield all({
      videos: call(axiosMovie3, '/movie/' + action.movieId + '/videos?api_key=' + process.env.REACT_APP_TMDB_KEY),

      credits: call(axiosMovie3, '/movie/' + action.movieId + '/credits?api_key=' + process.env.REACT_APP_TMDB_KEY),
      
      details: call(axiosMovie3, '/movie/' + action.movieId + '?api_key=' + process.env.REACT_APP_TMDB_KEY),
      
      reviews: call(axiosMovie3, '/movie/' + action.movieId + '/reviews?api_key=' + process.env.REACT_APP_TMDB_KEY)   
    });
    
    yield put(actions.getMovieDetailsSuccess(
      { videos: videos.data, 
        credits: credits.data, 
        details: details.data, 
        reviews: reviews.data },
      imgConfig
    ));
  } catch(error) {
    yield put(actions.getMovieDetailsFail(error));
  }  
}