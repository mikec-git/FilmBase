import React from 'react';
import c from './Budget.module.scss';

const budget = (props) => {
  let budget = <dd className={c.Budget}>Not Available</dd>;
  if(props.budget > 0) {
    const commaBudget = props.budget.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    budget = <dd className={c.Budget}>${commaBudget} USD</dd>;
  }
  return budget;
}
 
export default budget;