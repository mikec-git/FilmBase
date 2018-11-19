import React from 'react';
import c from './CarouselImage.module.scss';

const carouselImage = (props) => {
  const classNames = props.className ? 
    [c.CarouselImage, ...props.className].join(' ') : c.CarouselImage;

  let image = null;
  try {
    image = <img 
      className={classNames} 
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