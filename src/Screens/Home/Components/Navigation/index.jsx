import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.less';

const Navigation = () => (
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

export default Navigation;
