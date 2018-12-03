import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../components/MOLECULES/Search-M/Header-M/Header';
import FilmList from '../../components/ORGANISMS/FilmList-O/FilmList';
import Spinner from '../../components/ATOMS/UI-A/Spinner-A/Spinner';
import * as actions from '../../store/actions/SearchActions';
import * as actionsTV from '../../store/actions/TVActions';
import * as actionsMovie from '../../store/actions/MoviesActions';

class Search extends Component {
  state = { 
    currentQueryParams: ''
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const queryParams = params.get('q');
    this.props.onGetSearchbarResults(queryParams);
    this.setState({ currentQueryParams: queryParams });
  }

  componentDidUpdate() {
    if(!this.props.location.state || !this.props.location.state.modal) {
      const params = new URLSearchParams(this.props.location.search);
      const queryParams = params.get('q');
      
      if(queryParams !== this.state.currentQueryParams) {
        this.props.onGetSearchbarResults(queryParams);
        this.setState({ currentQueryParams: queryParams });
      }
    }
  }

  getFilmDetailsHandler = (videoId, videoType) => {
    if(videoType === 'tv') {      
      this.props.onGetTVDetails(videoId); 
    } else if(videoType === 'movie') {
      this.props.onGetMovieDetails(videoId); 
    }
  }

  render() { 
    let results = null;
    if(this.props.results.length > 0) {
      results = (
        <FilmList
          filmList={this.props.results}
          videoClicked={this.getFilmDetailsHandler}
          pathBase='/find/'
          isSearch={true} />
      );
    }

    return ( 
      <>
        <Spinner loading={this.props.loading} pageTitle={'Searching for ' + this.state.currentQueryParams + '...'} />
        <Header resultsTitle={'Results for ' + this.state.currentQueryParams} />
        {results}
      </>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    loading: state.search.loading,
    results: state.search.searchResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetSearchbarResults: (query) => dispatch(actions.getSearchbarResults(query)),
    onGetTVDetails: (tvId) => dispatch(actionsTV.getTVDetails(tvId)),    
    onGetMovieDetails: (movieId) => dispatch(actionsMovie.getMovieDetails(movieId))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));