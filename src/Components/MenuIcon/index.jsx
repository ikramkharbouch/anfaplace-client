import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MenuIcon.less';

const MenuIcon = ({ clicked }) => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {

        setMenuOpen(prev => !prev);
        clicked(!isMenuOpen);
    }

    return (
        <button className={`hamburger hamburger--collapse ${isMenuOpen ? 'is-active' : ''}`} type="button" onClick={handleClick}>
            <span className="hamburger-box">
                <span className="hamburger-inner" />
            </span>
        </button>
    )
}

MenuIcon.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default MenuIcon;
