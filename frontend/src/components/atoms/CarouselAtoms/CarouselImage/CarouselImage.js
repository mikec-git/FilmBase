import React from 'react';
import c from './CarouselImage.module.scss';

const carouselImage = (props) => {
  return (
    <img 
      className={c.CarouselImage} 
      src={props.image} 
      alt={`${props.title}`} />
  );
};
 
export default carouselImage;