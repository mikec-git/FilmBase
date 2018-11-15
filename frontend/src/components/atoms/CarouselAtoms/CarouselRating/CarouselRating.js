import React from 'react';
import c from './CarouselRating.module.scss';

const carouselRating = (props) => (
  <h3 className={c.CarouselRating}>{props.rating}</h3>
);
 
export default carouselRating;