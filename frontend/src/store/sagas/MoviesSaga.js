import * as actions from '../actions/MoviesActions';
import { put, call, all } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchNowPlayingMoviesSaga(action) {
  yield put(actions.fetchMoviesStart());
  
  try {
    const [response, imgResponse, genreResponse] = yield all([
      // Getting Now Playing movie data
      call([axios,'get'], 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + process.env.REACT_APP_TMDB_KEY),
      // Getting image configuration data
      call([axios,'get'], 'https://api.themoviedb.org/3/configuration?api_key=' + process.env.REACT_APP_TMDB_KEY),
      // Getting genre id data
      call([axios,'get'], 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + process.env.REACT_APP_TMDB_KEY)
    ]);

    // Extracting relevant data
    const responseData = response.data.results.filter(movie => movie.backdrop_path);
    const imgResponseData   = imgResponse.data.images;
    const genreResponseData = genreResponse.data.genres;

    // Getting base url for backdrop images
    const baseUrl = imgResponseData.secure_base_url + imgResponseData.backdrop_sizes[2];
    
    // Taking only first 7 movies
    const fetchedNowPlaying = [];
    for(let value of responseData.slice(0,7)) {
      const genre = genreResponseData.find(genre => genre.id === value.genre_ids[0]);
      fetchedNowPlaying.push({ 
        ...value, 
        active: false, 
        backdrop_path: baseUrl + value.backdrop_path,
        genre: genre.name
      });
    }
    fetchedNowPlaying[0].active = true;
    yield put(actions.fetchNowPlayingSuccess(fetchedNowPlaying));
  } catch(error) {
    yield put(actions.fetchNowPlayingFail(error));
    console.log(error);
  }
}