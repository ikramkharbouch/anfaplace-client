import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import Modal from './Components/Modal';

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/brand" component={BrandsGrid} />
        <Route exact path="/brand/:id" component={Brand} />
        <Route exact path="/modal" component={Modal} />
      </Switch>
    </Router>
  </div>
);
export default App;
