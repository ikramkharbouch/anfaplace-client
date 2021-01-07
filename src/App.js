import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import SocialLogin from 'src/Components/SocialLogin';
import Interests from 'src/Components/Interests';
import InAppNotification from 'src/Components/InAppNotification';
import { AuthProvider } from 'src/utils/AuthContext';

import VerificationModal from 'src/Components/NumVerificationModal';
import Routes from './Routes';

import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

import './App.less';

const App = () => (
	// move this to context later
	<AuthProvider>
		<div className="app-container">
			<Router>
				<InAppNotification />
				<SocialLogin />
				<NavBar />
				<Interests />
				<VerificationModal />
				<Routes />
				<BottomNav />
			</Router>
		</div>
	</AuthProvider>
);
export default App;
