import React from 'react';

import Department from '../../../atoms/MoreInfoAtoms/CastCrew/Department';
import Job from '../../../atoms/MoreInfoAtoms/CastCrew/Job';
import Image from '../../../atoms/MoreInfoAtoms/CastCrew/Image';
import Name from '../../../atoms/MoreInfoAtoms/CastCrew/Name';

import c from './Crew.module.scss';

const crew = (props) => {
  return (  
    <div className={c.Crew}>
      <Name name={props.name} />
      <Image image={props.image} />
      <Job job={props.job} />
      <Department department={props.department} />
    </div>
  );
}
 
export default crew;