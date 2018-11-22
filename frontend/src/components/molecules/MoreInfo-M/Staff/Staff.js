import React from 'react';

import Department from '../../../atoms/MoreInfo-A/Staff/Department';
import Job from '../../../atoms/MoreInfo-A/Staff/Job';
import Image from '../../../atoms/MoreInfo-A/Staff/Image';
import Name from '../../../atoms/MoreInfo-A/Staff/Name';
import Character from '../../../atoms/MoreInfo-A/Staff/Character';

import c from './Staff.module.scss';

const staff = (props) => {
  const character = props.character ? 
    <Character character={props.character} /> : null;

  const job = props.job ? 
    <Job job={props.job} /> : null;
    
  const department = props.department ? 
    <Department department={props.department} /> : null;

  return (  
    <div className={c.Staff}>
      <Name name={props.name} />
      <Image image={props.image} />
      {character}
      {job}
      {department}
    </div>
  );
}
 
export default staff;