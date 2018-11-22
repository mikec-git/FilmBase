import React from 'react';
import c from './ReviewAuthor.module.scss';

const reviewAuthor = (props) => {
  let author = null;
  if(props.author) {
    author = <h3 className={c.ReviewAuthor}>{props.author}</h3>
  }
  return author;
}
 
export default reviewAuthor;