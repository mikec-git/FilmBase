import React from 'react';
import CarouselDot from '../../atoms/CarouselDot/CarouselDot';
import c from './CarouselDots.module.scss';

const carouselDots = (props) => {
  let dots = null;
  if(props.movieList) {
    dots = (
      <div className={c.CarouselDots}>
        {props.movieList.map((movie, index) => {
          return movie.active ? 
            <CarouselDot key={index} active /> : <CarouselDot key={index} />;
        })}
      </div>
    )
  }

  return dots;
}
 
export default carouselDots;