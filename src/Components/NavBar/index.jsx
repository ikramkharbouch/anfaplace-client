import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import proptypes from 'prop-types';
import { motion } from 'framer-motion';
import './NavBar.less';

import logoSmall from 'src/assets/images/logo-small.png';

import Menu from 'src/Components/Menu';
import { Header } from 'semantic-ui-react';
import MenuIcon from '../MenuIcon';
// import Coupon from '../CouponsGrid';

const Points = ({ points }) => {

	const history = useHistory();

	const handleClick = () => history.push('/couponList');

	return (
		<button type="button" className="points" onClick={handleClick} >
			{points}p
		</button>
	)
};

Points.propTypes = {
	points: proptypes.number,
};
Points.defaultProps = {
	points: 50,
};

const variants = {
	start: { scale: 2000, transition: { duration: 0.8 } },
	reverse: { scale: 1, transition: { duration: 0.9 } },
};

const NavBar = ({ scrollableMenuEvent }) => {
	const [isMenuOpen, setOpen] = useState(false);
	const { pathname } = useLocation();
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
	}, [scrollableMenu]);

	setOverflowHidden('body');

	return (
		<>
			<header className={`navBar ${isMenuOpen ? 'open' : ''} ${scrollableMenu ? 'scrollable' : ''}`}>
				<div className="nave-bar-menu" style={{ display: 'flex' }}>
					<MenuIcon openMenu={setOpen} isMenuOpen={isMenuOpen} />
					{isMenuOpen && <Header as="h3">MENU</Header>}
				</div>
				{!isMenuOpen && (
					<>
						<img src={logoSmall} alt="apa" />
						<Points />
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
