import React from 'react';
import c from './Rating.module.scss';

const rating = (props) => (
  <h3 className={c[props.className]}>{props.rating}</h3>
);
 
export default rating;