import React from 'react';

import CarouselHeader from '../../atoms/CarouselAtoms/CarouselHeader/CarouselHeader';
import CarouselTitle from '../../atoms/CarouselAtoms/CarouselTitle/CarouselTitle';
import CarouselImage from '../../atoms/CarouselAtoms/CarouselImage/CarouselImage';
import CarouselGenre from '../../atoms/CarouselAtoms/CarouselGenre/CarouselGenre';
import CarouselRating from '../../atoms/CarouselAtoms/CarouselRating/CarouselRating';
import CarouselFullHeart from '../../atoms/CarouselAtoms/CarouselHeart/CarouselFullHeart';
import CarouselHalfHeart from '../../atoms/CarouselAtoms/CarouselHeart/CarouselHalfHeart';
import CarouselEmptyHeart from '../../atoms/CarouselAtoms/CarouselHeart/CarouselEmptyHeart';
import c from './CarouselInfo.module.scss';

const carouselInfo = (props) => {
  const classNames = props.active ? 
    [c.CarouselInfo, c.CarouselInfo_active].join(' ') :  c.CarouselInfo;

  const starCount = (Math.round(props.movieRating)/2).toFixed(1);
  let halfCounted = false;
  
  const stars = Array.from({length: 5}, (_, index) => {
    if(index < (starCount|0)) {
      return <CarouselFullHeart key={index} />;
    } else if((starCount%1) * 10 === 5 && !halfCounted) {
      halfCounted = true;
      return <CarouselHalfHeart key={index} />;
    } 
    return <CarouselEmptyHeart key={index} />;
  });
  
  return ( 
    <a href="#" className={classNames}>
      <div className={c.CarouselInfo__Img}>
        <CarouselImage 
          image={props.movieImage} 
          title={props.movieTitle} />
      </div>
      <div className={c.CarouselInfo__Desc}>
        <CarouselHeader>In Theatres</CarouselHeader>
        <CarouselTitle title={props.movieTitle} />
        <div className={c.CarouselInfo__Rating}>
          <CarouselGenre genre={props.movieGenre} />
          <span className={c.CarouselInfo__Stars}>{stars}</span>
          <CarouselRating rating={props.movieRating} />
        </div>
      </div>
    </a>
  );
}
 
export default carouselInfo;