import React from 'react';
import c from './Category.module.scss';

const category = (props) => {
  let classNames = null;
  let onClickFunction = null;
  
  if(props.active === props.category) {
    classNames = [c.Category, c.Category_active].join(' ');
    onClickFunction = null;
  } else {
    classNames = c.Category;
    onClickFunction = () => props.clicked(props.category);
  }

  return ( 
    <h3 
      className={classNames}
      onClick={onClickFunction}>
      {props.category}
    </h3>
  );
}
 
export default category;