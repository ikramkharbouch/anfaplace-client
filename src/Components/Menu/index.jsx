import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import bg from 'src/assets/images/menu-bg.jpg';
import firebaseApp from 'src/utils/initApp';
import { AuthContext } from 'src/utils/AuthContext';
import './Menu.less';
import { Button, Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { openSocialAuth } from 'src/store/app';

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

	const { user } = useContext(AuthContext);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		auth.signOut().then(() => console.log('signed-out'));
	};
	const handleSignIn = () => {
		dispatch(openSocialAuth({ open: true, withEmail: false }));
	};

	return (
		<motion.div className="container" variants={variants} animate={menuOpen ? 'start' : 'reverse'}>
			<div className="image">
				<img src={bg} alt="menu-bg" />
			</div>
			{user && (
				<Header className="greetings" as="h1">
					Hello {user.displayName.split(' ')[0]} !
				</Header>
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
						<a href="tel:00000000000">
							<Header as="h1">
								<Header.Content>Appeler Anfa place Mall</Header.Content>

								<Icon name="phone-outline" />
							</Header>
						</a>
					</motion.li>
					{user && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<motion.li className="action-button" variants={item} animate={menuOpen ? 'start' : 'reverse'}>
							<Button circular onClick={handleSignOut} inverted>
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
