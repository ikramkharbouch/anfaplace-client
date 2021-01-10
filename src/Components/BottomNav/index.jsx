import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './BottomNav.less';

const BottomNav = () => {
	const pathName = useLocation().pathname;
	return (
		['/', '/tour', '/entertainment', '/qrcode', '/events'].includes(pathName) && (
			<nav className="bottom-nav">
				<ul>
					<li>
						<NavLink exact to="/">
							<Icon name="home" />
							<span className="label">Accueil</span>
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/tour">
							<Icon name="search" />
							<span className="label">Parcourir</span>
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/qrcode">
							<Icon name="qrcode" />
							<span className="label">QRcode</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		)
	);
};

export default BottomNav;
