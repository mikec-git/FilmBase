import React from 'react';

import CarouselArrow from '../../atoms/UIAtoms/Image/ClickImage';
import CarouselInfo from '../../molecules/CarouselMolecules/CarouselInfo/CarouselInfo';
import CarouselDots from '../../molecules/CarouselMolecules/CarouselDots/CarouselDots';
import LeftArrow from '../../../assets/img/arrow-left-circle.svg';
import RightArrow from '../../../assets/img/arrow-right-circle.svg';
import c from './Carousel.module.scss';

const carousel = (props) => {      
  let carouselInfo = props.movies.map(movie => {
    return (
      <CarouselInfo
        key={movie.id}
        movieId={movie.id}
        movieTitle={movie.title}
        movieImage={movie.backdrop_path} 
        movieGenre={movie.genre}
        movieRating={movie.vote_average}
        active={movie.active}
        arrowClicked={props.arrowClicked}
        clickTest={props.clickTest}
        showMovie={props.movieClicked} />
    )
  });

  const classesLeftArrow  = [c.Carousel__Arrows, c.Carousel__Arrows_left].join(' ');
  const classesRightArrow = [c.Carousel__Arrows, c.Carousel__Arrows_right].join(' ');
  const slidePosition     = { transform: `translateX(${props.translateX}px)` };

  return ( 
    <header className={c.Carousel}>
      <CarouselArrow 
        className={classesLeftArrow}
        imgSrc={LeftArrow} 
        imgAlt='Left Arrow' 
        clickParam={'left'} 
        clicked={props.arrowClicked} />
      <CarouselArrow
        className={classesRightArrow}
        imgSrc={RightArrow} 
        imgAlt='Right Arrow' 
        clickParam={'right'} 
        clicked={props.arrowClicked} />
      <div 
        className={c.Carousel__Info} 
        ref={props.slideRef} 
        style={slidePosition}>
        {carouselInfo}
      </div>
      <CarouselDots 
        className={c.Carousel__Dots}
        movieList={props.movies}
        clicked={props.dotClicked} />
    </header>
  );
}
 
export default carousel;