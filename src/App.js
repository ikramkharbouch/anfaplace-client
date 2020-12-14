import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import Home from './Screens/Home';
import Modal from './Components/Modal';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

const App = () => (
  <div className="App">
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/brand" component={BrandsGrid} />
        <Route exact path="/brand/:id" component={Brand} />
        <Route exact path="/modal" component={Modal} />
        <Route exact path="/" component={Home} />
      </Switch>
      <BottomNav />
    </Router>
  </div>
);
export default App;
