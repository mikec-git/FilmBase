import React from 'react';
import c from './CarouselDot.module.scss';

const carouselDot = (props) => {
  const classNames = props.active ? 
  c.CarouselDot : [c.CarouselDot, c.CarouselDot_filled].join(' ');

  return (
    <div className={classNames}></div>
  );
};
 
export default carouselDot;