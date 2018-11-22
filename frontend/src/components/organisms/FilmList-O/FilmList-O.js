import React from 'react';
import Thumbnail from '../../molecules/FilmList-M/Thumbnail/Thumbnail';
import Categories from '../../molecules/FilmList-M/Categories/Categories';
import c from './FilmList-O.module.scss';

const filmList = (props) => {
  let list = null;
  if(props.filmList) {
    list = props.filmList.map(film => {
      return (
        <Thumbnail
          key={film.id}
          videoId={film.id}
          image={film.poster_path}
          title={film.title}
          rating={film.vote_average}
          showVideo={props.videoClicked}
          pathBase={props.pathBase} />
      )
    })
  }
  
  return (    
    <div className={c.FilmList}>
      <Categories 
        categoryClicked={props.categoryClicked}
        activeCategory={props.activeCategory}  />
      <div className={c.FilmList__List}>
        {list}
      </div>
    </div>
  );
}
 
export default filmList;