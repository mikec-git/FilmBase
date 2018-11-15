import React from 'react';
import c from './CarouselDot.module.scss';

const carouselDot = (props) => {
  const classNames = props.active ? 
    [c.CarouselDot, c.CarouselDot_active].join(' ') : 
    c.CarouselDot;
    
  const dot = props.active ? 
    <div className={classNames} ></div> : 
    <div className={classNames} onClick={() => props.clicked(props.id)}></div>;

  return dot;
};
 
export default carouselDot;