import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import bg from 'src/assets/images/menu-bg.jpg';
import firebaseApp from 'src/utils/initApp';
import './Menu.less';
import { Button, Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { openPhoneAuth } from 'src/store/app';

const auth = firebaseApp.auth();

const Menu = ({ menuOpen, closeMenu }) => {
	const variants = {
		start: {
			opacity: 1,
			zIndex: 930,
			transition: { duration: 0.2, delay: 0.4, staggerChildren: 0.2 },
		},
		reverse: { opacity: 0, y: -50, transition: { duration: 0.3, delay: 0.2 } },
	};

	const listVariant = {
		start: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.5, delay: 0.5 } },
		reverse: { opacity: 0, transition: { duration: 0.4, staggerChildren: 0.5, delay: 0.4 }, y: -20 },
	};
	const item = {
		reverse: { opacity: 0, y: -50 },
		start: { opacity: 1 },
	};
	const user = useSelector((state) => state.user.currentUser);
	const [logOutLoading, setLogOutLoading] = useState(false);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		setLogOutLoading(true);
		auth.signOut().then(() => setLogOutLoading(false));
	};
	const handleSignIn = () => {
		dispatch(openPhoneAuth(true));
	};

	return (
		<motion.div className="container" variants={variants} animate={menuOpen ? 'start' : 'reverse'}>
			<div className="image">
				<img src={bg} alt="menu-bg" />
			</div>
			{user && (
				<>
					<Header className="greetings" as="h1">
						Bienvenue {user.displayName} !
						<p style={{ fontSize: '1.2rem', width: '80%', margin: '0 auto' }}>
							Votre centre Anfa Place est ouvert aujourd’hui de 10:00 à 20:00{' '}
							<a href="mailto:info@myanfaplace.com">info@myanfaplace.com</a>
						</p>
					</Header>
				</>
			)}
			<nav>
				<motion.ul variants={listVariant} animate={menuOpen ? 'start' : 'reverse'}>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						<NavLink onClick={closeMenu} exact to="/my-visited-list">
							<Header as="h1">
								<Header.Content>Ma list de visite</Header.Content>

								<Icon name="verification-calendar-outline" />
							</Header>
						</NavLink>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						<NavLink onClick={closeMenu} exact to="/my-events-list">
							<Header as="h1">
								<Header.Content>Ma liste évènements</Header.Content>

								<Icon name="calendar-outline" />
							</Header>
						</NavLink>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						<a href="tel:0668194101">
							<Header as="h1">
								<Header.Content>Appeler Anfa place Mall</Header.Content>

								<Icon name="phone-outline" />
							</Header>
						</a>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#">
							<Header as="h1">
								<Header.Content>Contactez-nous</Header.Content>
							</Header>
						</a>
					</motion.li>
					{user && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<motion.li className="action-button" variants={item} animate={menuOpen ? 'start' : 'reverse'}>
							<Button loading={logOutLoading} circular onClick={handleSignOut} inverted>
								Se déconnecter
							</Button>
						</motion.li>
					)}
					{user == null && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<motion.li className="action-button" variants={item} animate={menuOpen ? 'start' : 'reverse'}>
							<Button circular onClick={handleSignIn}>
								Se connecter
							</Button>
						</motion.li>
					)}
				</motion.ul>
			</nav>
		</motion.div>
	);
};

Menu.propTypes = {
	menuOpen: PropTypes.bool.isRequired,
	closeMenu: PropTypes.func.isRequired,
};

export default Menu;
