import React from 'react';

const budget = (props) => {
  let budget = null;
  if(props.budget > 0) {
    const commaBudget = props.budget.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    budget = <dd>${commaBudget} (USD)</dd>;
  }
  return budget;
}
 
export default budget;