import React from 'react';
import Thumbnail from '../../MOLECULES/FilmList-M/Thumbnail-M/Thumbnail';
import Categories from '../../MOLECULES/FilmList-M/Categories-M/Categories';
import c from './FilmList.module.scss';

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
    <section className={c.FilmList}>
      <Categories 
        categoryClicked={props.categoryClicked}
        activeCategory={props.activeCategory}  />
      <div className={c.FilmList__List}>
        {list}
      </div>
    </section>
  );
}
 
export default filmList;