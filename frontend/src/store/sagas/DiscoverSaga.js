import * as actions from '../actions/DiscoverActions';
import { put, call, all, select } from 'redux-saga/effects';
import { axiosMovie3 } from '../../shared/AxiosMovieAPI';

export function* getDiscoverInitSaga(action) {
  yield put(actions.getDiscoverInitStart());

  try {
    const imgConfig       = yield select(state => state.app.imgConfig),
          listLength      = yield select(state => state.app.listLength),
          { media, year } = action.queryParams,
          queryPathString = [year.name, year.value].join('=');

    const discoverSearchString = '/discover/' + media.name + '?api_key=' + process.env.REACT_APP_TMDB_KEY + '&language=en-US&include_video=true&' + queryPathString + '&page=1';

    const initResults = yield call(axiosMovie3, discoverSearchString);

    yield put(actions.getDiscoverInitSuccess({
      initResults: initResults.data, 
      imgConfig,
      listLength,
      searchString: discoverSearchString
    }));
  } catch (error) {
    yield put(actions.getDiscoverInitFail(error));
  }
}

export function* getDiscoverResultsSaga(action) {
  yield put(actions.getDiscoverResultsStart());

  try {
    const query         = action.queryParams;
    let queryPathString = [];
    
    let idResults = yield all ([
      call(getQueryIds, 'people', 'person', query),
      call(getQueryIds, 'keywords', 'keyword', query)
    ]);

    idResults = idResults.filter(id => !!id);

    Object.entries(query).forEach(([key, value]) => {
      if(key !== 'people' && key !== 'keywords' && key !== 'media') {
        queryPathString.push([value.name, value.value].join('='));
      }
    });
    
    if(Array.isArray(idResults) && idResults.length > 0) {
      queryPathString = [...queryPathString, ...idResults].join('&');
    } else {
      queryPathString = queryPathString.join('&');
    }

    const discoverSearchString = `/discover/${query['media'].name}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_video=true&${queryPathString}&page=1`;

    const discoverResults = yield call(axiosMovie3, discoverSearchString);

    yield put(actions.getDiscoverResultsSuccess({discoverResults: discoverResults.data, searchString: discoverSearchString}));
  } catch (error) {
    yield put(actions.getDiscoverResultsFail(error));
  }
}

// UTILITY - getDiscoverResultsSaga
function* getQueryIds(filterType, searchType, queryParams) {
  if(queryParams[filterType]) {
    const queries = queryParams[filterType].value.match(/\b\w+(\s+\w+)*\b/g);
    const queryResults = yield all (queries.map(query => call(getQueryId, query, searchType)));
    const queryIds = queryResults.map(result => {
      if(!!result.data.total_results) {
        return result.data.results[0].id;
      }
      return null;
    });
    const filteredIds = queryIds.filter(id => !!id);
    if(Array.isArray(filteredIds) && !!filteredIds.length) {
      return [queryParams[filterType].name, filteredIds].join('=');
    }
  }
  return null;
}

function* getQueryId(query, searchType) {
  try {
    return yield call(axiosMovie3, '/search/' + searchType + '?api_key=' + process.env.REACT_APP_TMDB_KEY + '&query=' + query + '&page=1');
  } catch (error) {
    console.log(error);
  }
}
// UTILITY END - getDiscoverResultsSaga

export function* changeDiscoverListSaga(action) {
  try {
    let hasLooped = false;
    let maxIterations = 10;
    while(maxIterations > 0) {
      const { direction } = action;
      const prevPage = yield select(state => state.discover.page);
      
      yield put(actions.changeDiscoverListStart(direction, hasLooped));
      
      const newPage       = yield select(state => state.discover.page);
      const searchString  = yield select(state => state.discover.searchString);

      if(newPage > prevPage || hasLooped) {
        const nextPageData = yield call(axiosMovie3, searchString);
        yield put(actions.changeDiscoverListSuccess(nextPageData.data));
      }
      
      const showPage      = yield select(state => state.discover.showPage);
      const resultsLength = yield select(state => state.discover.results.length);
      const listLength    = yield select(state => state.app.listLength);       

      const loopAgain = showPage*listLength > resultsLength;
      if(!loopAgain) {
        break;
      }

      hasLooped = true;
      maxIterations--;
    }
  } catch (error) {
    yield put(actions.changeDiscoverListFail(error));
  }
}