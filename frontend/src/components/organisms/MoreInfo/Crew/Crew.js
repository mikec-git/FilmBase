import React from 'react';
import Crew from '../../../molecules/MoreInfoMolecules/Crew/Crew';
import c from './Crew.module.scss';

const crew = (props) => {
  let crew = null;
  if(props.crewList) {
    crew = props.crewList.map(crew => {
      return (
        <Crew 
          key={crew.credit_id}
          name={crew.name} 
          department={crew.department}
          job={crew.job}
          image={crew.profile_path} />
      )
    });
  }
  return ( 
    <div className={c.Crew}>
      <h3 className={c.Crew__Title}>Crew</h3>
      <div className={c.Crew__Crew}>
        {crew}
      </div>
    </div> 
  );
}
 
export default crew;