import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import Shopping from 'src/Screens/Shopping';
import Restauration from 'src/Screens/Restauration';
import Entertainment from 'src/Screens/Entertainment';
import BrandsGrid from './Components/BrandsGrid';
import Brand from './Screens/Brand';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';
import QRcode from './Screens/QRcode';
import Tour from './Screens/Tour';
import Home from './Screens/Home';

import './App.less';
import SocialLogin from './Components/SocialLogin';
import Interests from './Components/Interests';

const Survey = lazy(() => import('./Screens/Survey'));
const OfferDetails = lazy(() => import('./Screens/OfferDetails'));

const App = () => {
	// move this to context later
	const [openSocial, setOpenSocial] = useState(false);

	return (
		<div className="app-container">
			<Router>
				<NavBar />
				<Interests modalClosedEvent={() => setOpenSocial(true)} />
				{openSocial && <SocialLogin />}
				<div className="screen">
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
										<Loader />
									</Dimmer>
								}
							>
								<OfferDetails />
							</Suspense>
						</Route>
						<Route exact path="/shopping" component={Shopping} />
						<Route exact path="/restauration" component={Restauration} />
						<Route exact path="/entertainment" component={Entertainment} />
					</Switch>
				</div>
				<BottomNav />
			</Router>
		</div>
	);
};

export default App;
