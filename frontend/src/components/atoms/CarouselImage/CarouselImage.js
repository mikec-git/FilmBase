import React from 'react';
import c from './CarouselImage.module.scss';

const carouselImage = (props) => ( 
  <img 
    className={c.CarouselImage} 
    src={props.movieImage} 
    alt={`${props.movieTitle}`}/>
);
 
export default carouselImage;