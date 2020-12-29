import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import bg from 'src/assets/images/menu-bg.jpg';
import { firebaseApp } from 'src/utils/initApp';
import { AuthContext } from 'src/utils/AuthContext';
import { SocialModalContext } from 'src/Components/SocialLogin';
import './Menu.less';

const auth = firebaseApp.auth();

const Menu = ({ menuOpen }) => {
	const variants = {
		start: { opacity: 1, zIndex: 930, transition: { duration: 0.2, delay: 0.4 } },
		reverse: { opacity: 0, transition: { duration: 0.2 } },
	};

	const { user } = useContext(AuthContext);
	const { setOpen } = useContext(SocialModalContext);

	const handleSignOut = () => {
		auth.signOut().then(() => console.log('signed-out'));
	};
	const handleSignIn = () => {
		setOpen(true);
	};

	return (
		<motion.div className="container" variants={variants} animate={menuOpen ? 'start' : 'reverse'}>
			<div className="image">
				<img src={bg} alt="menu-bg" />
			</div>
			<nav>
				<ul>
					<li>MA LIST DE VISITE</li>
					<li>MES EVENEMENTS</li>
					<li>MES MARQUES FAVORITES</li>
					{user && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<li className="sign-out" onClick={handleSignOut}>
							SE DECONNECTER
						</li>
					)}
					{user == null && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<li onClick={handleSignIn}>SE CONNECTER</li>
					)}
				</ul>
			</nav>
		</motion.div>
	);
};

Menu.propTypes = {
	menuOpen: PropTypes.bool.isRequired,
};

export default Menu;
