import React from 'react';
import c from './Category.module.scss';

const category = (props) => {
  let classNames = c.Category;
  
  if(props.active === props.category) {
    classNames = [c.Category, c.Category_active].join(' ');
  }

  return ( 
    <h3 
      className={classNames}
      onClick={() => props.clicked(props.category)}>
      {props.category}
    </h3>
  );
}
 
export default category;