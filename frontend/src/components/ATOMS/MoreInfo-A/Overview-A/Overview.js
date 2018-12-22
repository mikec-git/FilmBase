import React from 'react';
import c from './Overview.module.scss';

const overview = (props) => {
  const classNames = props.expanded ? 
    [c.Overview, props.className] : 
    [c.Overview, props.className, c.Overview_less];

  if(props.context === 'work') {
    classNames.push(c.Overview__Work);
  }
  
  return (
    <p 
      className={classNames.join(' ')}
      onClick={props.clicked}>
      {props.overview}
    </p>
  )
};
 
export default overview;