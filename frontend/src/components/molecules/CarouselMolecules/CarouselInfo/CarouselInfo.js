import React from 'react';
import { Link } from 'react-router-dom';

import CarouselHeader from '../../../atoms/CarouselAtoms/CarouselHeader/CarouselHeader';
import CarouselTitle from '../../../atoms/CarouselAtoms/CarouselTitle/CarouselTitle';
import CarouselImage from '../../../atoms/UIAtoms/Image/Image';
import CarouselGenre from '../../../atoms/CarouselAtoms/CarouselGenre/CarouselGenre';
import CarouselRating from '../../../atoms/CarouselAtoms/CarouselRating/CarouselRating';
import FullHeart from '../../../../assets/img/full-heart.svg';
import HalfHeart from '../../../../assets/img/half-heart.svg';
import EmptyHeart from '../../../../assets/img/empty-heart.svg';
import c from './CarouselInfo.module.scss';

const carouselInfo = (props) => {
  const starCount = (Math.round(props.movieRating)/2).toFixed(1);
  let halfCounted = false;
  
  const stars = Array.from({length: 5}, (_, index) => {
    if(index < (starCount|0)) {
      return <CarouselImage 
        className={c.CarouselInfo__Heart}
        key={index} 
        imgSrc={FullHeart} 
        imgAlt='Full Heart' />;
    } else if((starCount%1) * 10 === 5 && !halfCounted) {
      halfCounted = true;
      return <CarouselImage 
        className={c.CarouselInfo__Heart}
        key={index}
        imgSrc={HalfHeart}
        imgAlt='Half Heart' />;
    } 
    return <CarouselImage 
      className={c.CarouselInfo__Heart}
      key={index}
      imgSrc={EmptyHeart}
      imgAlt='Empty Heart' />;
  });
  
  return ( 
    <Link 
      to={{
        pathname: '/movie/' + props.movieId,
        state: { modal: true } }}
      className={c.CarouselInfo}
      onClick={() => props.showMovie(props.movieId)}>
      <CarouselImage 
        className={c.CarouselInfo__Img}
        imgSrc={props.movieImage} 
        imgAlt={props.movieTitle} />
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