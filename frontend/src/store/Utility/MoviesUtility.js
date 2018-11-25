// =========================== //
//        MOVIE UTILITY        //
// =========================== //
export function updatedInitData(originalData, baseUrls, genres) {
  const updatedData = [];
  if(genres) {
    for(let result of originalData) {
      const genre = result.genre_ids.map(id => genres.find(genre => genre.id === id).name);        
      updatedData.push({ 
        ...result, 
        active: false, 
        genre, 
        backdrop_path: baseUrls[0].concat(result.backdrop_path),
        poster_path: baseUrls[1].concat(result.poster_path),
        vote_average: result.vote_average.toFixed(1)
      });
    }    
    updatedData[0].active = true;
  } else {    
    for(let result of originalData) {
      updatedData.push({ 
        ...result, 
        backdrop_path: baseUrls[0].concat(result.backdrop_path),
        poster_path: baseUrls[1].concat(result.poster_path),
        vote_average: result.vote_average.toFixed(1)
      });
    }
  }
  return updatedData;
}

export function filterData(data, type) {
  if(type === 'langImg') {
    return data.filter(movie => movie.backdrop_path && movie.original_language === 'en');
  } else if(type === 'videoSite') {
    return data.filter(video => video.site === 'YouTube');
  }
}

export const extractUpTo = (data, max) => data.slice(0, max) || data;

export function sortVideoType(videos) {
  videos.sort((a, b) => {
    let nameA = a.type.toLowerCase();
    let nameB = b.type.toLowerCase();
    return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
  });
}

export function getProfilePath(staffData, baseUrl) {
  for (let i = 0; i < staffData.length; i++) {
    if(staffData[i].profile_path) {
      staffData[i].profile_path = baseUrl.concat(staffData[i].profile_path);
    }
  }
}

export function getBaseUrl(imgConfig, type, size) {
  if(type === 'backdrop') {
    return imgConfig.secure_base_url.concat(imgConfig.backdrop_sizes[size]);
  } else if(type === 'poster') {
    return imgConfig.secure_base_url.concat(imgConfig.poster_sizes[size]);
  }
}

// =========================== //
//       CAROUSEL UTILITY      //
// =========================== // 
export const updateCarouselMovieState = (state, activeIndex, newActiveIndex) => {
  let updatedState              = [...state.nowPlayingMovies];
  updatedState[activeIndex]     = { ...updatedState[activeIndex], active: false };
  updatedState[newActiveIndex]  = { ...updatedState[newActiveIndex], active: true };
  return updatedState;
}