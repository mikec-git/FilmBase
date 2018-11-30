import React, { Component } from 'react';
import Navigation from '../../components/ORGANISMS/Navigation-O/Navigation';
import Footer from '../../components/ORGANISMS/Footer-O/Footer';
import c from './Layout.module.scss';

class Layout extends Component {
  state = { 
    showSideDrawer: false,
    navItems: {
      movies: {
        name: 'Movies',
        path: '/'
      },
      tv: {
        name: 'TV',
        path: '/tv'
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
        <Navigation navItems={this.state.navItems} />
        <main className={c.Layout__Main}>{this.props.children}</main>
        <Footer navItems={this.state.navItems} />
      </div>
    );
  }
}
 
export default Layout;