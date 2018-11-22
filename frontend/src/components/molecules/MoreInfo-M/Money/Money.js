import React from 'react';
import Money from '../../../atoms/MoreInfo-A/Money/Money';
import c from './Money.module.scss';

const money = (props) => {
  return ( 
    <div className={c.Money}>
      <h3 className={c.Money__Title}>{props.name}</h3>
      <img className={c.Money__Img} src={props.moneyImg} alt={props.name} />
      <Money money={props.money} />
    </div>
  );
}
 
export default money;