import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Movies from './containers/Movies/Movies';

import { LoadYoutube } from './shared/LoadYoutube';

class App extends Component {
  componentDidMount() {    
    LoadYoutube();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Movies} />
      </div>
    );
  }
}

export default App;
