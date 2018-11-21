import React, { Component } from 'react';

import Header from '../../components/organisms/MoreInfo/Header/Header';
import Money from '../../components/organisms/MoreInfo/Money/Money';
import Cast from '../../components/organisms/MoreInfo/Cast/Cast';
import Crew from '../../components/organisms/MoreInfo/Crew/Crew';
import Reviews from '../../components/organisms/MoreInfo/Reviews/Reviews';
import c from './MoreInfo.module.scss';

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
    console.log(this.props.movieDetails);  
    return ( 
      <div className={c.MoreInfo}>
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
        <Money
          movieBudget={this.props.movieDetails.budget}
          movieRevenue={this.props.movieDetails.revenue} />
        <Cast
          castList={this.props.movieDetails.cast} />
        <Crew
          crewList={this.props.movieDetails.crew} />
        <Reviews reviewList={this.props.movieDetails.reviews} />
      </div>
    );
  }
}
 
export default MoreInfo;