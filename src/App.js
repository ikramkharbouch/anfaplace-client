import React from 'react';
import { Dimmer } from 'semantic-ui-react';

// import { useSelector } from 'react-redux';
import { AuthProvider } from 'src/utils/AuthContext';
import Example from 'src/Components/MenuV2/Example';

import { BrowserRouter as Router } from 'react-router-dom';
import Interests from 'src/Components/Interests';
import InAppNotification from 'src/Components/InAppNotification';
import AuthModal from 'src/Components/AuthModal';
import VerificationModal from 'src/Components/NumVerificationModal';
import AuthTel from './Components/AuthTel/index';
import Routes from './Routes';

import NavBar from './Components/NavBar';
import BottomNav from './Components/BottomNav';

import './App.less';
import UpdateTel from './Components/UpdateTel/index';

const App = () => {
	// const userLoading = useSelector((state) => state.user.loadingUser);

	const userLoading = 'Some User';

	return (
		<>
			<div id="recaptcha-container" style={{ display: 'none' }} />

			<AuthProvider>
				<Dimmer.Dimmable as="div" dimmed={userLoading} className="app-container">
					{/* <Dimmer active={userLoading}>
					<Loader />
				</Dimmer> */}
					<Router>
						<Example />
						<InAppNotification />
						<AuthModal />
						<AuthTel />
						<UpdateTel />
						<NavBar />
						<Interests />
						<VerificationModal />
						<Routes />
						<BottomNav />
					</Router>
				</Dimmer.Dimmable>
			</AuthProvider>
		</>
	);
};
export default App;
