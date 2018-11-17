import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/organisms/Carousel/Carousel';
import Modal from '../../hoc/Modal/Modal';
import Youtube from '../../components/organisms/YoutubeVideo/YoutubeVideo';
import Runtime from '../../components/atoms/MoreInfoAtoms/Times/Runtime';

import * as actions from '../../store/actions/MoviesActions';

class Movies extends Component {  
  constructor(props) {
    super(props);
    this.carouselSlideRef = React.createRef();
    window.addEventListener('resize', this.resizeSlide);
    this.state = {
      showMovie: false
    }
  }
  
  componentDidMount() {
    this.props.onFetchNowPlayingMovies();
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
    this.timeoutID = setInterval(() => this.arrowClickedHandler('right'), 5000);
  }
  
  // Adjust carousel translate amount on window resize
  resizeSlide = () => { 
    this.props.onResizeCarouselSlide(this.carouselSlideRef.current);
  }

  showMovieToggleHandler = (movieId) => {
    if(movieId){
      this.props.onShowMovieDetails(movieId);
    } else {
      this.props.onCloseMovieDetails();
    }
    this.setState(prevState => ({ showMovie: !prevState.showMovie }));
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
        movieClicked={this.showMovieToggleHandler} />;
    }

    let movieDetails = null;
    if(this.props.movieDetails) {
      console.log(this.props.movieDetails);
      movieDetails = (
        <>
          <Youtube playerId='123' />
          <Runtime runtime='134' />
        </>
      );
    }

    return ( 
      <>
        <Modal 
          showMovie={this.state.showMovie}
          backdropClicked={this.showMovieToggleHandler}>
          {movieDetails}
        </Modal>
        {carousel}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    nowPlayingMovies: state.movies.nowPlayingMovies,
    loading: state.movies.loading,
    translateSlide: state.movies.translateSlide,
    movieDetails: state.movies.currentMovieDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchNowPlayingMovies: () => dispatch(actions.fetchNowPlayingMovies()),
    onChangeCarouselMovie: (movieId, element) => dispatch(actions.changeCarouselMovie(movieId, element)),
    onChangeCarouselMovieArrow: (arrow, element) => dispatch(actions.changeCarouselMovieArrow(arrow, element)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlide(element)),
    onShowMovieDetails: (movieId) => dispatch(actions.showMovieDetails(movieId)),
    onCloseMovieDetails: () => dispatch(actions.closeMovieDetails())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);