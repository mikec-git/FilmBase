import React from 'react';
import Staff from '../../../MOLECULES/MoreInfo-M/Staff-M/Staff';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';
import Reviews from '../../../MOLECULES/MoreInfo-M/Reviews-M/Reviews';
import Money from '../../../MOLECULES/MoreInfo-M/Money-M/Money';

import Budget from '../../../../assets/img/budget.svg';
import Revenue from '../../../../assets/img/money-bag.svg';
import c from './Body.module.scss';

const body = (props) => {
  let staffCast = 'Not Available';
  let staffCrew = 'Not Available';
  let reviews   = 'Not Available';

  if(props.staffListCast.length > 0) {
    staffCast = props.staffListCast.map(cast => {
      return (
        <Staff 
          key={cast.credit_id}
          name={cast.name} 
          character={cast.character}
          image={cast.profile_path} />
      )
    });
  } 
  
  if(props.staffListCrew.length > 0) {
    staffCrew = props.staffListCrew.map(crew => {
      return (
        <Staff 
          key={crew.credit_id}
          name={crew.name} 
          department={crew.department}
          job={crew.job}
          image={crew.profile_path} />
      )
    });
  } 
    
  if(props.reviewList.length > 0) {
    reviews = props.reviewList.map(review => {
      return (
        <Reviews 
          key={review.id} 
          author={review.author} 
          content={review.content} />
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
        <Subtitle subtitle='Cast' />
        <div className={c.Body__StaffMember}>{staffCast}</div>
      </div> 
      <div className={c.Body__Staff}>
        <Subtitle subtitle='Crew' />
        <div className={c.Body__StaffMember}>{staffCrew}</div>
      </div> 
      <div className={c.Body__Reviews}>
        <Subtitle subtitle='Reviews' />
        {reviews}
      </div>
    </section>
  );
}
 
export default body;