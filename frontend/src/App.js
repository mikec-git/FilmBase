import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Movies from './containers/Movies/Movies';
import Modal from './hoc/Modal/Modal';
import MoreInfo from './containers/MoreInfo/MoreInfo';
import * as actions from './store/actions/MoviesActions';


class App extends Component {
  prevLocation = this.props.location;

  componentDidMount() {
    if(this.props.location.pathname !== '/') {
      this.props.history.push('/');
    }    
  }

  componentDidUpdate() {
    // If current location is not modal
    let { location, history } = this.props;
    if(history !== 'POP' && (!location.state || !location.state.modal)) {
      this.prevLocation = this.props.location;
    }
  }

  render() {
    let modal         = null;
    let { location }  = this.props;
    let isModal       = !!(
      location.state && location.state.modal && 
      this.prevLocation !== location
    );
    
    if(isModal && this.props.movieDetails) {
      modal = () => {
        return (
          <Modal modalClosed={this.props.onClearMovieDetails}>
            <MoreInfo movieDetails={this.props.movieDetails} />
          </Modal>
        )
      };
    }

    return (
      <Layout>
        <Switch>
          <Route path="/" component={Movies} />  
        </Switch>
        {isModal ? <Route path='/movie/:movieId' component={modal}/> : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieDetails: state.movies.currentMovieDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearMovieDetails: () => dispatch(actions.clearMovieDetails())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
