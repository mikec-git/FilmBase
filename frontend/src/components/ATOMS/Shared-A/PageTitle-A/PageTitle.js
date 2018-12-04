import React from 'react';
import c from './PageTitle.module.scss';

const pageTitle = (props) => {
  return ( 
    <h1 className={c.PageTitle}>{props.title}</h1>
  );
}
 
export default pageTitle;