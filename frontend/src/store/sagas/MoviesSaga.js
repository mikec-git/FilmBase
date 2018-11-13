import * as actions from '../actions/MoviesActions';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchNowPlayingMoviesSaga(action) {
  yield put(actions.fetchMoviesStart());
  
  try {
    const response = yield call([axios,'get'], 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + process.env.REACT_APP_TMDB_KEY);

    const fetchedNowPlaying = [];
    for(let value of response.data.results) {
      fetchedNowPlaying.push({...value, active: false});
    }
    fetchedNowPlaying[0].active = true;
    yield put(actions.fetchNowPlayingSuccess(fetchedNowPlaying));
  } catch(error) {
    yield put(actions.fetchNowPlayingFail(error));
    console.log(error);
  }
}