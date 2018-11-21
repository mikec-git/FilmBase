import React from 'react';
import c from './Category.module.scss';

const category = (props) => {
  let classNames = props.active ? 
    [c.Category, c.Category_active].join(' ') : c.Category;

  return ( 
    <h3 
      className={classNames}
      onClick={props.clicked}>
      {props.category}
    </h3>
  );
}
 
export default category;