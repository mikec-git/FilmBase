import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Searchbar from '../../molecules/Navigation/Searchbar/Searchbar';
import NavItems from '../../molecules/Navigation/NavItems/NavItems';
import Image from '../../atoms/UIAtoms/Image/ClickImage';

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
    },
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
    for (let key in this.state.navItems) {
      navigationLinks.push(this.state.navItems[key]);
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