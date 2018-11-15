import React from 'react';

import CarouselLeftArrow from '../../atoms/CarouselAtoms/CarouselArrows/CarouselLeftArrow';
import CarouselRightArrow from '../../atoms/CarouselAtoms/CarouselArrows/CarouselRightArrow';
import CarouselInfo from '../../molecules/CarouselInfo/CarouselInfo';
import CarouselDots from '../../molecules/CarouselDots/CarouselDots';
import c from './Carousel.module.scss';

const carousel = (props) => {      
  let carouselInfo = props.movies.map(movie => {
    return (
      <CarouselInfo
        key={movie.id}
        movieTitle={movie.title}
        movieImage={movie.backdrop_path} 
        movieGenre={movie.genre}
        movieRating={movie.vote_average}
        active={movie.active}
        arrowClicked={props.arrowClicked} />
    )
  });

  const classesLeftArrow = [c.Carousel__Arrows, c.Carousel__Arrows_left].join(' ');
  const classesRightArrow = [c.Carousel__Arrows, c.Carousel__Arrows_right].join(' ');

  return ( 
    <header className={c.Carousel}>
      <div className={classesLeftArrow}>
        <CarouselLeftArrow clicked={props.arrowClicked} /></div>
      <div className={classesRightArrow}>
        <CarouselRightArrow clicked={props.arrowClicked} /></div>
      <div className={c.Carousel__Info}>
        {carouselInfo}</div>
      <div className={c.Carousel__Dots}>
        <CarouselDots 
          movieList={props.movies}
          clicked={props.dotClicked} /></div>
    </header>
  );
}
 
export default carousel;