import React from 'react';

import c from './Website.module.scss';

const website = (props) => (
  <a 
    className={c.Website}
    href={props.website} 
    target='_blank'
    rel='noopener noreferrer'>
    <h1 className={c.Website__Name}>{props.name}</h1>
  </a>
)
 
export default website;