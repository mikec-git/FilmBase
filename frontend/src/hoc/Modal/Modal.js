import React from 'react';

import Backdrop from '../../components/atoms/UIAtoms/Backdrop/Backdrop';
import c from './Modal.module.scss';

const modal = (props) => {
  let modalComponent = null;
  if(props.showMovie) {
    modalComponent = (
      <>
        <Backdrop clicked={props.backdropClicked} />
        <div className={c.Modal}>
          {props.children}
        </div>
      </>
    );
  }
  return modalComponent;
}
 
export default modal;