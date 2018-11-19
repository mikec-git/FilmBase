import React from 'react';
import c from './MoreInfoHeader.module.scss';

import Youtube from '../../../atoms/MoreInfoAtoms/Youtube/Youtube';
import VideoList from '../../../molecules/MoreInfoMolecules/VideoList/VideoList';
import VideoSummary from '../../../molecules/MoreInfoMolecules/VideoSummary/VideoSummary';
import SideDrawerToggle from '../../../atoms/MoreInfoAtoms/SideDrawerToggle/SideDrawerToggle';

const moreInfo = (props) => {
  const movieDetails = props.movieDetails;
  const sideDrawerClasses = props.sideDrawerExpanded ? 
    c.MoreInfoHeader__SideDrawer :
    [c.MoreInfoHeader__SideDrawer, c.MoreInfoHeader__SideDrawer_shrink].join(' ');

  return ( 
    <header className={c.MoreInfoHeader}>
      <Youtube 
        videoId={props.activeVideoId}
        playerId={String(movieDetails.id)}
        playerStateChanged={props.youtubeStateChanged} />
      <SideDrawerToggle
        className={c.MoreInfoHeader__SideDrawerToggle}
        expanded={props.sideDrawerExpanded}
        expandToggle={props.sideDrawerToggle} />
      <div className={sideDrawerClasses}>
        <VideoSummary 
          className={c.MoreInfoHeader__Summary}
          videoGenre={movieDetails.genres}
          videoOverview={movieDetails.overview}
          videoReleaseDate={movieDetails.release_date}
          videoRuntime={movieDetails.runtime}
          videoTagline={movieDetails.tagline}
          videoTitle={movieDetails.title}
          videoWebsite={movieDetails.homepage}
          expanded={props.overviewExpanded}
          expandToggle={props.overviewToggle} />
        <VideoList 
          videoList={movieDetails.videos} 
          videoImage={movieDetails.backdrop_path}
          videoClicked={props.videoClicked}
          activeId={props.activeVideoId}
          playerState={props.playerState} />
      </div>
    </header>
  );
}
 
export default moreInfo;