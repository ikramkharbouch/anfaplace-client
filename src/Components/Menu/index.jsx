import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import bg from 'src/assets/images/menu-bg.jpg';
import { firebaseApp } from 'src/utils/initApp';
import { AuthContext } from 'src/utils/AuthContext';
import { SocialModalContext } from 'src/Components/SocialLogin';
import './Menu.less';
import { Button, Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const auth = firebaseApp.auth();

const Menu = ({ menuOpen }) => {
	const variants = {
		start: { opacity: 1, zIndex: 930, transition: { duration: 0.2, delay: 0.4 } },
		reverse: { opacity: 0, transition: { duration: 0.1 } },
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
			{user && (
				<Header className="greetings" as="h1">
					Hello {user.displayName} !
				</Header>
			)}
			<nav>
				<ul>
					<li>
						<NavLink exact to="/my-visited-list">
							<Header as="h1">
								<Header.Content>Ma list de visite</Header.Content>

								<Icon name="verification-calendar-outline" />
							</Header>
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/my-events-list">
							<Header as="h1">
								<Header.Content>Ma liste évènements</Header.Content>

								<Icon name="calendar-outline" />
							</Header>
						</NavLink>
					</li>
					<li>
						<a href="tel:00000000000">
							<Header as="h1">
								<Header.Content>Appeler Anfa place Mall</Header.Content>

								<Icon name="phone-outline" />
							</Header>
						</a>
					</li>
					{user && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<li className="action-button">
							<Button circular onClick={handleSignOut} inverted>
								Se déconnecter
							</Button>
						</li>
					)}
					{user == null && (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
						<li className="action-button">
							<Button circular onClick={handleSignIn}>
								Se connecter
							</Button>
						</li>
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
