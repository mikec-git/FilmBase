import React from 'react';
import c from './Tagline.module.scss';

const tagline = (props) => (
  <h3 className={c.Tagline}>{props.tagline}</h3>
)
 
export default tagline;