import React from 'react';

import Character from '../../../atoms/MoreInfoAtoms/CastCrew/Character';
import Image from '../../../atoms/MoreInfoAtoms/CastCrew/Image';
import Name from '../../../atoms/MoreInfoAtoms/CastCrew/Name';

import c from './Cast.module.scss';

const cast = (props) => {
  return (  
    <div className={c.Cast}>
      <Name name={props.name} />
      <Image image={props.image} />
      <Character character={props.character} />
    </div>
  );
}
 
export default cast;