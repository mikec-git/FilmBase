import React from 'react';
import Reviews from '../../../MOLECULES/MoreInfo-M/Reviews-M/Reviews';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';
import c from './Reviews.module.scss';

const reviews = (props) => {
  let reviews = null;

  if(props.reviewList.length > 0) {
    reviews = props.reviewList.map(review => {
      return (
        <Reviews 
          key={review.id} 
          author={review.author} 
          content={review.content} />
      );
    });
  }
  return (
    <div className={c.Reviews}>
      <Subtitle subtitle='Reviews' />
      {reviews}
    </div>

  )
}
 
export default reviews;