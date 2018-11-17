import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const runtime = (props) => {
  const runtime = moment.duration(parseInt(props.runtime), 'minutes').format('h [hours] m [minutes]');

  return ( 
    <dd>{runtime}</dd>
  );
}
 
export default runtime;