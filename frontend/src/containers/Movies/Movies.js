import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from '../../components/organisms/Carousel/Carousel';
import * as actions from '../../store/actions/MoviesActions';

class Movies extends Component {  
  componentDidMount() {
    this.props.onFetchNowPlayingMovies();
  }

  dotClickedHandler = (movieId) => {
    this.props.onChangeCarouselMovie(movieId);
  }

  arrowClickedHandler = (arrow) => {
    this.props.onChangeCarouselMovieArrow(arrow);
  }
  
  render() { 
    let carousel = null;
    if(this.props.nowPlayingMovies) {
      carousel = <Carousel 
        movies={this.props.nowPlayingMovies}
        dotClicked={this.dotClickedHandler}
        arrowClicked={this.arrowClickedHandler} />;
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
    loading: state.movies.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchNowPlayingMovies: () => dispatch(actions.fetchNowPlayingMovies()),
    onChangeCarouselMovie: (movieId) => dispatch(actions.changeCarouselMovie(movieId)),
    onChangeCarouselMovieArrow: (arrow) => dispatch(actions.changeCarouselMovieArrow(arrow))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);