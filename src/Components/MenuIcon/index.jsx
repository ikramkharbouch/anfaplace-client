import React from 'react';
import PropTypes from 'prop-types';
import './MenuIcon.less';

const MenuIcon = ({ openMenu, isMenuOpen }) => {
	const handleClick = () => {
		openMenu(!isMenuOpen);
	};

	return (
		<button
			className={`hamburger hamburger--collapse ${isMenuOpen ? 'is-active' : ''}`}
			type="button"
			onClick={handleClick}
		>
			<span className="hamburger-box">
				<span className="hamburger-inner" />
			</span>
		</button>
	);
};

MenuIcon.propTypes = {
	openMenu: PropTypes.func.isRequired,
	isMenuOpen: PropTypes.bool.isRequired,
};

export default MenuIcon;
