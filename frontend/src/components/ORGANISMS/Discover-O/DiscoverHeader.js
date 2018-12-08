import React from 'react';
import Title from '../../ATOMS/Shared-A/Title-A/Title';
import Filters from '../../MOLECULES/Discover-M/Filters-M/Filters';
import c from './DiscoverHeader.module.scss';

const discoverHeader = (props) => {
  
  return (
    <header className={c.DiscoverHeader}>
      <Title title={'Discover'} context='discover' />
      <Filters 
        stateKey='filters'
        applyFilters={props.applyFilters}
        inputChanged={props.updateInputValue}
        filters={props.filters} />
    </header>
  );
}
 
export default discoverHeader;