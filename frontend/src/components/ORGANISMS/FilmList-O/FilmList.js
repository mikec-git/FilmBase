import React, { Suspense } from 'react';
import Thumbnail from '../../MOLECULES/FilmList-M/Thumbnail-M/Thumbnail';
import c from './FilmList.module.scss';
import * as u from '../../../shared/Utility';

const filmList = (props) => {
  let listThumbnails  = null;
  let shownList       = null;    
  let classNames      = props.category === props.activeCategory ? 
    [c.FilmList, c.FilmList_active].join(' ') : 
    c.FilmList;

  if(props.filmList) {
    listThumbnails = props.filmList.map(film => {
      return (
        <Thumbnail
          key={film.id}
          videoId={film.id}
          image={film.poster_path}
          title={film.title || film.name}
          rating={film.vote_average}
          showVideo={props.videoClicked}
          pathBase={props.pathBase} />
      )
    })
  }

  const categoryCamelCase = u.toCamelCase(props.category);

  if(props.hasLoaded[categoryCamelCase]) {
    shownList = (
      <Suspense fallback={<div>Loading...</div>}>
        <section className={classNames}>
          <div className={c.FilmList__List}>
            {listThumbnails}
          </div>
        </section>
      </Suspense>
    );
  }
  
  return shownList;
}
 
export default filmList;