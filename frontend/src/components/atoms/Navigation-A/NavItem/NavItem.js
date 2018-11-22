import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './NavItem.module.scss';

const navItem = (props) => {
  return (
    <li className={c.NavItem}>
      <NavLink 
        to={props.path} exact
        className={c.NavItem__Link}
        activeClassName={c.NavItem_active}>
        {props.name}
      </NavLink>
    </li>
  );
}
 
export default navItem;