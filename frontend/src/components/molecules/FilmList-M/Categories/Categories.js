import React from 'react';
import Category from '../../../atoms/FilmList-A/Category/Category';
import c from './Categories.module.scss';

const categories = (props) => {
  return (
    <div className={c.Categories}>
      <Category active category='Out Now' />
      <Category category='Upcoming' />
      <Category category='Popular' />
    </div>
  );
}
 
export default categories;