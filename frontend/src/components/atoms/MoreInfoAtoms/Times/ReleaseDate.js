import React from 'react';
import moment from 'moment';
// import c from './ReleaseDate.module.scss';

const releaseDate = (props) => {
  // const classNames = props.className ? 
  //   [c.ReleaseDate, ...props.className].join(' ') : c.ReleaseDate;
  
    const releaseDate = moment(props.releaseDate).format('ddd, MMM Do YYYY');

  return ( 
    <dd className={props.className}>{releaseDate}</dd>
  );
};
 
export default releaseDate;