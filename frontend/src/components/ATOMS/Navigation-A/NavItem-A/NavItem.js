import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './NavItem.module.scss';

const navItem = (props) => {
  let content = null;
  if(props.navType === 'img') {
    content = <img 
      className={c.NavItem__Img} 
      src={props.imgSrc} 
      alt={props.imgAlt} />
  } else if(props.name && !props.imgSrc) {
    content = props.name;
  }

  return (
    <li className={c.NavItem}>
      <NavLink 
        to={props.path}
        className={c.NavItem__Link}
        activeClassName={c.NavItem_active}>
        {content}
      </NavLink>
    </li>
  );
}
 
export default navItem;