import * as actions from '../actions/MoviesActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosMovie3 } from '../../shared/AxiosMovieAPI';

// ================================== //
//          FETCH MOVIES INIT         //
// ================================== //
export function* fetchMoviesInitSaga(action) {
  yield put(actions.fetchMoviesStart());

  try {
    const [imgConfig, movieGenres] = yield all([
      select(state => state.app.imgConfig),
      select(state => state.app.movieGenres)
    ]);

    const [nowPlaying, upcoming, popular] = yield all([
      call(axiosMovie3, '/movie/now_playing?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'),
      call(axiosMovie3, '/movie/upcoming?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1'),
      call(axiosMovie3, '/movie/popular?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&page=1')
    ]);

    yield put(actions.fetchMoviesInitSuccess(
      [nowPlaying.data, upcoming.data, popular.data],
      [imgConfig, movieGenres]
    ));
  } catch(error) {
    yield put(actions.fetchMoviesInitFail(error));
    console.log(error);
  }
}

// ================================== //
//    GET INDIVIDUAL MOVIE DETAILS    //
// ================================== //
export function* getMovieDetailsSaga(action) {
  yield put(actions.fetchMoviesStart());
  try {
    const [imgResponse, videoResponse, creditsResponse, detailsResponse, reviewResponse] = yield all([
      call(axiosMovie3, '/configuration?api_key=' + process.env.REACT_APP_TMDB_KEY),
      call(axiosMovie3, '/movie/' + action.movieId + '/videos?api_key=' + process.env.REACT_APP_TMDB_KEY),
      call(axiosMovie3, '/movie/' + action.movieId + '/credits?api_key=' + process.env.REACT_APP_TMDB_KEY),
      call(axiosMovie3, '/movie/' + action.movieId + '?api_key=' + process.env.REACT_APP_TMDB_KEY),
      call(axiosMovie3, '/movie/' + action.movieId + '/reviews?api_key=' + process.env.REACT_APP_TMDB_KEY)      
    ]);
  
    const imgData   = imgResponse.data.images;
    const castData  = creditsResponse.data.cast.slice(0, 11) || creditsResponse.data.cast;
    const crewData  = creditsResponse.data.crew.slice(0, 11) || creditsResponse.data.crew;
    const videoResponseData = videoResponse.data.results.filter(video => video.site === 'YouTube');

    const baseUrlBackdrop = imgData.secure_base_url + imgData.backdrop_sizes[0];
    const baseUrlProfile  = imgData.secure_base_url + imgData.profile_sizes[1];
    
    sortVideoType(videoResponseData);
    getProfileUrlPath(castData, baseUrlProfile);
    getProfileUrlPath(crewData, baseUrlProfile);
    
    const detailsResponseData = {
      ...detailsResponse.data, 
      videos: videoResponseData,
      cast: castData,
      crew: crewData,
      reviews: reviewResponse.data.results,
      backdrop_path: baseUrlBackdrop.concat(detailsResponse.data.backdrop_path)
    };
    
    yield put(actions.getMovieDetailsSuccess(detailsResponseData));
  } catch(error) {
    console.log(error);
    yield put(actions.getMovieDetailsFail(error));
  }  
}

function sortVideoType(videoData) {
  videoData.sort((a, b) => {
    let nameA = a.type.toLowerCase();
    let nameB = b.type.toLowerCase();
    return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
  });
}

function getProfileUrlPath(staffData, baseUrl) {
  for (let i = 0; i < staffData.length; i++) {
    if(staffData[i].profile_path) {
      staffData[i].profile_path = baseUrl.concat(staffData[i].profile_path);
    }
  }
}