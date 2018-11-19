import React from 'react';
import CarouselDot from '../../../atoms/CarouselAtoms/CarouselDot/CarouselDot';

const carouselDots = (props) => {
  let dots = null;
  if(props.movieList) {
    dots = (
      <div className={props.className}>
        {props.movieList.map(movie => {
          return movie.active ? 
            <CarouselDot key={movie.id} id={movie.id} active /> : 
            <CarouselDot clicked={props.clicked} key={movie.id} id={movie.id} />;
        })}
      </div>
    )
  }

  return dots;
}
 
export default carouselDots;