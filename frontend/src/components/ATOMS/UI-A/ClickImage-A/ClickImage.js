import React from 'react';
import c from './ClickImage.module.scss';

const image = (props) => {  
  let classNames = [c.ClickImage];
  if(props.className) {
    classNames.push(props.className);
  }

  if(props.context === 'arrowRound') {
    classNames.push(c.ClickImage__ArrowRound);
  }
    
  return <img 
    className={classNames.join(' ')} 
    src={props.imgSrc} 
    alt={props.imgAlt}
    onClick={() => props.clicked(props.clickParam, props.category)} />;
}
 
export default image;