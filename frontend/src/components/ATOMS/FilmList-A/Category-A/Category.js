import React from 'react';
import c from './Category.module.scss';

const category = (props) => {
  let classNames = c.Category;
  
  return ( 
    <h3 
      className={classNames}>
      {props.category}
    </h3>
  );
}
 
export default category;