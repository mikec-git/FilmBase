import React from 'react';
import c from './Department.module.scss';

const department = (props) => (
  <span className={c.Department}>({props.department})</span>
);
 
export default department;