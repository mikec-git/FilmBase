import React from 'react';
import c from './Backdrop.module.scss';

const backdrop = (props) => (
  <div 
    className={c.Backdrop}
    onClick={() => props.clicked(null)}></div>  
);

export default backdrop;