import React from 'react';
import emptyHeart from '../../../../assets/img/empty-heart.svg';
import c from './CarouselHeart.module.scss';

const carouselEmptyHeart = () => (
  <img className={c.CarouselHeart} src={emptyHeart} alt="Empty Heart"/>
);
 
export default carouselEmptyHeart;
