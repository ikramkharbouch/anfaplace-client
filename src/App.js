import React from 'react';
import { useSelector } from 'react-redux';
import { AuthProvider } from 'src/utils/AuthContext';

import { BrowserRouter as Router } from 'react-router-dom';
import Interests from 'src/Components/Interests';
import InAppNotification from 'src/Components/InAppNotification';
import AuthModal from 'src/Components/numberAuth';
import VerificationModal from 'src/Components/NumVerificationModal';
import { Dimmer, Loader } from 'semantic-ui-react';
import Routes from './Routes';

import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

import './App.less';

const App = () => {
	const userLoading = useSelector((state) => state.user.loadingUser);

	return (
		// move this to context later
		<AuthProvider>
			<Dimmer.Dimmable as="div" dimmed={userLoading} className="app-container">
				<Dimmer active={userLoading}>
					<Loader />
				</Dimmer>
				<Router>
					<InAppNotification />
					<AuthModal />
					<NavBar />
					<Interests />
					<VerificationModal />
					<Routes />
					<BottomNav />
				</Router>
			</Dimmer.Dimmable>
		</AuthProvider>
	);
};
export default App;
