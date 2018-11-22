import React from 'react';
import Money from '../../../molecules/MoreInfo-M/Money/Money';
import Budget from '../../../../assets/img/budget.svg';
import Revenue from '../../../../assets/img/money-bag.svg';
import c from './Money.module.scss';

const money = (props) => {
  return ( 
    <div className={c.Money}>
      <Money 
        money={String(props.budget)}
        name='Budget'
        moneyImg={Budget} />
      <Money 
        money={String(props.revenue)}
        name='Revenue'
        moneyImg={Revenue} />
    </div>
  );
}
 
export default money;