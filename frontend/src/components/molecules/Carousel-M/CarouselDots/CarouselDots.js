import React from 'react';
import CarouselDot from '../../../atoms/Carousel-A/CarouselDot/CarouselDot';

const carouselDots = (props) => {
  let dots = null;
  
  if(props.videoList) {
    dots = (
      <div className={props.className}>
        {props.videoList.map(video => {
          return video.active ? 
            <CarouselDot key={video.id} id={video.id} active /> : 
            <CarouselDot clicked={props.clicked} key={video.id} id={video.id} />;
        })}
      </div>
    )
  }

  return dots;
}
 
export default carouselDots;