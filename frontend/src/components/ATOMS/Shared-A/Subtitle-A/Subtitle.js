import React from 'react';
import c from './Subtitle.module.scss';

const subtitle = (props) => {
  let classNames = [c.Subtitle];

  if(props.context === 'moreInfo') {
    classNames.push(c.Subtitle__MoreInfo);
  } else if(props.context === 'profile') {
    classNames.push(c.Subtitle__Profile);
  }
  
  return (
    <h3 className={classNames.join(' ')}><span>{props.subtitle}</span></h3>
  )
};
 
export default subtitle;