import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import Interests from 'src/Components/Interests';
import InAppNotification from 'src/Components/InAppNotification';
import { AuthProvider } from 'src/utils/AuthContext';
import PhoneAuthModal from 'src/Components/numberAuth';
import Loader from 'src/Components/Image/Loader';

import VerificationModal from 'src/Components/NumVerificationModal';
import Routes from './Routes';

import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

import './App.less';

const App = () => {
	const userLoading = useSelector((state) => state.user.loadingUser);

	return (
		// move this to context later
		<AuthProvider>
			<div className="app-container">
				{userLoading ? (
					<div>
						<Loader />
					</div>
				) : (
					<Router>
						<InAppNotification />
						<PhoneAuthModal />
						<NavBar />
						<Interests />
						<VerificationModal />
						<Routes />
						<BottomNav />
					</Router>
				)}
			</div>
		</AuthProvider>
	);
};
export default App;
