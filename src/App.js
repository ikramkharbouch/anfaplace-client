import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import Modal from './Components/Modal';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

const App = () => (
  <div className="App">
    <NavBar />
    <Router>
      <Switch>
        <Route exact path="/brand" component={BrandsGrid} />
        <Route exact path="/brand/:id" component={Brand} />
        <Route exact path="/modal" component={Modal} />
      </Switch>
    </Router>
    <BottomNav />
  </div>
);
export default App;
