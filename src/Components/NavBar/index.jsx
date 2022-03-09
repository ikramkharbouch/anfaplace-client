import React, { useState, useCallback, useLayoutEffect, useRef, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import proptypes from 'prop-types';
import { motion } from 'framer-motion';

// import { ReactComponent as Logo } from 'src/assets/images/logo.svg';
import { ReactComponent as NewLogo } from 'src/assets/images/newLogo.svg';

// import logo from 'src/assets/images/new-logo.png'

import Menu from 'src/Components/Menu';
import { Icon } from 'semantic-ui-react';
// import BackButton from 'src/Components/BackButton/BackButton';

// import MenuIcon from '../MenuIcon';
import './NavBar.less';
// import Example from '../MenuV2/Example';

const HomeNavigation = () => (
	<nav className="navigation">
		<ul>
			<li>
				<Link to="/shopping">Shopping</Link>
			</li>
			<li>
				<Link to="/restauration">Restauration</Link>
			</li>
			{/* <li>
				<Link to="/entertainment">Divertissement</Link>
			</li> */}
			<li>
				<Link to="/divertissement">Divertissement</Link>
			</li>
		</ul>
	</nav>
);

const Points = ({ points, clicked }) => (
	<button type="button" className="points" onClick={clicked}>
		{`${points}`}p
	</button>
);

Points.propTypes = {
	points: proptypes.number.isRequired,
	clicked: proptypes.func.isRequired,
};

const variants = {
	start: { scale: 3000, transition: { duration: 0.8 } },
	reverse: { scale: 1, transition: { duration: 0.7 } },
};

const NavBar = () => {
	const [currentURL, setCurrentURL] = useState('');
	const [isMenuOpen, setOpen] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [zIndex, setZindex] = useState(930);
	const { pathname } = useLocation();
	const history = useHistory();

	const handleButtonClick = () => {
		if (!(history.location.pathname === '/account')) {
			history.push('/account');
		}
	};

	useEffect(() => {
		setCurrentURL(history.location.pathname);
	}, [history.location.pathname]);

	history.listen((data) => {
		setCurrentURL(data.pathname);
	});

	const setOverflowHidden = useCallback(
		(selector) => {
			if (isMenuOpen) {
				document.querySelector(selector).style.overflow = 'hidden';
			}
			document.querySelector(selector).style.overflow = 'unset';
		},
		[isMenuOpen]
	);
	const navBarRef = useRef();
	const onScroll = () => {
		const scrollPosition = window.scrollY;
		if (scrollPosition < 120) {
			navBarRef.current.style.backgroundColor = `rgba(0,0,52,${(scrollPosition * 0.4) / 130})`;
			navBarRef.current.style.backdropFilter = `blur(${(scrollPosition * 3) / 130}px)`;
		}

		if (history.location.pathname !== '/' && scrollPosition < 120) {
			navBarRef.current.style.backgroundColor = '#000034';
		}
	};
	useLayoutEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	setOverflowHidden('body');
	// const dontShowBackButton = !['/', '/tour', '/all-brands', '/survey'].includes(pathname);
	return (
		<>
			<header ref={navBarRef} className={`navBar ${isMenuOpen ? 'open' : ''} `}>
				<div className="nave-bar-menu" style={{ display: 'flex' }}>
					{currentURL === '/' && (
						<div />
						// <>
						// 	<MenuIcon openMenu={setOpen} isMenuOpen={isMenuOpen} />
						// 	{isMenuOpen && <Header as="h3">MENU</Header>}
						// </>
					)}
					{currentURL !== '/' && !isMenuOpen && <div />}
				</div>
				{showMenu && (
					<>
						{/* {!currentURL.includes('/coupon-list') && !currentURL.includes('/account')  && (
							<NewLogo onClick={() => history.push('/')} height={33} />
							// <img src = {} alt = '' />
						)} */}

						<NewLogo style={{ marginLeft: 25 }} onClick={() => history.push('/')} height={33} />

						<Icon size="large" name="user outline" onClick={handleButtonClick} />
					</>
				)}
				{pathname === '/' && showMenu && <HomeNavigation />}
			</header>

			<motion.div
				className="bg-light-blue"
				variants={variants}
				animate={isMenuOpen ? 'start' : 'reverse'}
				onAnimationStart={() =>
					isMenuOpen
						? (setZindex(980), setShowMenu(false))
						: setTimeout(() => {
								setZindex(-1);
								setShowMenu(true);
						  }, 700)
				}
			/>

			<div className="menu-container" style={{ zIndex: `${zIndex}` }}>
				<Menu closeMenu={() => setOpen(false)} menuOpen={isMenuOpen} />
			</div>
		</>
	);
};

export default NavBar;
