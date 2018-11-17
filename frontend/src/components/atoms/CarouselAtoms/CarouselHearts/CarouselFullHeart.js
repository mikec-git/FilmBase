import React from 'react';
import fullHeart from '../../../../assets/img/full-heart.svg';
import c from './CarouselHeart.module.scss';

const carouselFullHeart = () => (
  <img className={c.CarouselHeart} src={fullHeart} alt="Full Heart"/>
);
 
export default carouselFullHeart;
