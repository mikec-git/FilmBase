import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/ORGANISMS/Carousel-O/Carousel';
import Categories from '../../components/MOLECULES/FilmList-M/Categories-M/Categories';
import FilmList from '../../components/ORGANISMS/FilmList-O/FilmList';
import * as actions from '../../store/actions/MoviesActions';
import * as u from '../../shared/Utility';

class Movies extends Component {
  carouselSlideRef  = React.createRef();

  state = {
    activeCategory: 'Now Playing',
    categoryLoaded: {
      nowPlaying: true,
      upcoming: false,
      popular: false
    },
    categoryNames: ['Now Playing', 'Upcoming', 'Popular']
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resizeSlide);
    this.props.onFetchMoviesInit();
    this.startInterval();
  }
  
  componentWillUnmount() {
    clearInterval(this.timeoutID);
    window.removeEventListener('resize', this.resizeSlide);
    this.props.onResetTranslateMovie();
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
      const moviePathBase = '/movie/',
            nowPlayingMovies = this.props.movies['nowPlaying'].videos;
            
      carousel = <Carousel 
        videos={nowPlayingMovies.slice(0, this.props.showLength)}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        videoClicked={this.getMovieDetailsHandler}
        pathBase={moviePathBase} />;
      
      Object.entries(this.props.movies).forEach(([_, movieList]) => {
        filmList.push(<FilmList
          key={movieList.category}
          category={movieList.category}
          filmList={movieList.videos.slice(0, this.props.listLength)}
          videoClicked={this.getMovieDetailsHandler}
          activeCategory={this.state.activeCategory}
          hasLoaded={this.state.categoryLoaded}
          pathBase={moviePathBase} />);
      });

      categories = <Categories 
        categoryClicked={this.categoryClickedHandler}
        activeCategory={this.state.activeCategory}
        categoryNames={this.state.categoryNames}  />;
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
    movies: state.movies.movies,
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
    onGetMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId)),
    onResetTranslateMovie: () => dispatch(actions.resetTranslateMovie())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);