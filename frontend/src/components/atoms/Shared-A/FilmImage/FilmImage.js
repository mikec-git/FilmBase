import React from 'react';
import c from './FilmImage.module.scss';

const image = (props) => {      
  const classNames = props.altClassName ? 
    [c[props.className], props.altClassName].join(' ') : c[props.className];
    
  return <img 
    className={classNames} 
    src={props.imgSrc} 
    alt={props.imgAlt} />;
}
 
export default image;