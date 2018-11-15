import React from 'react';
import c from './CarouselHeader.module.scss';

const carouselHeader = (props) => (
  <h2 className={c.CarouselHeader}>{props.children}</h2>
);
 
export default carouselHeader;