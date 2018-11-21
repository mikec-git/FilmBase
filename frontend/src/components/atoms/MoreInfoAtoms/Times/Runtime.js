import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import c from './Runtime.module.scss';
momentDurationFormatSetup(moment);

const runtime = (props) => {    
  const classNames = props.className ? 
    [c.Runtime, props.className].join(' ') : c.Runtime;
  const runtime = moment.duration(parseInt(props.runtime), 'minutes').format('h [hours] m [minutes]');

  return ( 
    <dd className={classNames}>{runtime}</dd>
  );
}
 
export default runtime;