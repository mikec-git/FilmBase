import React from 'react';
import c from './CarouselTitle.module.scss';

const carouselTitle = (props) => (
  <h1 className={c.CarouselTitle}>{props.title}</h1>
);
 
export default carouselTitle;