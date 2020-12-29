import React, { useEffect, useContext } from 'react';
import Proptypes from 'prop-types';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { withContext } from 'src/Components/InAppNotification';
import { firebaseApp } from 'src/utils/initApp';
import firebase from 'firebase/app';
import withFirebaseAuth from 'react-with-firebase-auth';

import Modal from '../Modal';
import './SocialLogin.less';

export const SocialModalContext = React.createContext({ open: false, setOpen: () => {} });

const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider(),
	facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
	providers,
	firebaseAppAuth,
});

const SocialLogin = ({
	context: { setNotification },
	signInWithGoogle,
	signInWithFacebook,
	signInAnonymously,
	user,
	loading,
	error,
}) => {
	const interestsIgnoredOnce = JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false;
	const interestsConfirmed = JSON.parse(localStorage.getItem('interests-confirmed')) || false;
	const { open, setOpen } = useContext(SocialModalContext);
	useEffect(() => {
		setTimeout(() => setOpen(interestsConfirmed && user == null), 200);
	}, [user, interestsConfirmed]);

	const handleContinueAsGuest = () => {
		setOpen(false);
		signInAnonymously();
		setTimeout(() => setNotification({ show: true, type: 'didNotWinPoints' }), 800);
	};
	console.log(error);
	return (
		<Modal open={open} setOpen={setOpen}>
			<Dimmer active={loading}>
				<Loader />
			</Dimmer>
			<p className="social">
				Connecter vous en utilisant les options ci-dessous et bénéficier de plusieurs avantages membre
			</p>
			<Button size="large" circular onClick={signInWithGoogle}>
				<GoogleIcon />
				Connectez-vous avec Google
			</Button>
			<Button circular size="large" onClick={signInWithFacebook}>
				<FacebookIcon />
				Connectez-vous avec Facebook
			</Button>
			<Button onClick={handleContinueAsGuest} circular size="large" className="as-guest">
				<UserIcon />
				Continuer en tant qu’invité
			</Button>
			{!interestsIgnoredOnce && (
				<Button onClick={() => setOpen(false)} className="next-time">
					Plus tard
				</Button>
			)}
		</Modal>
	);
};

SocialLogin.propTypes = {
	context: Proptypes.shape({
		notification: Proptypes.shape({ show: Proptypes.bool, type: Proptypes.string }),
		setNotification: Proptypes.func,
	}).isRequired,
	signInWithGoogle: Proptypes.func,
	signInWithFacebook: Proptypes.func,
	signInAnonymously: Proptypes.func,
	user: Proptypes.shape({}).isRequired,
	loading: Proptypes.bool,
	error: Proptypes.string,
};
SocialLogin.defaultProps = {
	signInWithGoogle: () => {},
	signInWithFacebook: () => {},
	signInAnonymously: () => {},
	loading: false,
	error: '',
};
export default withContext(createComponentWithAuth(SocialLogin));
