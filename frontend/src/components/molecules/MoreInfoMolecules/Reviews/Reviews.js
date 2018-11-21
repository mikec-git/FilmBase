import React from 'react';
import ReviewAuthor from '../../../atoms/MoreInfoAtoms/Reviews/ReviewAuthor';
import ReviewContent from '../../../atoms/MoreInfoAtoms/Reviews/ReviewContent';
import c from './Reviews.module.scss';

const reviews = (props) => {
  return (  
      <div className={c.Reviews}>
        <ReviewAuthor author={props.author} />
        <ReviewContent content={props.content} />
      </div>
  );
}
 
export default reviews;