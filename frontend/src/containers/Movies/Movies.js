import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/organisms/Carousel/Carousel';
import FilmList from '../../components/organisms/FilmList-O/FilmList-O';
import * as actions from '../../store/actions/MoviesActions';

class Movies extends Component {
  carouselSlideRef = React.createRef();
  state = {
    activeCategory: 'Out Now'
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resizeSlide);
    this.props.onFetchMoviesInit();
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

  // Get movie details
  getMovieDetailsHandler = (movieId) => {
    this.props.onGetMovieDetails(movieId); 
    clearInterval(this.timeoutID);
    this.modalOpened = true;
  }

  categoryClickedHandler = (category) => {
    this.setState({ activeCategory: category });
  }
  
  render() { 
    let carousel = null;
    let filmList = null;
    if(this.props.nowPlayingMovies) {
      carousel = <Carousel 
        videos={this.props.nowPlayingMovies.slice(0, this.props.showLength)}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        videoClicked={this.getMovieDetailsHandler}
        pathBase='/movie/' />;
      
      filmList = <FilmList
        filmList={this.props.nowPlayingMovies.slice(0,18)}
        categoryClicked={this.categoryClickedHandler}
        activeCategory={this.state.activeCategory}
        videoClicked={this.getMovieDetailsHandler}
        pathBase='/movie/' />
    }
    
    return ( 
      <>
        {carousel}
        {filmList}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    nowPlayingMovies: state.movies.nowPlayingMovies,
    loading: state.movies.loading,
    translateSlide: state.movies.translateSlide,
    showLength: state.movies.showLength
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMoviesInit: () => dispatch(actions.fetchMoviesInit()),
    onChangeCarouselMovie: (movieId, element) => dispatch(actions.changeCarouselMovie(movieId, element)),
    onChangeCarouselMovieArrow: (arrow, element) => dispatch(actions.changeCarouselMovieArrow(arrow, element)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlide(element)),
    onGetMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);