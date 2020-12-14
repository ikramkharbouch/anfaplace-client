import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './App.css';

import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import Home from './Screens/Home';
import Modal from './Components/Modal';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';
import QRcode from './Screens/QRcode';
import Tour from './Screens/Tour';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/qrcode" component={QRcode} />
          <Route path="/tour" component={Tour} />
          <Route exact path="/brand" component={BrandsGrid} />
          <Route exact path="/brand/:id" component={Brand} />
          <Route exact path="/modal">
            <Button onClick={() => setModalOpen(true)}>open Modal</Button>
            <Modal
              setOpen={(open) => {
                setModalOpen(open);
              }}
              open={modalOpen}
            />
          </Route>
          <Route exact path="/" component={Home} />
        </Switch>
        <BottomNav />
      </Router>
    </div>
  );
};
export default App;
