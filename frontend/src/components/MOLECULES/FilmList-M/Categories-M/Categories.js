import React from 'react';
import Category from '../../../ATOMS/FilmList-A/Category-A/Category';
import c from './Categories.module.scss';

const categories = (props) => {
  return (
    <div className={c.Categories}>
      <Category 
        active={props.activeCategory} 
        clicked={props.categoryClicked} 
        category='Out Now' />
      <Category 
        active={props.activeCategory} 
        clicked={props.categoryClicked} 
        category='Upcoming' />
      <Category 
        active={props.activeCategory} 
        clicked={props.categoryClicked} 
        category='Popular' />
    </div>
  );
}
 
export default categories;