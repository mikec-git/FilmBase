import React from 'react';
import PageTitle from '../../ATOMS/Shared-A/PageTitle-A/PageTitle';
import Filters from '../../MOLECULES/Discover-M/Filters-M/Filters';
import c from './DiscoverHeader.module.scss';

const discoverHeader = (props) => {
  
  return (
    <header className={c.DiscoverHeader}>
      <PageTitle title='Discover' />
      <Filters 
        stateKey='filters'
        applyFilters={props.applyFilters}
        inputChanged={props.updateInputValue}
        filters={props.filters} />
    </header>
  );
}
 
export default discoverHeader;