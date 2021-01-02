import React, { useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import SocialLogin, { SocialModalContext } from 'src/Components/SocialLogin';
import Interests from 'src/Components/Interests';
import ScrollToTop from 'src/utils/ScrollToTop';
import InAppNotification, { InAppNotificationContext } from 'src/Components/InAppNotification';
import { AuthProvider } from 'src/utils/AuthContext';

import VerificationModal from 'src/Components/NumVerificationModal';
import Routes from './Routes';

import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

import './App.less';

const App = () => {
	// move this to context later
	const [openSocial, setOpenSocial] = useState(false);
	const [notification, setNotification] = useState({ show: false, type: '', message: '' });
	return (
		<AuthProvider>
			<div className="app-container">
				<Router>
					<ScrollToTop />
					<InAppNotificationContext.Provider value={{ notification, setNotification }}>
						<InAppNotification />
						<SocialModalContext.Provider value={{ open: openSocial, setOpen: setOpenSocial }}>
							<SocialLogin />
							<NavBar />
						</SocialModalContext.Provider>
					</InAppNotificationContext.Provider>
					<Interests modalClosedEvent={(value) => setOpenSocial(value)} />
					<VerificationModal />
					<Routes />
					<BottomNav />
				</Router>
			</div>
		</AuthProvider>
	);
};

export default App;
