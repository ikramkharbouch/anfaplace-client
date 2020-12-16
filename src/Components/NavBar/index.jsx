import * as React from 'react';
import proptypes from 'prop-types';
import './NavBar.less';
import logoSmall from 'src/assets/images/logo-small.png';
import { Icon } from 'semantic-ui-react';

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
const NavBar = () => (
	<header className="navBar">
		<Icon className="menu" name="bars" size="big" />
		<img src={logoSmall} alt="apa" />
		<Points />
	</header>
);

export default NavBar;
