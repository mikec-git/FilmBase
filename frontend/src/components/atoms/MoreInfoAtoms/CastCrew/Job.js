import React from 'react';
import c from './Job.module.scss';

const job = (props) => (
  <h4 className={c.Job}>{props.job}</h4>
);
 
export default job;