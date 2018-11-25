import React from 'react';
import c from './ReviewContent.module.scss';

const reviewContent = (props) => {
  let content = null;
  if(props.content) {
    content = <p className={c.ReviewContent}>{props.content}</p>
  }
  return content;
}
 
export default reviewContent;