import React from 'react';
import Cast from '../../../molecules/MoreInfoMolecules/Cast/Cast';
import c from './Cast.module.scss';

const cast = (props) => {
  let cast = null;
  if(props.castList) {
    cast = props.castList.map(cast => {
      return (
        <Cast 
          key={cast.credit_id}
          name={cast.name} 
          character={cast.character} 
          image={cast.profile_path} />
      )
    });
  }
  return ( 
    <div className={c.Cast}>
      <h3 className={c.Cast__Title}>Cast</h3>
      <div className={c.Cast__Cast}>
        {cast}
      </div>
    </div> 
  );
}
 
export default cast;