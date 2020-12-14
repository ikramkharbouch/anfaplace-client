import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as QrcodeIcon } from '../../assets/icons/qrcode.svg';
import './BottomNav.less';

const BottomNav = () => (
  <nav className="bottom-nav">
    <ul>
      <li>
        <NavLink exact to="/">
          <HomeIcon />
          <span className="label">Accueil</span>
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/tour">
          <SearchIcon />
          <span className="label">Parcourir</span>
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/qrcode">
          <QrcodeIcon />
          <span className="label">QRcode</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default BottomNav;
