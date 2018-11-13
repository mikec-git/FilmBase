import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Movies from './containers/Movies/Movies';

class App extends Component {


  render() {
    return (
      <div>
        <h1>This is FilmBase</h1>
        <Route exact path="/" component={Movies} />
      </div>
    );
  }
}

export default App;
