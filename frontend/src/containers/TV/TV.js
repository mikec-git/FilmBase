import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/ORGANISMS/Carousel-O/Carousel';
import Categories from '../../components/MOLECULES/FilmList-M/Categories-M/Categories';
import FilmList from '../../components/ORGANISMS/FilmList-O/FilmList';
import * as actions from '../../store/actions/TVActions';
import * as u from '../../shared/Utility';

class TV extends Component {
  carouselSlideRef  = React.createRef();

  state = {
    activeCategory: 'Airing Today',
    categoryLoaded: {
      airingToday: true,
      onTheAir: false,
      popular: false
    },    
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
    this.props.onChangeCarouselTVArrow(arrow, this.carouselSlideRef.current);
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
    const categoryCamelCase = u.toCamelCase(category);
    if(!this.state.categoryLoaded[categoryCamelCase]) {
      this.setState({ 
        ...this.state,
        activeCategory: category, 
        categoryLoaded: {
          ...this.state.categoryLoaded, 
          [categoryCamelCase]: true} });
    } else {
      this.setState({ activeCategory: category });
    }
  }
  
  render() { 
    let carousel    = null,
        categories  = null,
        filmList    = [];

    if(this.props.initLoaded) {
      const tvPathBase = '/tv/',
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
        hasLoaded={this.state.categoryLoaded}
        pathBase={tvPathBase} />);
      });

      categories = <Categories 
        categoryClicked={this.categoryClickedHandler}
        activeCategory={this.state.activeCategory}
        categoryNames={this.state.categoryNames} />;
    }
    
    return ( 
      <>
        {carousel}
        {categories}
        {filmList}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tv: state.tv.tv,
    loading: state.tv.loading,
    initLoaded: state.tv.initLoaded,
    translateSlide: state.tv.translateSlide,
    showLength: state.tv.showLength,
    listLength: state.tv.listLength
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTVInit: () => dispatch(actions.fetchTVInit()),
    onChangeCarouselTV: (tvId, element) => dispatch(actions.changeCarouselTV(tvId, element)),
    onChangeCarouselTVArrow: (arrow, element) => dispatch(actions.changeCarouselTVArrow(arrow, element)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlideTV(element)),
    onGetTVDetails: (tvId) => dispatch(actions.getTVDetails(tvId)),
    onResetTranslateTV: () => dispatch(actions.resetTranslateTV())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TV);