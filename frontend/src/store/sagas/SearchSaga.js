import * as actions from '../actions/SearchActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosMovie3 } from '../../shared/AxiosMovieAPI';

export function* getSearchbarResultsSaga(action) {
  yield put(actions.getSearchbarResultsStart());

  try {
    const imgConfig     = yield select(state => state.app.imgConfig);
    const searchResults = yield call(axiosMovie3, '/search/multi?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&query=' + action.queryParams + '&page=1&include_adult=false');
      yield put(actions.getSearchbarResultsSuccess(
        { results: searchResults.data, imgConfig }
      ));
  } catch(error) {
    yield put(actions.getSearchbarResultsFail(error));
  }
}






// TEMP FOR DISCOVER FILTERS
// filters: {
//   sortBy: {
//     inputType: 'select',
//     value: 'Sort Order',
//     options: [
//     { text: 'Sort Order' },
//     { text: 'Popularity: High to Low',
//       inputConfig: { value: 'popularity.desc', name: 'sort_by' } },
//     { text: 'Popularity: Low to High',
//       inputConfig: { value: 'popularity.asc', name: 'sort_by' } },
//     { text: 'Rating: High to Low',
//       inputConfig: { value: 'vote_average.desc', name: 'sort_by' } },
//     { text: 'Rating: Low to High',
//       inputConfig: { value: 'vote_average.asc', name: 'sort_by' } },
//     { text: 'Release Date: New to Old',
//       inputConfig: { value: 'release_date.desc', name: 'sort_by' } },
//     { text: 'Release Date: Old to New',
//       inputConfig: { value: 'release_date.asc', name: 'sort_by' } },
//     { text: 'Title: A to Z',
//       inputConfig: { value: 'original_title.asc', name: 'sort_by' } },
//     { text: 'Title: Z to A',
//       inputConfig: { value: 'original_title.desc', name: 'sort_by' } },
//     { text: 'Revenue: High to Low',
//       inputConfig: { value: 'revenue.desc', name: 'sort_by' } },
//     { text: 'Revenue: Low to High',
//       inputConfig: { value: 'revenue.asc', name: 'sort_by' } }]
//   },
//   year: {
//     inputType: 'select',
//     value: 'By Year',
//     options: u.getOptionsIntRange('By Year', 50, u.getCurrentYear(), 'desc', 'primary_release_year')
//   },
//   rating: {
//     inputType: 'select',
//     value: 'By Rating',
//     options: u.getOptionsIntRange('By Rating', 10, 10, 'desc', 'vote_average.gte')
//   },
//   keywords: {
//     inputType: 'text',
//     value: '',
//     inputConfig: {
//       type: 'text',
//       placeholder: 'Keywords',
//       name: 'with_keywords'
//     }
//   },
//   people: {
//     inputType: 'text',
//     value: '',
//     inputConfig: {
//       type: 'text',
//       placeholder: 'People Involved',
//       name: 'with_people'
//     }
//   }
// }