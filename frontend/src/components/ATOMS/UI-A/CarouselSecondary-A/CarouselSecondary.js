import React from 'react';
import Slider from 'react-slick';
import Arrow from '../ClickImage-A/ClickImage';
import leftArrowImg from '../../../../assets/img/arrow-left-circle.svg';
import rightArrowImg from '../../../../assets/img/arrow-right-circle.svg';
import './CarouselSecondary.scss';

const carouselSecondary = (props) => {
  let { slidesToShow, slidesToScroll, list } = props;
  const listLength = list.length;

  let rightArrow = {
    context: 'arrowRound',
    clickParam: 'right',
    imgSrc: rightArrowImg,
    imgAlt: 'Right Arrow'
  }

  let leftArrow = {
    context: 'arrowRound',
    clickParam: 'left',
    imgSrc: leftArrowImg,
    imgAlt: 'Left Arrow'
  };

  if(listLength < slidesToShow) {
    slidesToShow = listLength;
  }

  let settings = {
    slidesToScroll: slidesToScroll,
    slidesToShow: slidesToShow,
    infinite: true,
    dots: true,    
    speed: 500,
    centerMode: true,
    draggable: false,
    nextArrow: <Arrow {...rightArrow} />,
    prevArrow: <Arrow {...leftArrow} />,
    arrows: listLength > slidesToShow,
    centerMode: listLength <= slidesToShow
  }

  if(listLength > 0) {
    return <Slider {...settings}>{list}</Slider>;
  }

  return null;
}
 
export default carouselSecondary;