import React from 'react';
import { Link } from 'react-router-dom';

import CarouselHeader from '../../../atoms/CarouselAtoms/CarouselHeader/CarouselHeader';
import CarouselTitle from '../../../atoms/CarouselAtoms/CarouselTitle/CarouselTitle';
import CarouselImage from '../../../atoms/CarouselAtoms/CarouselImage/CarouselImage';
import CarouselGenre from '../../../atoms/CarouselAtoms/CarouselGenre/CarouselGenre';
import CarouselRating from '../../../atoms/CarouselAtoms/CarouselRating/CarouselRating';
import CarouselFullHeart from '../../../atoms/CarouselAtoms/CarouselHearts/CarouselFullHeart';
import CarouselHalfHeart from '../../../atoms/CarouselAtoms/CarouselHearts/CarouselHalfHeart';
import CarouselEmptyHeart from '../../../atoms/CarouselAtoms/CarouselHearts/CarouselEmptyHeart';
import c from './CarouselInfo.module.scss';

const carouselInfo = (props) => {
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
    <Link 
      to={{
        pathname: '/movie/' + props.movieId,
        state: { modal: true } }}
      className={c.CarouselInfo}
      onClick={() => props.showMovie(props.movieId)}>
      <CarouselImage 
        image={props.movieImage} 
        title={props.movieTitle}
        className={[c.CarouselInfo__Img]} />
      <div className={c.CarouselInfo__Text}>
        <CarouselHeader>In Theatres Now</CarouselHeader>
        <CarouselTitle title={props.movieTitle} />
        <div className={c.CarouselInfo__Rating}>
          <CarouselGenre genre={props.movieGenre} />
          <span className={c.CarouselInfo__Stars}>{stars}</span>
          <CarouselRating rating={props.movieRating} />
        </div>
      </div>
    </Link>
  );
}
 
export default carouselInfo;