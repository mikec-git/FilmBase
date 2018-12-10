import React from 'react';
import Staff from '../../../MOLECULES/MoreInfo-M/Staff-M/Staff';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';
import Reviews from '../../../MOLECULES/MoreInfo-M/Reviews-M/Reviews';
import Money from '../../../MOLECULES/MoreInfo-M/Money-M/Money';
import CarouselSecondary from '../../../ATOMS/UI-A/CarouselSecondary-A/CarouselSecondary';

import Budget from '../../../../assets/img/budget.svg';
import Revenue from '../../../../assets/img/money-bag.svg';
import c from './Body.module.scss';
import * as u from '../../../../shared/Utility';

const body = (props) => {
  let staffCast     = null,
      staffCrew     = null,
      reviews       = <p className={c.Body__NotAvailable}>Not Available</p>,
      castCarousel  = <p className={c.Body__NotAvailable}>Not Available</p>,
      crewCarousel  = <p className={c.Body__NotAvailable}>Not Available</p>;

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1
  }

  if(u.isArrayGT(props.staffListCast, 0)) {
    staffCast = props.staffListCast.map(cast => {
      return (
        <Staff 
          key={cast.credit_id}
          name={cast.name} 
          character={cast.character}
          image={cast.profile_path} />);
    });
    
    castCarousel = <CarouselSecondary {...settings} list={staffCast} />;
  } 
  
  if(u.isArrayGT(props.staffListCrew, 0)) {
    staffCrew = props.staffListCrew.map(crew => {
      return (
        <Staff 
          key={crew.credit_id}
          name={crew.name} 
          department={crew.department}
          job={crew.job}
          image={crew.profile_path} />);
    });

    crewCarousel = <CarouselSecondary {...settings} list={staffCrew} />;
  } 
    
  if(props.reviewList.length > 0) {
    reviews = props.reviewList.map(review => {
      return (
        <Reviews 
          key={review.id} 
          id={review.id}
          author={review.author} 
          content={review.content}
          isExpanded={props.isReviewExpanded}
          reviewClicked={props.reviewClicked} />
      );
    });
  }
  
  const money = (
    <>
      <Money 
        money={String(props.budget)}
        name='Budget'
        moneyImg={Budget} />
      <Money 
        money={String(props.revenue)}
        name='Revenue'
        moneyImg={Revenue} />
    </>
  );
  
  return (
    <section className={c.Body}>
      <div className={c.Body__Money}>
        {money}
      </div>
      <div className={c.Body__Staff}>
        <Subtitle context='moreInfo' subtitle='Cast' />
        {castCarousel}
      </div> 
      <div className={c.Body__Staff}>
        <Subtitle context='moreInfo' subtitle='Crew' />
        {crewCarousel}
      </div> 
      <div className={c.Body__Reviews}>
        <Subtitle context='moreInfo' subtitle='Reviews' />
        {reviews}
      </div>
    </section>
  );
}
 
export default body;