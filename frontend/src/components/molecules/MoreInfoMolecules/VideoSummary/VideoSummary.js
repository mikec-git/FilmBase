import React from 'react';

import Tagline from '../../../atoms/MoreInfoAtoms/Tagline/Tagline';
import Overview from '../../../atoms/MoreInfoAtoms/Overview/Overview';
import Genre from '../../../atoms/MoreInfoAtoms/Genre/Genre';
import ReleaseDate from '../../../atoms/MoreInfoAtoms/Times/ReleaseDate';
import Runtime from '../../../atoms/MoreInfoAtoms/Times/Runtime';
import Website from '../../../atoms/MoreInfoAtoms/Website/Website';

import c from './VideoSummary.module.scss';

const videoSummary = (props) => {  
  const classNames = props.className ? 
    [c.VideoSummary, props.className].join(' ') : c.VideoSummary;

  const genres = [];
  Object.entries(props.videoGenre).forEach(([_, value]) => {
    genres.push(
      <Genre key={value.id} genre={value.name} />
    );
  });

  const overviewText = props.expanded ? props.videoOverview :
    props.videoOverview.substring(0, 100) + '...';

  return ( 
    <div className={classNames}>
      <Website website={props.videoWebsite} name={props.videoTitle} />
      <Tagline tagline={props.videoTagline} />
      <div className={c.VideoSummary__Genres}>
        {genres}        
      </div>
      <dl className={c.VideoSummary__DescList}>
        <div className={c.VideoSummary__DescItem}>
          <dt className={c.VideoSummary__DescTitle}>Release Date:</dt>
          <ReleaseDate 
            releaseDate={props.videoReleaseDate}
            className={c.VideoSummary__DescText} />
        </div>
        <div className={c.VideoSummary__DescItem}>
          <dt className={c.VideoSummary__DescTitle}>Runtime:</dt>
          <Runtime 
            runtime={props.videoRuntime}
            className={c.VideoSummary__DescText} />
        </div>
      </dl>
      <Overview 
        className={c.VideoSummary__Overview}
        overview={overviewText}
        expanded={props.expanded}
        clicked={props.expandToggle} />
    </div>
  );
}
 
export default videoSummary;