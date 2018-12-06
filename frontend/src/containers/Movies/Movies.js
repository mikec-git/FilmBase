import React, { Component } from 'react';
import { connect } from 'react-redux';

import Carousel from '../../components/ORGANISMS/Carousel-O/Carousel';
import Categories from '../../components/MOLECULES/FilmList-M/Categories-M/Categories';
import MoviesBody from '../../components/ORGANISMS/Discover-O/DiscoverBody';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';

import * as actions from '../../store/actions/MoviesActions';
import * as u from '../../shared/Utility';
import c from './Movies.module.scss';

class Movies extends Component {
  carouselSlideRef  = React.createRef();

  state = {
    activeCategory: 'Now Playing',
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
    this.props.onChangeCarouselMovieArrow(arrow, this.carouselSlideRef.current, this.props.showLength);
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
  
  listArrowClickedHandler = (arrow) => {
    this.props.onChangeMovieList(arrow, this.state.activeCategory);
  }
  
  render() { 
    let carousel    = null,
        categories  = null,
        content     = null,
        filmList    = [];

    if(u.isObjEmpty(this.props.movies)) {
      const moviePathBase     = this.props.location.pathname,
            nowPlayingMovies  = this.props.movies['nowPlaying'].videos;

      carousel = <Carousel 
        videos={nowPlayingMovies.slice(0, this.props.showLength)}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler}
        translateX={this.props.translateSlide}
        slideRef={this.carouselSlideRef}
        videoClicked={this.getMovieDetailsHandler}
        pathBase={moviePathBase} />;
      
      Object.entries(this.props.movies).forEach(([key, movieList]) => {
        filmList.push(<MoviesBody
          key={movieList.category}
          category={movieList.category}
          results={movieList.videos}
          listLength={this.props.listLength}
          page={this.props.showPage[key]}
          activeCategory={this.state.activeCategory}
          arrowClicked={this.listArrowClickedHandler}
          videoClicked={this.getMovieDetailsHandler}
          pathBase={moviePathBase}
          isImgLoaded={!this.props.loading} />);
      });

      categories = <Categories 
        categoryClicked={this.categoryClickedHandler}
        activeCategory={this.state.activeCategory}
        categoryNames={this.state.categoryNames}  />;

      content = (
        <>
          {carousel}
          <div className={c.Movies__Body}>
            {categories}
            {filmList}
          </div>
        </>
      )
    }
    
    return ( 
      <>
        <Spinner loading={this.props.loadingInit} pageTitle='Movies' />
        {content}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    loadingInit: state.movies.loadingInit,
    loading: state.movies.loading,
    translateSlide: state.movies.translateSlide,
    showPage: state.movies.showPage,
    showLength: state.app.showLength,
    listLength: state.app.listLength
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMoviesInit: () => dispatch(actions.fetchMoviesInit()),
    onChangeCarouselMovie: (movieId, element) => dispatch(actions.changeCarouselMovie(movieId, element)),
    onChangeCarouselMovieArrow: (arrow, element, showLength) => dispatch(actions.changeCarouselMovieArrow(arrow, element, showLength)),
    onResizeCarouselSlide: (element) => dispatch(actions.resizeCarouselSlide(element)),
    onChangeMovieList: (arrow, category) => dispatch(actions.changeMovieList(arrow, category)),
    onGetMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId)),
    onResetTranslateMovie: () => dispatch(actions.resetTranslateMovie())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);