import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Backdrop from '../../components/atoms/UIAtoms/Backdrop/Backdrop';
import c from './Modal.module.scss';

class Modal extends Component {
  goBack = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
    this.props.modalClosed();
  }

  render() {
    return (
      <>
        <Backdrop clicked={this.goBack} />
        <div className={c.Modal}>
          {this.props.children}
        </div>
      </>
    );
  }
}
 
export default withRouter(Modal);