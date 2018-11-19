import React, { Component } from 'react';

import Header from '../../components/organisms/MoreInfo/MoreInfoHeader/MoreInfoHeader';

class MoreInfo extends Component {
  state = { 
    activeVideoId: this.props.movieDetails.videos[0].key,
    overviewExpanded: false,
    sideDrawerExpanded: true,
    youtubeState: null
  }  

  videoClickedHandler = (newVideoId) => {
    this.setState({ activeVideoId: newVideoId });
  };

  overviewToggleHandler = () => {
    this.setState(prevState => ({overviewExpanded: !prevState.overviewExpanded}));
  };
  
  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({sideDrawerExpanded: !prevState.sideDrawerExpanded}));
  };

  youtubeStateChangeHandler = (playerState) => {
    this.setState({ youtubeState: playerState });
  }

  render() {     
    return ( 
      <>
        <Header 
          movieDetails={this.props.movieDetails}
          activeVideoId={this.state.activeVideoId}
          videoClicked={this.videoClickedHandler}
          overviewExpanded={this.state.overviewExpanded}
          overviewToggle={this.overviewToggleHandler}
          sideDrawerExpanded={this.state.sideDrawerExpanded}
          sideDrawerToggle={this.sideDrawerToggleHandler}
          playerState={this.state.youtubeState}
          youtubeStateChanged={this.youtubeStateChangeHandler} />
      </>
    );
  }
}
 
export default MoreInfo;