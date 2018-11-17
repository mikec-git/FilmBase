import React from 'react';

const image = (props) => (
  <img src={props.image} alt={`${props.name} Photo`}/>
);
 
export default image;