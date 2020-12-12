import * as React from 'react';
import proptypes from 'prop-types';
import './NavBar.less';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import logoSmall from '../../assets/images/logo-small.png';

const Points = ({ points }) => <buton className="points">{points}p</buton>;

Points.propTypes = {
  points: proptypes.number,
};
Points.defaultProps = {
  points: 50,
};
const NavBar = () => (
  <header className="navBar">
    <MenuIcon />
    <img src={logoSmall} alt="apa" />
    <Points />
  </header>
);

export default NavBar;
