import React from 'react';
import Arrow from '../ClickImage-A/ClickImage';
import leftArrowImg from '../../../../assets/img/arrow-left-circle.svg';
import rightArrowImg from '../../../../assets/img/arrow-right-circle.svg';
import c from './CarouselSecondary.module.scss';

const carouselSecondary = (props) => {
  const { context, showLength, list, type, clicked, carousel, element } = props;
  const listLength = list.length;

  let carouselSecondary = null;
  let classNames = [c.CarouselSecondary__List];

  if(context === 'moreInfo') {
    classNames.push(c.CarouselSecondary__List_MoreInfo);
  }

  let translateWidth = 0;
  if(element[type]) {
    const elementRect = element[type].getBoundingClientRect();
    translateWidth = parseInt((elementRect.right - elementRect.left + 55).toFixed(2), 10);
  }

  const arrowProps = { clicked, isCarouselSecondary: true, type, showLength, listLength, translateWidth };

  let rightArrow = (
    <Arrow      
      className={[c.CarouselSecondary__Arrow,c.CarouselSecondary__Arrow_right].join(' ')}
      context='arrowRound'
      clickParam='right'
      {...arrowProps}
      imgSrc={rightArrowImg}
      imgAlt='Right Arrow' />
  );

  let leftArrow = (
    <Arrow
      className={[c.CarouselSecondary__Arrow,c.CarouselSecondary__Arrow_left].join(' ')}
      context='arrowRound'
      clickParam='left'
      {...arrowProps}
      imgSrc={leftArrowImg}
      imgAlt='Left Arrow' />
  );

  if(listLength <= showLength) {
    rightArrow = null;
    leftArrow = null;
  }

  carouselSecondary = (
    <div className={c.CarouselSecondary__Wrapper}>
      {leftArrow}
      <div className={c.CarouselSecondary}>
        <div 
          className={classNames.join(' ')} 
          style={{transform: `translateX(${carousel[type].translate}px)`}}>
          {list}
        </div>
      </div>
      {rightArrow}
    </div>
  );

  return carouselSecondary;
}
 
export default carouselSecondary;