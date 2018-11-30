import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Searchbar from '../../MOLECULES/Navigation-M/Searchbar-M/Searchbar';
import NavItems from '../../MOLECULES/Navigation-M/NavItems-M/NavItems';
import Image from '../../ATOMS/UI-A/ClickImage-A/ClickImage';

import Search from '../../../assets/img/search.svg';
import Logo from '../../../assets/img/clapperboard-Logo.svg';
import c from './Navigation.module.scss';

class Navigation extends Component {
  state = { 
    searchbar: {
      searchInput: { 
        id: 'searchInput',
        config: { 
          type: 'text',
          placeholder: 'Search...'
        },
        value: ''
      },
      submit: { 
        config: { type: 'submit' },
        src: Search,
        alt: 'Search'
      },
      touched: false
    }
  };

  inputChangedHandler = (e, elementName) => {
    this.setState({ 
      searchbar: {
        ...this.state.searchbar,
        [elementName]: {
          ...this.state.searchbar[elementName],
          value: e.target.value
        },
        touched: true
      }
    });
  }

  searchSubmitHandler = () => {
    console.log("search Submitted");
    
  }

  logoClickedHandler = () => {
    this.props.history.push('/');
  }

  render() { 
    let navigationLinks = [];
    for (let key in this.props.navItems) {
      navigationLinks.push(this.props.navItems[key]);
    }

    return (
      <nav className={c.Navigation}>
        <Image
          className={c.Navigation__Logo}
          clicked={this.logoClickedHandler}
          imgSrc={Logo}
          imgAlt='FilmBase Logo' />
        <Searchbar 
          className={c.Navigation__Searchbar}
          searchbar={this.state.searchbar} 
          onChange={this.inputChangedHandler}
          onSubmit={this.searchSubmitHandler} />
        <NavItems 
          className={c.Navigation__NavItems}
          navItems={navigationLinks} />
      </nav>
    );
  }
}
 
export default withRouter(Navigation);