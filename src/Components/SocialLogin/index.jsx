import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';

import Modal from '../Modal';
import './SocialLogin.less';

const SocialLogin = () => {
	const [open, setOpen] = useState(true);

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
			<Button onClick={() => setOpen(false)} className="next-time">
				Plus tard{' '}
			</Button>
		</Modal>
	);
};

export default SocialLogin;
