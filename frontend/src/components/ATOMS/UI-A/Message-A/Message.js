import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import cancel from '../../../../assets/img/cancel.svg';
import c from './Message.module.scss';

class Message extends Component {
  state ={ 
    enter: true
  }

  componentDidMount() {
    setTimeout(() => this.setState({ enter: false }), 2500);
    this.timeoutId = setTimeout(this.props.clearMessage, 3000);
  }
  
  closeMessageHandler = () => {
    clearTimeout(this.timeoutId);
    this.props.clearMessage();
  }
  
  render() {
    const classNames = [c.Message];
  
    if(this.props.type === 'success') {
      classNames.push(c.Message_success);
    } else if(this.props.type === 'danger') {
      classNames.push(c.Message_danger);
    } else if(this.props.type === 'warning') {
      classNames.push(c.Message_warning);
    }
  
    return (
      <CSSTransition
        in={this.state.enter}
        appear
        timeout={300}
        classNames={{
          appear: c.msg_appear,
          appearActive: c.msg_appear_active,
          enterDone: c.msg_enter_done,
          exit: c.msg_exit,
          exitActive: c.msg_exit_active,
          exitDone: c.msg_exit_done
        }}>
        <div className={classNames.join(' ')}>
          <img 
            className={c.Message__Close} 
            onClick={this.closeMessageHandler}
            src={cancel} 
            alt="Close Message"/>
          {this.props.message}
        </div>
      </CSSTransition>
    );
  }
}
 
export default Message;