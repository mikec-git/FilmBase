import React from 'react';

import CarouselDots from '../../molecules/CarouselDots/CarouselDots';
import CarouselImage from '../../atoms/CarouselImage/CarouselImage';
import c from './Carousel.module.scss';

const carousel = (props) => {
  return ( 
    <div className={c.Carousel}>
      <div className={c.Carousel__Img}>
        <CarouselImage
          movieImage='https://source.unsplash.com/random/1800x1200'
          movieTitle='Random' />
      </div>
      <div className={c.Carousel__Dots}>
        <CarouselDots 
          movieList={props.movies} />
      </div>
    </div>
  );
}
 
export default carousel;