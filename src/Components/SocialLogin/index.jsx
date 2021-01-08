import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Proptypes from 'prop-types';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { openPhoneAuth } from 'src/store/app';
import userActions from 'src/store/user/actions';

import Modal from '../Modal';
import './SocialLogin.less';

export const SocialModalContext = React.createContext({ open: false, setOpen: () => {} });

const SocialLogin = () => {
	const interestsIgnoredOnce = JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false;

	const { open, withEmail } = useSelector((state) => state.app.socialAuth);
	const dispatch = useDispatch();
	const handleContinueAsGuest = () => {};

	const handleSignIn = (provider) => {
		dispatch({ type: userActions.LOG_IN_WITH_PROVIDER, payload: provider });
	};

	return (
		<Modal
			open={open}
			setOpen={(value) => {
				dispatch(openPhoneAuth(value));
			}}
		>
			<Dimmer>
				<Loader />
			</Dimmer>
			<p className="social">
				Connecter vous en utilisant les options ci-dessous et bénéficier de plusieurs avantages membre
			</p>
			<Button size="large" circular onClick={() => handleSignIn('google')}>
				<GoogleIcon />
				Connectez-vous avec Google
			</Button>
			<Button circular size="large" onClick={() => handleSignIn('facebook')}>
				<FacebookIcon />
				Connectez-vous avec Facebook
			</Button>
			{/* {withEmail ? ( */}
			{/*	<> */}
			{/*		<Divider horizontal inverted> */}
			{/*			ou */}
			{/*		</Divider> */}
			{/*		<Input placeholder="Email" icon="arrow right" iconPosition="right" /> */}
			{/*	</> */}
			{/* ) : ( */}
			{!withEmail && (
				<Button onClick={handleContinueAsGuest} circular size="large" className="as-guest">
					<UserIcon />
					Continuer en tant qu’invité
				</Button>
			)}
			{/* )} */}
			{!interestsIgnoredOnce && (
				<Button onClick={() => dispatch(openPhoneAuth(false))} className="next-time">
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
};
SocialLogin.defaultProps = {};
export default SocialLogin;
