import React from 'react';
import c from './Character.module.scss';

const character = (props) => (
  <dd className={c.Character}>{props.character}</dd>
);
 
export default character;