import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


import Backdrop from '../../components/atoms/UI-A/Backdrop/Backdrop';
import c from './Modal.module.scss';

class Modal extends Component {
  targetRef = React.createRef();
  targetElement = null;

  componentDidMount() {
    this.targetElement = this.targetRef.current;
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    enableBodyScroll(this.targetElement);
    clearAllBodyScrollLocks();
  }

  goBack = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
    this.props.modalClosed();
  }

  render() {
    return (
      <>
        <Backdrop clicked={this.goBack} />
        <div ref={this.targetRef} className={c.Modal}>
          {this.props.children}
        </div>
      </>
    );
  }
}
 
export default withRouter(Modal);