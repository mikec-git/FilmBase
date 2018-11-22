import React from 'react';

import Tagline from '../../../atoms/MoreInfo-A/Tagline/Tagline';
import Overview from '../../../atoms/MoreInfo-A/Overview/Overview';
import Genre from '../../../atoms/MoreInfo-A/Genre/Genre';
import Time from '../../../atoms/MoreInfo-A/Time/Time';
import Website from '../../../atoms/MoreInfo-A/Website/Website';

import c from './VideoSummary.module.scss';

const videoSummary = (props) => {  
  const classNames = props.className ? 
    [c.VideoSummary, props.className].join(' ') : c.VideoSummary;
    
  const details = props.details;

  const genres = [];
  Object.entries(details.genres).forEach(([_, value]) => {
    genres.push(
      <Genre key={value.id} genre={value.name} />
    );
  });

  const overviewText = props.expanded ? 
    details.overview : details.overview.substring(0, 100) + '...';

  const times = props.videoTimes.map(time => {
    return (
      <div key={time.name} className={c.VideoSummary__DescItem}>
        <dt className={c.VideoSummary__DescTitle}>{time.name}</dt>
          <Time
            className={c.VideoSummary__DescText}
            timeType={time.type}
            time={time.time} />
      </div>
    );
  });

  return ( 
    <div className={classNames}>
      <Website website={details.homepage} name={details.title} />
      <Tagline tagline={details.tagline} />
      <div className={c.VideoSummary__Genres}>{genres}</div>
      <dl className={c.VideoSummary__DescList}>{times}</dl>
      <Overview 
        className={c.VideoSummary__Overview}
        overview={overviewText}
        expanded={props.expanded}
        clicked={props.expandToggle} />
    </div>
  );
}
 
export default videoSummary;