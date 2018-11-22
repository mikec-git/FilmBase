import React from 'react';
import NavItem from '../../../atoms/Navigation-A/NavItem/NavItem';
import c from './NavItems.module.scss';

const navItems = (props) => {
  const navItems = props.navItems.map(navItem => {
    return <NavItem key={navItem.name} path={navItem.path} name={navItem.name} />
  });
  
  let classNames = Array.isArray(props.className) ? 
    [c.NavItems, ...props.className] : props.className ? 
    [c.NavItems, props.className] : [c.NavItems];

  return (
    <ul className={classNames.join(' ')}>
      {navItems}
    </ul>
  );
}
 
export default navItems;