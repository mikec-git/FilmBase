import React from 'react';
import halfHeart from '../../../../assets/img/half-heart.svg';
import c from './CarouselHeart.module.scss';

const carouselHalfHeart = () => (
  <img className={c.CarouselHeart} src={halfHeart} alt="Half Heart"/>
);
 
export default carouselHalfHeart;
