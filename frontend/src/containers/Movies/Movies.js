import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/organisms/Carousel/Carousel';
import * as actions from '../../store/actions/MoviesActions';

class Movies extends Component {
  carouselSlideRef = React.createRef();
  
  componentDidMount() {
    window.addEventListener('resize', this.resizeSlide);
    this.props.onFetchNowPlayingMovies();
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timeoutID);
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

  // Manual changing of carousel movie
  dotClickedHandler = (movieId) => {
    this.props.onChangeCarouselMovie(movieId, this.carouselSlideRef.current);
    this.resetCarouselAutoSlide();
  }
  
  arrowClickedHandler = (arrow) => {
    this.props.onChangeCarouselMovieArrow(arrow, this.carouselSlideRef.current);
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

  // When clicking a movie/TV image
  getMovieDetailsHandler = (movieId) => {
    this.props.onGetMovieDetails(movieId);    
    clearInterval(this.timeoutID); //WORK ON THIS
    this.modalOpened = true;
  }
  
  render() { 
    let carousel = null;
    if(this.props.nowPlayingMovies) {
      carousel = <Carousel 
        movies={this.props.nowPlayingMovies}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        movieClicked={this.getMovieDetailsHandler} />;
    }
    
    return ( 
      <>
        {carousel}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    nowPlayingMovies: state.movies.nowPlayingMovies,
    loading: state.movies.loading,
    translateSlide: state.movies.translateSlide
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchNowPlayingMovies: () => dispatch(actions.fetchNowPlayingMovies()),
    onChangeCarouselMovie: (movieId, element) => dispatch(actions.changeCarouselMovie(movieId, element)),
    onChangeCarouselMovieArrow: (arrow, element) => dispatch(actions.changeCarouselMovieArrow(arrow, element)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlide(element)),
    onGetMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);