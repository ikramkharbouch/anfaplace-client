import React, { lazy, Suspense, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import SocialLogin, { SocialModalContext } from 'src/Components/SocialLogin';
import Interests from 'src/Components/Interests';
import Shopping from 'src/Screens/Shopping';
import Restauration from 'src/Screens/Restauration';
import Entertainment from 'src/Screens/Entertainment';
import ScrollToTop from 'src/utils/ScrollToTop';
import Coupon from 'src/Screens/Coupon';
import InAppNotification, { InAppNotificationContext } from 'src/Components/InAppNotification';
import { AuthProvider } from 'src/utils/AuthContext';
import MyVisitedList from 'src/Screens/MyVisitedList';
import MyEventsList from 'src/Screens/MyEventsList';
import VerificationModal from 'src/Components/NumVerificationModal';

import Brand from './Screens/Brand/index';
import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';
import QRcode from './Screens/QRcode';
import Tour from './Screens/Tour';
import Home from './Screens/Home';

import './App.less';

const Survey = lazy(() => import('./Screens/Survey'));
const OfferDetails = lazy(() => import('./Screens/OfferDetails'));
const Shops = lazy(() => import('src/Screens/Brands/index.jsx'));

const App = () => {
	// move this to context later
	const [openSocial, setOpenSocial] = useState(false);
	const [notification, setNotification] = useState({ show: false, type: '', message: '' });
	const [scrollableMenu, setScrollableMenu] = useState(false);
	return (
		<AuthProvider>
			<div className="app-container">
				<Router>
					<ScrollToTop />
					<InAppNotificationContext.Provider value={{ notification, setNotification }}>
						<InAppNotification />
						<SocialModalContext.Provider value={{ open: openSocial, setOpen: setOpenSocial }}>
							<SocialLogin />
							<NavBar scrollableMenuEvent={setScrollableMenu} />
						</SocialModalContext.Provider>
					</InAppNotificationContext.Provider>
					<Interests modalClosedEvent={(value) => setOpenSocial(value)} />
					<VerificationModal />
					<div className={`screen ${scrollableMenu ? 'scrollable-menu' : ''}`}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/offer-details" component={Survey} />
							<Route path="/qrcode" component={QRcode} />
							<Route path="/tour" component={Tour} />
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
							<Route exact path="/brands">
								<Suspense
									fallback={
										<Dimmer active>
											<Loader />
										</Dimmer>
									}
								>
									<Shops />
								</Suspense>
							</Route>
							<Route exact path="/shopping" component={Shopping} />
							<Route exact path="/restauration" component={Restauration} />
							<Route exact path="/entertainment" component={Entertainment} />
							<Route exact path="/coupon/:id" component={Coupon} />
							<Route exact path="/my-visited-list" component={MyVisitedList} />
							<Route exact path="/my-events-list" component={MyEventsList} />
						</Switch>
					</div>
					<BottomNav />
				</Router>
			</div>
		</AuthProvider>
	);
};

export default App;
