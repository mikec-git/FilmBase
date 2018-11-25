import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/ORGANISMS/Carousel-O/Carousel';
import FilmList from '../../components/ORGANISMS/FilmList-O/FilmList';
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
    let shownListMovies = null;

    if(this.props.initLoaded) {
      if(this.state.activeCategory === 'Out Now') {
        shownListMovies = this.props.nowPlayingMovies.slice(0, this.props.listLength);
      } else if(this.state.activeCategory === 'Upcoming') {
        shownListMovies = this.props.upcomingMovies.slice(0, this.props.listLength);
      } else if(this.state.activeCategory === 'Popular') {
        shownListMovies = this.props.popularMovies.slice(0, this.props.listLength);
      }
    }

    if(this.props.initLoaded) {
      carousel = <Carousel 
        videos={this.props.nowPlayingMovies.slice(0, this.props.showLength)}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        videoClicked={this.getMovieDetailsHandler}
        pathBase='/movie/' />;
      
      filmList = <FilmList
        filmList={shownListMovies}
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
    upcomingMovies: state.movies.upcomingMovies,
    popularMovies: state.movies.popularMovies,
    loading: state.movies.loading,
    initLoaded: state.movies.initLoaded,
    translateSlide: state.movies.translateSlide,
    showLength: state.movies.showLength,
    listLength: state.movies.listLength
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