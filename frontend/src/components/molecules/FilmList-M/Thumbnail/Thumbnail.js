import React from 'react';
import { Link } from 'react-router-dom';
import FilmImage from '../../../atoms/Shared-A/FilmImage/FilmImage';
import Hearts from '../../../atoms/Shared-A/Hearts/Hearts';
import Rating from '../../../atoms/Shared-A/Rating/Rating';
import Title from '../../../atoms/Shared-A/Title/Title';
import c from './Thumbnail.module.scss';

const thumbnail = (props) => {
  // REGEX FOR VIDEO TYPE NAME
  const videoType = /\w+/ig.exec(props.pathBase);

  return (
    <div className={c.Thumbnail}>
      <Link 
        to={{
          pathname: props.pathBase + props.videoId,
          state: { modal: true, type: videoType[0] }
        }}
        className={c.Thumbnail__Item}
        onClick={() => props.showVideo(props.videoId)}>
        <FilmImage
          className='FilmImage__Thumbnail'
          imgSrc={props.image}
          imgAlt={props.title} />
        <div className={c.Thumbnail__Rating}>
          <Hearts
            className='Hearts__Thumbnail'
            rating={props.rating} />
          <Rating
            className='Rating__Thumbnail'
            rating={props.rating} />
        </div>
      </Link>
      <Title
        className='Title__Thumbnail'
        title={props.title} />
    </div>
  );
}
 
export default thumbnail;