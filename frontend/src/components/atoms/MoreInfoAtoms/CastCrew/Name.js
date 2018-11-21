import React from 'react';
import c from './Name.module.scss';

const name = (props) => (
  <h4 className={c.Name}>{props.name}</h4>
);
 
export default name;