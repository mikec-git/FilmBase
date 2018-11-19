import React from 'react';
import c from './Overview.module.scss';

const overview = (props) => {
  const classNames = props.expanded ? 
    props.className : [props.className, c.Overview_less].join(' ') ;
  
  return (
    <p 
      className={classNames}
      onClick={props.clicked}>
      {props.overview}
    </p>
  )
};
 
export default overview;