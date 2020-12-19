import React, { useState, useCallback } from 'react';
import proptypes from 'prop-types';
import { motion } from 'framer-motion';
import './NavBar.less';

import logoSmall from 'src/assets/images/logo-small.png';

import MenuIcon from '../MenuIcon';
import Coupon from '../CouponsGrid';

const Points = ({ points }) => (
	<button type="button" className="points">
		{points}p
	</button>
);

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

const NavBar = () => {
	const [isMenuOpen, setOpen] = useState(false);

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

	setOverflowHidden('body');

	return (
		<>
			<header className="navBar">
				<MenuIcon clicked={setOpen} />
				{!isMenuOpen && (
					<>
						<img src={logoSmall} alt="apa" />
						<Points />
					</>
				)}

				{isMenuOpen && (
					<h2 className="app-medium-title">
						Vous avez <span className="text-white-blue"> 50 points </span>{' '}
					</h2>
				)}
			</header>
			<motion.div
				className="bg-light-blue"
				variants={variants}
				animate={isMenuOpen ? 'start' : 'reverse'}
			/>
			<div className="coupon-menu-container">
				<Coupon menuOpen={isMenuOpen} />
			</div>
		</>
	);
};

export default NavBar;
