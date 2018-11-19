import React from 'react';
import c from './Backdrop.module.scss';

const backdrop = (props) => (
  <div 
    className={c.Backdrop}
    onClick={props.clicked}>
  </div>  
);

export default backdrop;