import React from 'react';
import c from './Title.module.scss';

const title = (props) => (
  <h1 className={c[props.className]}>{props.title}</h1>
);
 
export default title;