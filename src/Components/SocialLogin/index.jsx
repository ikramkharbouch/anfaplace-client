import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';

import Modal from '../Modal';
import './SocialLogin.less';

const SocialLogin = ({ openSocial }) => {
	const [open, setOpen] = useState(false);
	const interestsIgnoredOnce = JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false;
	useEffect(() => {
		setTimeout(() => setOpen(openSocial || interestsIgnoredOnce), 200);
	}, [openSocial]);
	return (
		<Modal open={open} setOpen={setOpen}>
			<p className="social">
				Connecter vous en utilisant les options ci-dessous et bénéficier de plusieurs avantages membre
			</p>
			<Button size="large" circular>
				<GoogleIcon />
				Connectez-vous avec Google
			</Button>
			<Button circular size="large">
				<FacebookIcon />
				Connectez-vous avec Facebook
			</Button>
			<Button onClick={() => setOpen(false)} circular size="large" className="as-guest">
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
	openSocial: Proptypes.bool,
};
SocialLogin.defaultProps = {
	openSocial: false,
};
export default SocialLogin;
