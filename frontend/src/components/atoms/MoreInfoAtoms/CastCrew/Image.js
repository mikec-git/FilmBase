import React from 'react';
import NotAvailable from '../../../../assets/img/not-available.svg';
import Info from '../../../../assets/img/info.svg';
import c from './Image.module.scss';

const image = (props) => {
  let image = (
    <> 
      <img className={c.Image__Info} src={Info} alt={`More Info`}/>
      <img className={c.Image} src={props.image} alt={`${props.name}`}/>
    </>
  );

  if(!props.image) {
    image = <img className={c.Image__NA} src={NotAvailable} alt={`${props.name}`}/>;
  }

  return (
    <div className={c.Image__Wrapper}>
      {image}
    </div>
  );
};
 
export default image;