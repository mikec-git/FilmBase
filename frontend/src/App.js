import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MoreInfo from './containers/MoreInfo/MoreInfo';
import Movies from './containers/Movies/Movies';
import TV from './containers/TV/TV';
import Layout from './HOC/Layout/Layout';
import Modal from './HOC/Modal/Modal';
import * as actionsMovies from './store/actions/MoviesActions';
import * as actionsApp from './store/actions/AppActions';


class App extends Component {
  prevLocation = this.props.location;

  componentDidMount() {
    this.props.onFetchConfigInit();
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
    let modalRoute    = null;
    let { location }  = this.props;
    let videoType     = location.state && location.state.type;
    let isModal       = !!(
      location.state && location.state.modal && 
      this.prevLocation !== location
    );
    
    if(isModal && this.props.videoDetails) {
      modal = () => (
        <Modal modalClosed={this.props.onClearVideoDetails}>
          <MoreInfo type={videoType} videoDetails={this.props.videoDetails} />
        </Modal>
      );

      const pathBasedOnType = `/${videoType}/:${videoType}Id`
      modalRoute = <Route path={pathBasedOnType} component={modal}/>;
    }

    let routes = null;
    if(!this.props.loading && this.props.fetched) {
      routes = (
        <Layout>
          <Switch>
            <Route path="/TV" component={TV} />
            <Route path="/" component={Movies} />
          </Switch>
          {modalRoute}
        </Layout>
      );
    }

    return routes;
  }
}

const mapStateToProps = state => {
  return {
    videoDetails: state.movies.currentMovieDetails || state.tv.currentTVDetails,
    loading: state.app.loading,
    fetched: state.app.initLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchConfigInit: () => dispatch(actionsApp.fetchConfigInit()),
    onClearVideoDetails: () => dispatch(actionsMovies.clearMovieDetails())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
