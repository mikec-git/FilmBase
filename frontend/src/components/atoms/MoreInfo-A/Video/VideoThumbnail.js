import React from 'react';
import c from './VideoThumbnail.module.scss';

const videoThumbnail = (props) => {
  const classNames = props.className ? 
    [c.VideoThumbnail, props.className].join(' ') : c.VideoThumbnail;
  return (
    <div className={c.VideoThumbnail__Overlay}>
      <img 
        className={classNames}
        src={props.videoThumbnail} 
        alt={`${props.videoTitle} Clip`}/>
    </div>
  )
}
 
export default videoThumbnail;