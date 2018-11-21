import React from 'react';
import Revenue from '../../../atoms/MoreInfoAtoms/BudgetRevenue/Revenue';
import MoneyBag from '../../../../assets/img/money-bag.svg';
import c from './Revenue.module.scss';

const revenue = (props) => {

  return ( 
    <div className={c.Revenue}>
      <h3 className={c.Revenue__Title}>Revenue</h3>
      <img className={c.Revenue__Img} src={MoneyBag} alt="Money Bag"/>
      <Revenue revenue={props.revenue} />
    </div>
  );
}
 
export default revenue;