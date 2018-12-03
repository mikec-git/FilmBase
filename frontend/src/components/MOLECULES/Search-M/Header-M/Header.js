import React from 'react';
import Title from '../../../ATOMS/Shared-A/Title-A/Title';

import c from './Header.module.scss';

const header = (props) => {
  return (
    <header className={c.Header}>
      <Title title={props.resultsTitle} context='search' />
    </header>
  );
}
 
export default header;