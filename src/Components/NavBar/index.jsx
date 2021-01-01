import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import proptypes from 'prop-types';
import { motion } from 'framer-motion';
import './NavBar.less';

import logoSmall from 'src/assets/images/logo-small.png';

import Menu from 'src/Components/Menu';
import { Header } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';

import MenuIcon from '../MenuIcon';
// import Coupon from '../CouponsGrid';

const Points = ({ points, clicked }) => (
	<button type="button" className="points" onClick={clicked} >
		{points}p
	</button>
)

Points.propTypes = {
	points: proptypes.number,
	clicked: proptypes.func.isRequired,
};
Points.defaultProps = {
	points: 50,
};

const variants = {
	start: { scale: 2000, transition: { duration: 0.8 } },
	reverse: { scale: 1, transition: { duration: 0.9 } },
};

const NavBar = ({ scrollableMenuEvent }) => {
	const [currentURL, setCurrentURL] = useState('');
	const [isMenuOpen, setOpen] = useState(false);
	const { pathname } = useLocation();
	const history = useHistory();
	const handleButtonClick = () => {
		if (!(history.location.pathname === '/couponList')) {
			history.push('/couponList');
		}
	};

	history.listen((data) => {
		setCurrentURL(data.pathname);
	})

	const scrollableMenu = ['/shopping', '/restauration', '/entertainment'].includes(pathname);
	const setOverflowHidden = useCallback(
		(selector) => {
			if (isMenuOpen) {
				document.querySelector(selector).style.overflow = 'hidden';
				return;
			}
			document.querySelector(selector).style.overflow = 'unset';
		},
		[isMenuOpen]
	);
	useEffect(() => {
		scrollableMenuEvent(scrollableMenu);
	}, [scrollableMenu, pathname]);

	setOverflowHidden('body');

	return (
		<>
			<header className={`navBar ${isMenuOpen ? 'open' : ''} ${scrollableMenu ? 'scrollable' : ''}`}>
				{currentURL.includes('couponList') && <BackButton />}
				<div className="nave-bar-menu" style={{ display: 'flex' }}>
					{
						!currentURL.includes('/couponList') && <>
							<MenuIcon openMenu={setOpen} isMenuOpen={isMenuOpen} />
							{isMenuOpen && <Header as="h3">MENU</Header>}
						</>
					}

				</div>
				{!isMenuOpen && (
					<>
						{!currentURL.includes('/couponList') && <img src={logoSmall} alt="apa" />}
						<Points clicked={handleButtonClick} />
					</>
				)}

				{/* {isMenuOpen && ( */}
				{/*	<h2 className="app-medium-title"> */}
				{/*		Vous avez <span className="text-white-blue"> 50 points </span>{' '} */}
				{/*	</h2> */}
				{/* )} */}
			</header>
			<motion.div
				className="bg-light-blue"
				variants={variants}
				animate={isMenuOpen ? 'start' : 'reverse'}
			/>

			<div className="menu-container" style={{ zIndex: isMenuOpen ? 930 : -1 }}>
				<Menu menuOpen={isMenuOpen} />
				{/* <Coupon menuOpen={isMenuOpen} closeMenu={() => setOpen(false)} /> */}
			</div>
		</>
	);
};

NavBar.propTypes = {
	scrollableMenuEvent: proptypes.func.isRequired,
};

export default NavBar;
