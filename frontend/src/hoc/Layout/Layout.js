import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from '../../components/ORGANISMS/Navigation-O/Navigation';
import Footer from '../../components/ORGANISMS/Footer-O/Footer';
import Message from '../../components/ATOMS/UI-A/Message-A/Message';

import movie from '../../assets/img/movie.svg';
import tv from '../../assets/img/tv.svg';
import compass from '../../assets/img/compass.svg';
import c from './Layout.module.scss';
import * as u from '../../shared/Utility';
import * as actionsProfile from '../../store/actions/ProfileActions';

class Layout extends Component {
  state = { 
    showSideDrawer: false,
    navItems: {
      movies: {
        name: 'Movies',
        navType: 'img',
        imgSrc: movie,
        imgAlt: 'Movies Nav',
        path: '/movie'
      },
      tv: {
        name: 'TV',
        navType: 'img',
        imgSrc: tv,
        imgAlt: 'TV Nav',
        path: '/tv'
      },
      discover: {
        name: 'Discover',
        navType: 'img',
        imgSrc: compass,
        imgAlt: 'Discover Nav',
        path: '/discover'
      },
      login: {
        name: 'Login',
        path: '/login',
        auth: false
      },
      profile: {
        name: 'Profile',
        path: '/profile',
        auth: true
      }
      //////////////// FIX FOOTER LOGIN/PROFILE SWAP
    }
  }

  render() { 
    let messages = null;
    if(u.isArrayGT(this.props.validationMessages, 0)) {
      messages = this.props.validationMessages.map(message => (
        <Message 
          key={message.id} 
          clearMessage={this.props.onClearMessage} 
          {...message} />
      ));
      
      messages = <div className={c.Layout__Message}>{messages}</div>;
    }

    return (
      <div className={c.Layout}>
        {messages}
        <Navigation navItems={this.state.navItems}/>
        <main className={c.Layout__Main}>{this.props.children}</main>
        <Footer navItems={this.state.navItems} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    validationMessages: state.profile.validationMessages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearMessage: () => dispatch(actionsProfile.clearValidationMessage())
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Layout);