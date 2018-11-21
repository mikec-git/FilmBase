import React from 'react';
import Budget from '../../../molecules/MoreInfoMolecules/Budget/Budget';
import Revenue from '../../../molecules/MoreInfoMolecules/Revenue/Revenue';
import c from './Money.module.scss';

const money = (props) => {
  return ( 
    <div className={c.Money}>
      <Budget budget={String(props.movieBudget)} />
      <Revenue revenue={String(props.movieRevenue)} />
    </div>
  );
}
 
export default money;