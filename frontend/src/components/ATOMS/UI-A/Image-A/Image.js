import React from 'react';

const image = (props) => {  
  let classNames = Array.isArray(props.className) ? 
    [...props.className].join(' ') : props.className ? 
    props.className : null;
    
  return <img 
    className={classNames} 
    src={props.imgSrc} 
    alt={props.imgAlt} />;
}
 
export default image;