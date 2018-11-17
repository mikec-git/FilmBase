import React from 'react';
import moment from 'moment';

const releaseDate = (props) => {
  const releaseDate = moment(props.releaseDate).format('dddd, MMMM Do YYYY');
  return ( 
    <dd style={{zIndex: '999'}}>{releaseDate}</dd>
  );
};
 
export default releaseDate;