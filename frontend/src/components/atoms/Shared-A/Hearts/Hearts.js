import React from 'react';
import FullHeart from '../../../../assets/img/full-heart.svg';
import HalfHeart from '../../../../assets/img/half-heart.svg';
import EmptyHeart from '../../../../assets/img/empty-heart.svg';
import c from './Hearts.module.scss';

const hearts = (props) => {
  const starCount = (Math.round(props.rating)/2).toFixed(1);
  let halfCounted = false;
  
  const hearts = Array.from({length: 5}, (_, index) => {
    if(index < (starCount|0)) {
      return <img 
        className={c[props.className]}
        key={index} 
        src={FullHeart} 
        alt='Full Heart' />;
    } else if((starCount%1) * 10 === 5 && !halfCounted) {
      halfCounted = true;
      return <img 
        className={c[props.className]}
        key={index}
        src={HalfHeart}
        alt='Half Heart' />;
    } 
    return <img 
      className={c[props.className]}
      key={index}
      src={EmptyHeart}
      alt='Empty Heart' />;
  });

  return <span className={c.Hearts}>{hearts}</span>;
}
 
export default hearts;
