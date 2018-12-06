import React, { Component } from 'react';
import Navigation from '../../components/ORGANISMS/Navigation-O/Navigation';
import Footer from '../../components/ORGANISMS/Footer-O/Footer';

import movie from '../../assets/img/movie.svg';
import tv from '../../assets/img/tv.svg';
import compass from '../../assets/img/compass.svg';
import c from './Layout.module.scss';

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
        path: '/login'
      }
    }
  }

  render() { 
    return (
      <div className={c.Layout}>
        <Navigation navItems={this.state.navItems}/>
        <main className={c.Layout__Main}>{this.props.children}</main>
        <Footer navItems={this.state.navItems} />
      </div>
    );
  }
}
 
export default Layout;