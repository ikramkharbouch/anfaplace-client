/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApp from 'src/utils/initApp';
import Modal from 'src/Components/Modal';
import PropTypes from 'prop-types';

import { openAuthModal } from 'src/store/shared';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Icon, Button } from 'semantic-ui-react';

import planAnfaImg1 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0001.jpg';
import planAnfaImg2 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0002.jpg';
import planAnfaImg3 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0003.jpg';
import planAnfaImg4 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0004.jpg';
import ContactForm from '../ContactForm/index';
import RegisterForm from '../RegisterForm/index';
import Slider from '../Slider/index';

import { MenuItem } from './MenuItem';

const auth = firebaseApp.auth();

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};
const eventText = `Ma liste d'évènements`;

const getPdfUrl = () => [planAnfaImg1, planAnfaImg2, planAnfaImg3, planAnfaImg4];

// const itemIds = [0, 1, 2, 3, 4];

const Navigation = ({ toggle }) => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [modalPlanOpen, setModalPlanOpen] = React.useState(false);
	const [modalContactOpen, setModalContactOpen] = React.useState(false);
	const [modalRegisterOpen, setModalRegisterOpen] = React.useState(false);
	const user = useSelector((state) => state.user.currentUser);
	const [logOutLoading, setLogOutLoading] = React.useState(false);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		setLogOutLoading(true);
		auth.signOut().then(() => setLogOutLoading(false));
	};
	const handleSignIn = () => {
		dispatch(openAuthModal(true));
	};

	React.useEffect(() => {
		console.log('logged');
	}, []);

	return (
		<>
			<motion.ul variants={variants} className="menu-list">
				{/* {itemIds.map((i) => (
                <MenuItem i={i} key={i} />
            ))} */}
				{user && (
					<MenuItem>
						<Header className="greetings" as="h1">
							<div style={{ padding: '0 15px' }}>
								Bienvenue, {user.name} !
								<p style={{ fontSize: '1.2rem', width: '90%', margin: '0 auto' }}>
									Votre centre Anfaplace Mall est ouvert aujourd’hui de 10:00 à 23:00{' '}
									<a href="mailto:info@myanfaplace.com">info@myanfaplace.com</a>
								</p>
							</div>
						</Header>
					</MenuItem>
				)}

				{!user && (
					<MenuItem>
						<div style={{ width: '85vw', height: '20vh' }} />
					</MenuItem>
				)}
				<MenuItem>
					<NavLink onClick={toggle} exact to="/my-visited-list">
						<Header as="h1">
							<Header.Content>Ma liste de visite</Header.Content>

							<Icon name="calendar" />
						</Header>
					</NavLink>
				</MenuItem>
				<MenuItem>
					<NavLink onClick={toggle} exact to="/my-events-list">
						<Header as="h1">
							<Header.Content>{eventText}</Header.Content>

							<Icon name="calendar" />
						</Header>
					</NavLink>
				</MenuItem>
				<MenuItem>
					<a href="tel:0668194101">
						<Header as="h1">
							<Header.Content>Appeler Anfaplace Mall</Header.Content>
							<Icon name="phone" />
						</Header>
					</a>
				</MenuItem>
				<MenuItem>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a href="#" onClick={() => setModalContactOpen(true)}>
						<Header as="h1">
							<Header.Content>Contactez-nous</Header.Content>
							<Icon name="envelope outline" />
						</Header>
					</a>
				</MenuItem>
				<MenuItem>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a href="#" onClick={() => setModalPlanOpen(true)}>
						<Header as="h1">
							<Header.Content>Plans du mall </Header.Content>
							<Icon name="map outline" />
						</Header>
					</a>
				</MenuItem>
				<MenuItem>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					{/* <a target="_blank" rel="noreferrer" href="https://goo.gl/maps/7kWkfyj1kmxYPp7m7">
							<Header as="h1">
								<Header.Content>Localisation Mall</Header.Content>
								<Icon name="map marker alternate" />
							</Header>
						</a> */}
					<a href="#" onClick={() => setModalOpen(true)}>
						<Header as="h1">
							<Header.Content>Localisation Mall</Header.Content>
							<Icon name="map marker alternate" />
						</Header>
					</a>
				</MenuItem>
				<div style={{ height: 40, width: '100%' }} />
				{user && (
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
					<MenuItem className="action-button">
						<Button loading={logOutLoading} circular onClick={handleSignOut} inverted>
							Se déconnecter
						</Button>
					</MenuItem>
				)}
				{user == null && (
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
					<MenuItem className="action-button">
						<Button circular onClick={handleSignIn}>
							Se connecter
						</Button>
					</MenuItem>
				)}
			</motion.ul>
			<Modal open={modalOpen} setOpen={(isOpen) => setModalOpen(isOpen)}>
				<iframe
					title="mall map"
					src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13293.094659444781!2d-7.664799799999999!3d33.5982032!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb91ed398330cf3cd!2sANFAPLACE%20MALL!5e0!3m2!1sfr!2sma!4v1631024966413!5m2!1sfr!2sma"
					width="100%"
					height="450"
					style={{ border: 0 }}
					loading="lazy"
				/>
			</Modal>
			<Modal open={modalPlanOpen} setOpen={(isOpen) => setModalPlanOpen(isOpen)}>
				<Slider autoplay={false} pagination id="brand-details">
					{getPdfUrl().map((image) => (
						<img style={{ width: '100%', objectFit: 'cover' }} key={image} src={image} alt={image} />
					))}
				</Slider>
			</Modal>

			<Modal open={modalContactOpen} setOpen={(isOpen) => setModalContactOpen(isOpen)}>
				<ContactForm
					onSuccess={() =>
						setTimeout(() => {
							setModalContactOpen(false);
						}, 500)
					}
				/>
			</Modal>

			<Modal open={modalRegisterOpen} setOpen={(isOpen) => setModalRegisterOpen(isOpen)}>
				<RegisterForm onSuccess={() => setModalRegisterOpen(false)} />
			</Modal>
		</>
	);
};

Navigation.defaultProps = {
	toggle: () => {},
};

Navigation.propTypes = {
	toggle: PropTypes.func,
};

export default Navigation;
