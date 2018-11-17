import React from 'react';
import c from './CarouselImage.module.scss';

const carouselImage = (props) => {
  let image = null;
  try {
    image = <img 
      className={c.CarouselImage} 
      src={props.image} 
      alt={`${props.title}`} />
  } catch(error) {
    console.log(error);
  }
  return (
    image
  );
};
 
export default carouselImage;