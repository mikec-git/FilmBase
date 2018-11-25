import React from 'react';
import Staff from '../../../MOLECULES/MoreInfo-M/Staff-M/Staff';
import Subtitle from '../../../ATOMS/Shared-A/Subtitle-A/Subtitle';
import c from './Staff.module.scss';

const staff = (props) => {
  let staff = null;
  if(props.staffList) {
    staff = props.staffList.map(staff => {
      return (
        <Staff 
          key={staff.credit_id}
          name={staff.name} 
          department={staff.department}
          job={staff.job}
          character={staff.character}
          image={staff.profile_path} />
      )
    });
  }
    
  return ( 
    <div className={c.Staff}>
      <Subtitle subtitle={props.staffType} />
      <div className={c.Staff__Member}>{staff}</div>
    </div> 
  );
}
 
export default staff;