import React from 'react';
import leftArrow from '../../../../assets/img/arrow-left-circle.svg';
import c from './CarouselArrows.module.scss';

const carouselLeftArrow = (props) => (
  <img 
    className={[c.CarouselArrow, c.CarouselArrow_left].join(' ')}
    src={leftArrow} 
    alt="Left Arrow"
    onClick={() => props.clicked('left')} />
);
 
export default carouselLeftArrow;