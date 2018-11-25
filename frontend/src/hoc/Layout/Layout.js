import React, { Component } from 'react';
import Navigation from '../../components/ORGANISMS/Navigation-O/Navigation';
import c from './Layout.module.scss';

class Layout extends Component {
  state = { 
    showSideDrawer: false
  }
  render() { 
    return (
      <div className={c.Layout}>
        <Navigation />
        <main className={c.Layout__Main}>{this.props.children}</main>
      </div>
    );
  }
}
 
export default Layout;