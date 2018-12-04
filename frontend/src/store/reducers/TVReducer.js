import * as actionTypes from '../actions/actionTypes';
import * as u from '../Utility/index';

const initialState = {
  loadingMain: false,
  loadingDetails: false,
  initLoaded: false,
  error: null,
  tv: {},
  currentTVDetails: null,
  translateSlide: 0
};

// =========================== //
//     FETCHING TV FROM API    //
// =========================== //
const fetchTVStart = (state, action) => {
  return { ...state, loadingMain: true };
};

const fetchTVInitSuccess = (state, action) => {
  // Extracting relevant data
  const airingToday  = u.filterByVideoData(action.fetchedTV['airingToday'].results, 'langImg'),
        onTheAir    = u.filterByVideoData(action.fetchedTV['onTheAir'].results, 'langImg'),
        popular     = u.filterByVideoData(action.fetchedTV['popular'].results, 'langImg'),
        {imgConfig, tvGenres} = action.configAndGenres;

  // Getting base url for backdrop images
  let baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 3),
      baseUrlPoster   = u.getBaseUrl(imgConfig, 'poster', 1),
      baseUrl         = [baseUrlBackdrop, baseUrlPoster];
      
  const tv = {
    airingToday: u.updateCategory('Airing Today', u.updateInitData(airingToday, baseUrl, tvGenres)),
    onTheAir: u.updateCategory('On The Air', u.updateInitData(onTheAir, baseUrl)),
    popular: u.updateCategory('Popular', u.updateInitData(popular, baseUrl))
  };

  return { ...state, tv, loadingMain: false, initLoaded: true };
};

const fetchTVInitFail = (state, action) => {
  return { ...state, loadingMain: false, error: action.error };
};

const getTVDetailsStart = (state, action) => {
  return { ...state, loadingDetails: true };
}

const getTVDetailsSuccess = (state, action) => {
  const imgConfig = action.config,
        videos    = u.filterByVideoData(action.fetchedDetails['videos'].results, 'videoSite'),
        cast      = u.extractUpTo(action.fetchedDetails['credits'].cast, 11),
        crew      = u.extractUpTo(action.fetchedDetails['credits'].crew, 11),
        details   = action.fetchedDetails['details'],
        reviews   = action.fetchedDetails['reviews'].results;

  const baseUrlBackdrop = u.getBaseUrl(imgConfig, 'backdrop', 0),
        baseUrlProfile  = u.getBaseUrl(imgConfig, 'poster', 1);
  
  u.sortVideoType(videos);
  u.getProfilePath(cast, baseUrlProfile);
  u.getProfilePath(crew, baseUrlProfile);
  
  const currentTVDetails = {
    ...details, videos, cast, crew, reviews,
    backdrop_path: baseUrlBackdrop.concat(details.backdrop_path)
  };
    
  return { ...state, currentTVDetails, loadingDetails: false };
};

const getTVDetailsFail = (state, action) => {
  return { ...state, loadingDetails: false, error: action.error };
};

const clearTVDetails = (state, action) => {
  return { ...state, currentTVDetails: null }
}

const resetTranslateTV = (state, action) => {
  return { ...state, translateSlide: 0 };
}

// =========================== //
//           CAROUSEL          //
// =========================== // 
const changeCarouselTV = (state, action) => {
  const airingToday      = state.tv['airingToday'].videos;
  const activeIndex     = airingToday.findIndex(tv => tv.active);
  const newActiveIndex  = airingToday.findIndex(tv => tv.id === action.tvId);

  const updatedAiringTodayTV = {
    ...state.tv['airingToday'],
    videos: u.updateCarouselState(airingToday, activeIndex, newActiveIndex)
  };
  const updatedTranslateSlide = -newActiveIndex * action.element.offsetWidth;

  return { 
    ...state, 
    tv: {...state.tv, airingToday: updatedAiringTodayTV}, 
    translateSlide: updatedTranslateSlide };
};

const changeCarouselTVArrow = (state, action) => {
  const airingToday  = state.tv['airingToday'].videos;
  const activeIndex = airingToday.findIndex(tv => tv.active);  
  
  let showLength = action.showLength;
  if(airingToday.length < action.showLength) {
    showLength = airingToday.length;
  }

  const {newActiveIndex, updatedTranslateSlide} = u.updateIndexAndTranslation(action.arrowDirection, activeIndex, action.element, showLength);
  
  const updatedAiringTodayTV = {
    ...state.tv['airingToday'],
    videos: u.updateCarouselState(airingToday, activeIndex, newActiveIndex)
  };
  
  return { 
    ...state, 
    tv: {...state.tv, airingToday: updatedAiringTodayTV},
    translateSlide: updatedTranslateSlide };
};

const resizeCarouselSlideTV = (state, action) => {
  const activeIndex       = state.tv['airingToday'].videos.findIndex(tv => tv.active);
  const newTranslateSlide = -action.element.offsetWidth * activeIndex;
  return { ...state, translateSlide: newTranslateSlide };
};

// =========================== //
//           REDUCER           //
// =========================== //
const reducer = u.createReducer(initialState, {
  [actionTypes.FETCH_TV_START]: fetchTVStart,
  [actionTypes.FETCH_TV_INIT_SUCCESS]: fetchTVInitSuccess,
  [actionTypes.FETCH_TV_INIT_FAIL]: fetchTVInitFail,
  [actionTypes.CHANGE_CAROUSEL_TV]: changeCarouselTV,
  [actionTypes.CHANGE_CAROUSEL_TV_ARROW]: changeCarouselTVArrow,
  [actionTypes.RESIZE_CAROUSEL_SLIDE_TV]: resizeCarouselSlideTV,
  [actionTypes.GET_TV_DETAILS_START]: getTVDetailsStart,
  [actionTypes.GET_TV_DETAILS_SUCCESS]: getTVDetailsSuccess,
  [actionTypes.GET_TV_DETAILS_FAIL]: getTVDetailsFail,
  [actionTypes.CLEAR_TV_DETAILS]: clearTVDetails,
  [actionTypes.RESET_TRANSLATE_TV]: resetTranslateTV,
});

export default reducer;