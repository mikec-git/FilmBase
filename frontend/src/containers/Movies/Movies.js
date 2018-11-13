import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from '../../components/organisms/Carousel/Carousel';
import * as actions from '../../store/actions/MoviesActions';

class Movies extends Component {  
  componentDidMount() {
    this.props.onFetchNowPlayingMovies();
  }
  
  render() { 
    let carousel = null;
    if(!this.props.loading) {
      carousel = <Carousel movies={this.props.nowPlayingMovies.slice(0,7)} />;
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
    onFetchNowPlayingMovies: () => dispatch(actions.fetchNowPlayingMovies())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Movies);