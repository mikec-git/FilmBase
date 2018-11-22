import React from 'react';
import c from './CarouselGenre.module.scss';

const carouselGenre = (props) => (
  <h3 className={c.CarouselGenre}>{props.genre}</h3>
);
 
export default carouselGenre;