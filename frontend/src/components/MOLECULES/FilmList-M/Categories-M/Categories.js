import React from 'react';
import Category from '../../../ATOMS/FilmList-A/Category-A/Category';
import c from './Categories.module.scss';

const categories = (props) => {
  const categories = props.categoryNames.map(categoryName => {
    return (
      <Category 
        key={categoryName}
        active={props.activeCategory} 
        clicked={props.categoryClicked} 
        category={categoryName} />
    );
  })
  return (
    <div className={c.Categories}>
      {categories}
    </div>
  );
}
 
export default categories;