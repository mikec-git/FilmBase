import React from 'react';
import Reviews from '../../../molecules/MoreInfoMolecules/Reviews/Reviews';
import c from './Reviews.module.scss';

const reviews = (props) => {
  let reviews = null;
  let reviewsTitle = null;
  if(props.reviewList.length > 0) {
    reviews = props.reviewList.map(review => {
      return <Reviews key={review.id} author={review.author} content={review.content} />
    });
    reviewsTitle = <h3 className={c.Reviews__Title}>Reviews</h3>;
  }
  return (
    <div className={c.Reviews}>
      {reviewsTitle}
      {reviews}
    </div>

  )
}
 
export default reviews;