import React from 'react';
import c from './Subtitle.module.scss';

const subtitle = (props) => {
  let classNames = props.className ? 
    [c.Subtitle, props.className].join(' ') : 
    c.Subtitle; 
  
  return (
    <h3 className={classNames}>{props.subtitle}</h3>
  )
};
 
export default subtitle;