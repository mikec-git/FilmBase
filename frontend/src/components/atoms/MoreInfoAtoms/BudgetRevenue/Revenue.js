import React from 'react';
import c from './Revenue.module.scss';

const revenue = (props) => {
  let revenue = <dd className={c.Revenue}>Not Available</dd>;
  if(props.revenue > 0) {
    const commaRevenue = props.revenue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    revenue = <dd className={c.Revenue}>${commaRevenue} USD</dd>;
  }
  return revenue;
}
 
export default revenue;