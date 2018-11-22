import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import c from './Time.module.scss';
momentDurationFormatSetup(moment);

const time = (props) => {    
  const classNames = props.className ? 
    [c.Time, props.className].join(' ') : c.Time;
  const time = props.timeType === 'runtime' ? 
    moment.duration(parseInt(props.time), 'minutes').format('h [hours] m [minutes]') : 
    moment(props.time).format('ddd, MMM Do YYYY');

  return ( 
    <dd className={classNames}>{time}</dd>
  );
}
 
export default time;