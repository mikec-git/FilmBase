import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MoreInfo from './containers/MoreInfo/MoreInfo';
import Movies from './containers/Movies/Movies';
import Layout from './HOC/Layout/Layout';
import Modal from './HOC/Modal/Modal';
import Spinner from './components/ATOMS/UI-A/Spinner-A/Spinner';

import * as actionsMovies from './store/actions/MoviesActions';
import * as actionsTV from './store/actions/TVActions';
import * as actionsApp from './store/actions/AppActions';
import * as actionsLogin from './store/actions/LoginActions';
import * as actionsProfile from './store/actions/ProfileActions';
import * as u from './shared/Utility';
const TV = lazy(() => import('./containers/TV/TV'));
const Search = lazy(() => import('./containers/Search/Search'));
const Discover = lazy(() => import('./containers/Discover/Discover'));
const Login = lazy(() => import('./containers/Login/Login'));
const Profile = lazy(() => import('./containers/Profile/Profile'));

class App extends Component {
  prevLocation = this.props.location;

  componentDidMount() {
    this.props.onFetchConfigInit();
    if(!((this.props.location.pathname === '/tv') || 
        (this.props.location.pathname === '/movie') || 
        (this.props.location.pathname === '/login') || 
        (this.props.location.pathname === '/profile'))) {
      const routePrefix = /(?<prefix>\b[a-zA-Z]+\b(?=\/)?)/.exec(this.props.location.pathname);
      if(routePrefix) {
        this.props.history.push(`/${routePrefix.groups.prefix}`);
      } else {
        this.props.history.push('/movie');
      }
    }

    if(JSON.parse(localStorage.getItem('session'))) {
      if(JSON.parse(localStorage.getItem('session')).type === 'login') {
        this.props.onLoginSuccess('login');
        this.props.onClearProfileData();
      } else {
        this.props.onLoginSuccess('guest');
        this.props.onClearProfileData();
      }
    }
  }
  
  componentDidUpdate() {
    // If current location is not modal
    let { location, history } = this.props;
    let session = JSON.parse(localStorage.getItem('session'));

    if(history !== 'POP' && (!location.state || !location.state.modal)) {
      this.prevLocation = this.props.location;
    }
    
    if(session) {
      const expiresAt = Date.parse(session.expires_at);
      if(this.props.authType === 'guest') {
        if(Date.now() >= expiresAt - u.HtoMS(12)) {
          this.props.onLogout();
          this.props.onClearProfileData();
        }
      } else if(this.props.authType === 'login') {
        if(Date.now() >= expiresAt + u.HtoMS(6)) {
          this.props.onLogout();
          this.props.onClearProfileData();
        }
      }
    } else if(!session && !!this.props.profileType) {
      this.props.onLogout();
      this.props.onClearProfileData();
    }
  }

  render() {
    let modalRoute      = null,
        { location, loggedIn, videoDetails, onClearMovieDetails, onClearTVDetails, loading, fetched } = this.props;
    
    let videoType = location.state && location.state.type;
    let isModal   = !!(location.state && location.state.modal && this.prevLocation !== location);

    let loginRoute = <Route path="/login" render={props => <Login {...props} />} />;
    let redirectProfile = <Redirect from='/profile' to='login' />;

    if(loggedIn) {
      loginRoute = <Route path="/profile" render={props => <Profile {...props} />} />;
      redirectProfile = <Redirect from='/login' to='profile' />;
    } 
    
    if(isModal && u.isObjNotEmpty(videoDetails)) {
      // Clear current loaded film details when modal closes
      const clearVideoDetails = videoType === 'movie' ? 
        onClearMovieDetails : onClearTVDetails;
        
      const modal = () => (
        <Modal modalClosed={clearVideoDetails}>
          <MoreInfo type={videoType} videoDetails={videoDetails} />
        </Modal>
      );

      let pathBasedOnType = `/${videoType}/:${videoType}Id`;
      // For special URL paths with additional route string
      if(location && location.state && location.state.pathBase) {
        pathBasedOnType = `${location.state.pathBase}${videoType}/:${videoType}Id`;
      }
      
      modalRoute = <Route path={pathBasedOnType} component={modal}/>;
    }    

    let routes = null;
    if(!loading && fetched) {
      routes = (
        <Layout>
          <Suspense fallback={<Spinner suspense />}>
            <Switch>
              {redirectProfile}
              <Route path="/movie" component={Movies} />
              <Route path="/tv" render={props => <TV {...props} />} />
              <Route path="/find" render={props => <Search {...props} />} />
              <Route path="/discover" render={props => <Discover {...props} />} />
              {loginRoute}
              <Redirect to='/movie' />
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
    fetched: state.app.initLoaded,
    loggedIn: state.login.loggedIn,
    authType: state.login.authType,
    profileType: state.login.authType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchConfigInit: () => dispatch(actionsApp.fetchConfigInit()),
    onClearMovieDetails: () => dispatch(actionsMovies.clearMovieDetails()),
    onClearTVDetails: () => dispatch(actionsTV.clearTVDetails()),
    onLoginSuccess: (type) => dispatch(actionsLogin.loginSuccess(type)),
    onLogout: () => dispatch(actionsLogin.logout()),
    onClearProfileData: () => dispatch(actionsProfile.clearProfileData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
