import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/ORGANISMS/Carousel-O/Carousel';
import Categories from '../../components/MOLECULES/FilmList-M/Categories-M/Categories';
import FilmList from '../../components/ORGANISMS/FilmList-O/FilmList';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';

import * as actions from '../../store/actions/TVActions';

class TV extends Component {
  carouselSlideRef  = React.createRef();

  state = {
    activeCategory: 'Airing Today',
    categoryNames: ['Airing Today', 'On The Air', 'Popular']
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resizeSlide);
    this.props.onFetchTVInit();
    this.startInterval();
  }
  
  componentWillUnmount() {
    clearInterval(this.timeoutID);
    window.removeEventListener('resize', this.resizeSlide);
    this.props.onResetTranslateTV();
  }
  
  componentDidUpdate() {
    if(this.modalOpened && this.props.history.action === 'POP' && (!this.props.location.state || !this.props.location.state.modal)) {
      this.startInterval();
      this.modalOpened = false;
    }    
  }
  
  // Start auto rotation of carousel
  startInterval = () => {
    this.timeoutID = setInterval(() => this.arrowClickedHandler('right'), 5000);
  }

  // Manual changing of carousel tv
  dotClickedHandler = (tvId) => {
    this.props.onChangeCarouselTV(tvId, this.carouselSlideRef.current);
    this.resetCarouselAutoSlide();
  }
  
  arrowClickedHandler = (arrow) => {
    this.props.onChangeCarouselTVArrow(arrow, this.carouselSlideRef.current, this.props.showLength);
    this.resetCarouselAutoSlide();
  }
  
  resetCarouselAutoSlide = () => {
    clearInterval(this.timeoutID);
    this.startInterval()
  }
  
  // Adjust carousel translate amount on window resize
  resizeSlide = () => { 
    this.props.onResizeCarouselSlide(this.carouselSlideRef.current);
  }

  // Get tv details
  getTVDetailsHandler = (tvId) => {
    this.props.onGetTVDetails(tvId); 
    clearInterval(this.timeoutID);
    this.modalOpened = true;
  }

  categoryClickedHandler = (category) => {
    this.setState({ activeCategory: category });
  }
  
  render() { 
    let carousel    = null,
        categories  = null,
        content     = null,
        filmList    = [];

    if(this.props.initLoaded) {
      const tvPathBase = this.props.location.pathname,
            airingTodayTV = this.props.tv['airingToday'].videos;
            
      carousel = <Carousel 
        videos={airingTodayTV.slice(0, this.props.showLength)}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        videoClicked={this.getTVDetailsHandler}
        pathBase={tvPathBase} />;

      Object.entries(this.props.tv).forEach(([_, tvList]) => {
        filmList.push(<FilmList
          key={tvList.category}
          category={tvList.category}
          filmList={tvList.videos.slice(0, this.props.listLength)}
          videoClicked={this.getTVDetailsHandler}
          activeCategory={this.state.activeCategory}
          pathBase={tvPathBase} />);
      });

      categories = <Categories 
        categoryClicked={this.categoryClickedHandler}
        activeCategory={this.state.activeCategory}
        categoryNames={this.state.categoryNames} />;

      content = (
        <>
          {carousel}
          {categories}
          {filmList}
        </>
      );
    }
    
    return ( 
      <>
        <Spinner loading={this.props.loadingMain} pageTitle='TV' />
        {content}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tv: state.tv.tv,
    loadingMain: state.tv.loadingMain,
    initLoaded: state.tv.initLoaded,
    translateSlide: state.tv.translateSlide,
    showLength: state.app.showLength,
    listLength: state.app.listLength
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTVInit: () => dispatch(actions.fetchTVInit()),
    onChangeCarouselTV: (tvId, element) => dispatch(actions.changeCarouselTV(tvId, element)),
    onChangeCarouselTVArrow: (arrow, element, showLength) => dispatch(actions.changeCarouselTVArrow(arrow, element, showLength)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlideTV(element)),
    onGetTVDetails: (tvId) => dispatch(actions.getTVDetails(tvId)),
    onResetTranslateTV: () => dispatch(actions.resetTranslateTV())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TV);