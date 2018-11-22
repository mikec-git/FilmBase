import React from 'react';

import Youtube from '../../../atoms/MoreInfo-A/Youtube/Youtube';
import SideDrawerToggle from '../../../atoms/MoreInfo-A/SideDrawerToggle/SideDrawerToggle';
import VideoList from '../../../molecules/MoreInfo-M/VideoList/VideoList';
import VideoSummary from '../../../molecules/MoreInfo-M/VideoSummary/VideoSummary';
import c from './Header.module.scss';

const header = (props) => {
  const details = props.videoDetails;
  const sideDrawerClasses = props.sideDrawerExpanded ? 
    c.Header__SideDrawer :
    [c.Header__SideDrawer, c.Header__SideDrawer_shrink].join(' ');

  const times = [
    { name: 'Release Date', type: 'release', time: details.release_date },
    { name: 'Runtime', type: 'runtime', time: details.runtime },
  ];

  return ( 
    <header className={c.Header}>
      <Youtube 
        videoId={props.activeVideoId}
        playerId={String(details.id)}
        playerStateChanged={props.youtubeStateChanged} />
      <SideDrawerToggle
        className={c.Header__SideDrawerToggle}
        expanded={props.sideDrawerExpanded}
        expandToggle={props.sideDrawerToggle} />
      <div className={sideDrawerClasses}>
        <VideoSummary 
          className={c.Header__Summary}
          details={details}
          videoTimes={times}
          expanded={props.overviewExpanded}
          expandToggle={props.overviewToggle} />
        <VideoList 
          videoList={details.videos} 
          videoImage={details.backdrop_path}
          videoClicked={props.videoClicked}
          activeId={props.activeVideoId}
          playerState={props.playerState} />
      </div>
    </header>
  );
}
 
export default header;