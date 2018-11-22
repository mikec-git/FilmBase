import React from 'react';
import { Link } from 'react-router-dom';

import CarouselHeader from '../../../atoms/Carousel-A/CarouselHeader/CarouselHeader';
import CarouselGenre from '../../../atoms/Carousel-A/CarouselGenre/CarouselGenre';
import CarouselTitle from '../../../atoms/Shared-A/Title/Title';
import CarouselRating from '../../../atoms/Shared-A/Rating/Rating';
import Hearts from '../../../atoms/Shared-A/Hearts/Hearts';
import CarouselImage from '../../../atoms/Shared-A/FilmImage/FilmImage';

import c from './CarouselInfo.module.scss';

const carouselInfo = (props) => {  
  // REGEX FOR VIDEO TYPE NAME
  const videoType = /\w+/ig.exec(props.pathBase);
  
  return ( 
    <Link 
      to={{
        pathname: props.pathBase + props.videoId,
        state: { modal: true, type: videoType[0] } }}
      className={c.CarouselInfo}
      onClick={() => props.showVideo(props.videoId)}>
      <CarouselImage 
        className='FilmImage__Carousel'
        altClassName={c.CarouselInfo__Img}
        imgSrc={props.videoImage} 
        imgAlt={props.videoTitle} />
      <div className={c.CarouselInfo__Text}>
        <CarouselHeader>In Theatres Now</CarouselHeader>
        <CarouselTitle 
          className='Title__Carousel'
          title={props.videoTitle} />
        <div className={c.CarouselInfo__Rating}>
          <CarouselGenre genre={props.videoGenre[0]} />
          <Hearts 
            className='Hearts__Carousel' 
            rating={props.videoRating} />
          <CarouselRating 
            className='Rating__Carousel'
            rating={props.videoRating} />
        </div>
      </div>
    </Link>
  );
}
 
export default carouselInfo;