import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';

import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';
import QRcode from './Screens/QRcode';
import Tour from './Screens/Tour';

import Home from './Screens/Home';
/* import Modal from './Components/Modal';
 */
import './App.less';

const Survey = lazy(() => import('./Screens/Survey'));
const OfferDetails = lazy(() => import('./Screens/OfferDetails'));

const App = () => (
  <div className="App">
    <NavBar />
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/offer-details" component={Survey} />
          <Route path="/qrcode" component={QRcode} />
          <Route path="/tour" component={Tour} />
          <Route exact path="/brand" component={BrandsGrid} />
          <Route exact path="/brand/:id" component={Brand} />
          <Route exact path="/survey">
            <Suspense
              fallback={
                <Dimmer active>
                  <Loader />
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

          {/* <Route exact path="/modal">
            <Button onClick={() => setModalOpen(true)}>open Modal</Button>
            <Modal
              setOpen={(open) => {
                setModalOpen(open);
              }}
              open={modalOpen}
            />
          </Route> */}
        </Switch>
      </Router>
    </div>
    <BottomNav />
  </div>
);

export default App;
