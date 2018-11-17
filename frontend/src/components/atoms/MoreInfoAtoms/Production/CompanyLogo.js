import React from 'react';

const companyLogo = (props) => (
  <img src={props.companyLogo} alt={`${props.companyName} Logo`} />
)
 
export default companyLogo;