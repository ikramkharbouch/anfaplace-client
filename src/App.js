import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.less';

import BrandsGrid from './Components/BrandsGrid';
import Survey from './Screens/Survey';
import Brand from './Screens/Brand';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

const App = () => (
  <div className="App">
    <NavBar />
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/brand" component={BrandsGrid} />
          <Route exact path="/brand/:id" component={Brand} />
          <Route exact path="/survey" component={Survey} />
        </Switch>
      </Router>
    </div>
    <BottomNav />
  </div>
);
export default App;
