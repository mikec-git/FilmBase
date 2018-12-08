import React, { Component } from 'react';

import Header from '../../components/ORGANISMS/MoreInfo-O/Header/Header';
import Body from '../../components/ORGANISMS/MoreInfo-O/Body/Body';
import c from './MoreInfo.module.scss';

class MoreInfo extends Component {
  state = { 
    activeVideoId: this.props.videoDetails.videos[0] && this.props.videoDetails.videos[0].key,
    overviewExpanded: false,
    sideDrawerExpanded: true,
    youtubeState: null,
    reviewExpanded: {},
    carousel: {
      cast: {
        index: 0,
        translate: 0
      },
      crew: {
        index: 0,
        translate: 0
      }
    },
    staffElement: {
      cast: null,
      crew: null
    }
  }  

  castRef = React.createRef();
  crewRef = React.createRef();

  componentDidMount() {
    this.setState({ staffElement: {
      cast: this.castRef.current,
      crew: this.crewRef.current
    }});
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

  reviewClickedHandler = (id) => {
    if(this.state.reviewExpanded.hasOwnProperty(id)) {
      this.setState(prevState => {
        return { 
          ...this.state, 
          reviewExpanded: { 
            ...this.state.reviewExpanded, 
            [id]: !prevState.reviewExpanded[id]
          }
        };
      });
    } else {
      this.setState({ 
          ...this.state, 
          reviewExpanded: { ...this.state.reviewExpanded, [id]: true }
      });
    }
  }

  carouselArrowClickedHandler = (direction, type, length, translate, showLength) => {
    const { carousel } = this.state;
    if(direction === 'left') {
      if(carousel[type].index === 0) {
        this.setState({ 
          ...this.state, carousel: { 
            ...carousel, [type]: { 
              ...carousel[type], 
              index: length-showLength, 
              translate: translate * -(length-showLength) }}});
      } else {
        this.setState({ 
          ...this.state, carousel: { 
            ...carousel, [type]: { 
              index: carousel[type].index - 1, 
              translate: carousel[type].translate + translate }} });
      }
    } else if(direction === 'right') {
      if(carousel[type].index === length - showLength) {
        this.setState({ ...this.state, carousel: { ...carousel, [type]: { 
          index: 0, 
          translate: 0 }} });
        } else {
          this.setState({ ...this.state, carousel: { ...carousel, [type]: { 
          index: carousel[type].index + 1, 
          translate: carousel[type].translate - translate }} });
      }
    }
  }

  render() {
    return ( 
      <div className={c.MoreInfo}>
        <Header 
          type={this.props.type}
          videoDetails={this.props.videoDetails}
          activeVideoId={this.state.activeVideoId}
          overviewExpanded={this.state.overviewExpanded}
          sideDrawerExpanded={this.state.sideDrawerExpanded}
          playerState={this.state.youtubeState}
          overviewToggle={this.overviewToggleHandler}
          sideDrawerToggle={this.sideDrawerToggleHandler}
          videoClicked={this.videoClickedHandler}
          youtubeStateChanged={this.youtubeStateChangeHandler} />
        <Body 
          castRef={this.castRef}
          crewRef={this.crewRef}
          staffElement={this.state.staffElement}
          arrowClicked={this.carouselArrowClickedHandler}
          carousel={this.state.carousel}
          budget={this.props.videoDetails.budget}
          revenue={this.props.videoDetails.revenue}
          staffListCast={this.props.videoDetails.cast}
          staffListCrew={this.props.videoDetails.crew}
          reviewList={this.props.videoDetails.reviews}
          isReviewExpanded={this.state.reviewExpanded}
          reviewClicked={this.reviewClickedHandler} />
      </div>
    );
  }
}
 
export default MoreInfo;