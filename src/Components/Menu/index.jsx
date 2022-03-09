/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import bg from 'src/assets/images/menu-bg.jpg';
import firebaseApp from 'src/utils/initApp';
import './Menu.less';
import { Button, Header, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
// import { openPhoneAuth } from 'src/store/app';
import { openAuthModal } from 'src/store/shared';

// import plan from 'src/assets/pdf/plan_Anfaplace_Mall.pdf';
import Modal from 'src/Components/Modal';
import planAnfaImg1 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0001.jpg';
import planAnfaImg2 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0002.jpg';
import planAnfaImg3 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0003.jpg';
import planAnfaImg4 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0004.jpg';

import Slider from '../Slider/index';
import ContactForm from '../ContactForm/index';
import RegisterForm from '../RegisterForm/index';

const auth = firebaseApp.auth();

const eventText = `Ma liste d'évènements`;

const getPdfUrl = () => [planAnfaImg1, planAnfaImg2, planAnfaImg3, planAnfaImg4];

const Menu = ({ menuOpen, closeMenu }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalPlanOpen, setModalPlanOpen] = useState(false);
	const [modalContactOpen, setModalContactOpen] = useState(false);
	const [modalRegisterOpen, setModalRegisterOpen] = useState(false);

	const variants = {
		start: {
			opacity: 1,
			zIndex: 930,
			transition: { duration: 0.2, delay: 0.4, staggerChildren: 0.2 },
		},
		reverse: { opacity: 0, y: -50, transition: { duration: 0.3, delay: 0.2 } },
	};

	const listVariant = {
		start: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.2, delay: 0.2 } },
		reverse: { opacity: 0, transition: { duration: 0.4, staggerChildren: 0.2, delay: 0.3 }, y: -20 },
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
		dispatch(openAuthModal(true));
	};

	return (
		<motion.div className="container" variants={variants} animate={menuOpen ? 'start' : 'reverse'}>
			<div className="image">
				<img src={bg} alt="menu-bg" />
			</div>
			{user && (
				<>
					<Header className="greetings" as="h1">
						<div style={{ padding: '0 15px' }}>
							Bienvenue, {user.displayName} !
							<p style={{ fontSize: '1.2rem', width: '90%', margin: '0 auto' }}>
								Votre centre Anfaplace Mall est ouvert aujourd’hui de 10:00 à 23:00{' '}
								<a href="mailto:info@myanfaplace.com">info@myanfaplace.com</a>
							</p>
						</div>
					</Header>
				</>
			)}
			<nav>
				<motion.ul variants={listVariant} animate={menuOpen ? 'start' : 'reverse'}>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						<NavLink onClick={closeMenu} exact to="/my-visited-list">
							<Header as="h1">
								<Header.Content>Ma liste de visite</Header.Content>

								<Icon name="verification-calendar-outline" />
							</Header>
						</NavLink>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						<NavLink onClick={closeMenu} exact to="/my-events-list">
							<Header as="h1">
								<Header.Content>{eventText}</Header.Content>

								<Icon name="calendar-outline" />
							</Header>
						</NavLink>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						<a href="tel:0668194101">
							<Header as="h1">
								<Header.Content>Appeler Anfaplace Mall</Header.Content>
								<Icon name="phone-outline" />
							</Header>
						</a>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#" onClick={() => setModalContactOpen(true)}>
							<Header as="h1">
								<Header.Content>Contactez-nous</Header.Content>
								<Icon name="envelope outline" />
							</Header>
						</a>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#" onClick={() => setModalPlanOpen(true)}>
							<Header as="h1">
								<Header.Content>Plans du mall </Header.Content>
								<Icon name="map outline" />
							</Header>
						</a>
					</motion.li>
					<motion.li variants={item} animate={menuOpen ? 'start' : 'reverse'}>
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
		</motion.div>
	);
};

Menu.propTypes = {
	menuOpen: PropTypes.bool.isRequired,
	closeMenu: PropTypes.func.isRequired,
};

export default Menu;
