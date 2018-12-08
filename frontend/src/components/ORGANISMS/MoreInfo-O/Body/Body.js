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
      crewCarousel  = <p className={c.Body__NotAvailable}>Not Available</p>,
      showLength    = 5;

  if(u.isArrayGT(props.staffListCast, 0)) {
    staffCast = props.staffListCast.map(cast => {
      return (
        <Staff 
          key={cast.credit_id}
          staffRef={props.castRef}
          name={cast.name} 
          character={cast.character}
          image={cast.profile_path} />
      )
    });
    
    castCarousel = (
      <CarouselSecondary 
        context='moreInfo'
        element={props.staffElement}
        clicked={props.arrowClicked}
        type='cast'
        carousel={props.carousel}
        showLength={showLength}
        list={staffCast} />
    );
  } 
  
  if(u.isArrayGT(props.staffListCrew, 0)) {
    staffCrew = props.staffListCrew.map(crew => {
      return (
        <Staff 
          key={crew.credit_id}
          staffRef={props.crewRef}
          name={crew.name} 
          department={crew.department}
          job={crew.job}
          image={crew.profile_path} />
      )
    });

    crewCarousel = (
      <CarouselSecondary 
        context='moreInfo'
        element={props.staffElement}
        clicked={props.arrowClicked}
        type='crew'
        carousel={props.carousel}
        showLength={showLength}
        list={staffCrew} />
    );
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
        {/* <div className={c.Body__StaffMember}>{staffCast}</div> */}
        {castCarousel}
      </div> 
      <div className={c.Body__Staff}>
        <Subtitle context='moreInfo' subtitle='Crew' />
        {/* <div className={c.Body__StaffMember}>{staffCrew}</div> */}
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