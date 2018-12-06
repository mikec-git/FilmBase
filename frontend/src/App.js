import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MoreInfo from './containers/MoreInfo/MoreInfo';
import Movies from './containers/Movies/Movies';
import Search from './containers/Search/Search';
import Discover from './containers/Discover/Discover';
import Layout from './HOC/Layout/Layout';
import Modal from './HOC/Modal/Modal';
import Spinner from './components/ATOMS/UI-A/Spinner-A/Spinner';

import * as actionsMovies from './store/actions/MoviesActions';
import * as actionsTV from './store/actions/TVActions';
import * as actionsApp from './store/actions/AppActions';
import * as u from './shared/Utility';
const TV = lazy(() => import('./containers/TV/TV'));

class App extends Component {
  prevLocation = this.props.location;

  componentDidMount() {
    this.props.onFetchConfigInit();
    if(!((this.props.location.pathname === '/tv') || 
        (this.props.location.pathname === '/movie') || 
        (this.props.location.pathname === '/login'))) {
      const routePrefix = /(?<prefix>\b[a-zA-Z]+\b(?=\/)?)/.exec(this.props.location.pathname);
      if(routePrefix) {
        this.props.history.push(`/${routePrefix.groups.prefix}`);
      } else {
        this.props.history.push('/movie');
      }
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
    let modalRoute    = null;
    let { location }  = this.props;
    let videoType     = location.state && location.state.type;
    let isModal       = !!(
      location.state && location.state.modal && 
      this.prevLocation !== location
    );
    
    if(isModal && u.isObjEmpty(this.props.videoDetails)) {
      const clearVideoDetails = videoType === 'movie' ? 
        this.props.onClearMovieDetails : this.props.onClearTVDetails;
        
      const modal = () => (
        <Modal modalClosed={clearVideoDetails}>
          <MoreInfo type={videoType} videoDetails={this.props.videoDetails} />
        </Modal>
      );
      
      let pathBasedOnType = `/${videoType}/:${videoType}Id`;
      if(location && location.state && location.state.pathBase) {
        pathBasedOnType = `${location.state.pathBase}${videoType}/:${videoType}Id`;
      }
      
      modalRoute = <Route path={pathBasedOnType} component={modal}/>;
    }

    let routes = null;
    if(!this.props.loading && this.props.fetched) {
      routes = (
        <Layout>
          <Suspense fallback={<Spinner suspense />}>
            <Switch>
              <Route path="/discover" component={Discover} />
              <Route path="/find" component={Search} />
              <Route path="/tv" render={props => <TV {...props} />} />
              <Route path="/movie" component={Movies} />
            </Switch>        
          </Suspense>
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
    onClearMovieDetails: () => dispatch(actionsMovies.clearMovieDetails()),
    onClearTVDetails: () => dispatch(actionsTV.clearTVDetails())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
