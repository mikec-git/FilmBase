import React from 'react';

const revenue = (props) => {
  let revenue = null;
  if(props.revenue > 0) {
    const commaRevenue = props.revenue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    revenue = <dd>${commaRevenue} (USD)</dd>;
  }
  return revenue;
}
 
export default revenue;