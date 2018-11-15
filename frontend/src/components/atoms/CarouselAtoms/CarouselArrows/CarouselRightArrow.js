import React from 'react';
import rightArrow from '../../../../assets/img/arrow-right-circle.svg';
import c from './CarouselArrows.module.scss';

const carouselRightArrow = (props) => (
  <img 
    className={c.CarouselArrow} 
    src={rightArrow} 
    alt="Right Arrow"
    onClick={() => props.clicked('right')} />
);
 
export default carouselRightArrow;