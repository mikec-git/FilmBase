import React from 'react';
import c from './Title.module.scss';

const title = (props) => {
  let classNames = null;    
  
  if(props.context === 'carousel') {
    classNames = props.className ? 
      [c.Title__Carousel, props.className].join(' ') : 
      c.Title__Carousel;
  } else if(props.context === 'thumbnail') {
    classNames = props.className ? 
      [c.Title__Thumbnail, props.className].join(' ') : 
      c.Title__Thumbnail;
  } else if(props.context === 'search' || props.context === 'discover') {
    classNames = c.Title__Search;
  }

  return (
    <h1 className={classNames}>{props.title}</h1>
  )
};
 
export default title;