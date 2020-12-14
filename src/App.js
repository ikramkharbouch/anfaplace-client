import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';

import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

import './App.less';

const Survey = lazy(() => import('./Screens/Survey'));
const OfferDetails = lazy(() => import('./Screens/OfferDetails'));

const App = () => (
  <div className="App">
    <NavBar />
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/brand" component={BrandsGrid} />
          <Route exact path="/brand/:id" component={Brand} />
          <Route exact path="/survey">
            <Suspense
              fallback={
                <Dimmer active>
                  {' '}
                  <Loader />{' '}
                </Dimmer>
              }
            >
              <Survey />
            </Suspense>
          </Route>
          <Route exact path="/offer">
            <Suspense
              fallback={
                <Dimmer active>
                  {' '}
                  <Loader />{' '}
                </Dimmer>
              }
            >
              <OfferDetails />
            </Suspense>
          </Route>
          <Route exact path="/offer-details" component={Survey} />
        </Switch>
      </Router>
    </div>
    <BottomNav />
  </div>
);
export default App;
