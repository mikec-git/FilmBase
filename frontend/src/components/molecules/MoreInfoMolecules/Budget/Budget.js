import React from 'react';
import Budget from '../../../atoms/MoreInfoAtoms/BudgetRevenue/Budget';
import Money from '../../../../assets/img/budget.svg';
import c from './Budget.module.scss';

const budget = (props) => {

  return ( 
    <div className={c.Budget}>
      <h3 className={c.Budget__Title}>Budget</h3>
      <img className={c.Budget__Img} src={Money} alt="Budget"/>
      <Budget budget={props.budget} />
    </div>
  );
}
 
export default budget;