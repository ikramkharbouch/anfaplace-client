import React, { useState, useCallback, useLayoutEffect, useRef } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import proptypes from 'prop-types';
import { motion } from 'framer-motion';

import { ReactComponent as Logo } from 'src/assets/images/logo.svg';

import Menu from 'src/Components/Menu';
import { Header } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';

import MenuIcon from '../MenuIcon';
import './NavBar.less';

const HomeNavigation = () => (
	<nav className="navigation">
		<ul>
			<li>
				<Link to="/shopping">Shopping</Link>
			</li>
			<li>
				<Link to="/restauration">Restauration</Link>
			</li>
			<li>
				<Link to="/entertainment">Divertissement</Link>
			</li>
		</ul>
	</nav>
);

const Points = ({ points, clicked }) => (
	<button type="button" className="points" onClick={clicked}>
		{points}p
	</button>
);

Points.propTypes = {
	points: proptypes.number,
	clicked: proptypes.func.isRequired,
};
Points.defaultProps = {
	points: 50,
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
		if (!(history.location.pathname === '/coupon-list')) {
			history.push('/coupon-list');
		}
	};

	history.listen((data) => {
		setCurrentURL(data.pathname);
	});

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
	const navBarRef = useRef();
	const onScroll = () => {
		const scrollPosition = window.scrollY;
		if (scrollPosition < 120) {
			navBarRef.current.style.backgroundColor = `rgba(0,0,52,${(scrollPosition * 0.4) / 130})`;
			navBarRef.current.style.backdropFilter = `blur(${(scrollPosition * 2) / 130}px)`;
		}
	};

	useLayoutEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	setOverflowHidden('body');
	const dontShowBackButton = !['/', '/tour', '/all-brands'].includes(pathname);
	return (
		<>
			<header ref={navBarRef} className={`navBar ${isMenuOpen ? 'open' : ''} `}>
				<div className="nave-bar-menu" style={{ display: 'flex' }}>
					{!currentURL.includes('/coupon-list') && (
						<>
							<MenuIcon openMenu={setOpen} isMenuOpen={isMenuOpen} />
							{isMenuOpen && <Header as="h3">MENU</Header>}
						</>
					)}
				</div>
				{showMenu && (
					<>
						{!currentURL.includes('/coupon-list') && <Logo height={33} />}
						<Points clicked={handleButtonClick} />
					</>
				)}
				{(pathname === '/' && showMenu) && <HomeNavigation />}


			</header>
			{dontShowBackButton && (
				<BackButton className={pathname.split('/')[1]} path={pathname.split('/')[1]} />
			)}
			<motion.div
				className="bg-light-blue"
				variants={variants}
				animate={isMenuOpen ? 'start' : 'reverse'}
				onAnimationStart={() =>
					isMenuOpen
						? (setZindex(980), setShowMenu(false))
						: setTimeout(() => { setZindex(-1); setShowMenu(true) }, 700)
				}
			/>

			<div className="menu-container" style={{ zIndex: `${zIndex}` }}>
				<Menu closeMenu={() => setOpen(false)} menuOpen={isMenuOpen} />
			</div>
		</>
	);
};

export default NavBar;
