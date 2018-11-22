import React from 'react';
import ReviewAuthor from '../../../atoms/MoreInfo-A/Reviews/ReviewAuthor';
import ReviewContent from '../../../atoms/MoreInfo-A/Reviews/ReviewContent';
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