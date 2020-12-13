import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as QrcodeIcon } from '../../assets/icons/qrcode.svg';
import './BottomNav.less';

const BottomNav = () => (
  <nav className="bottom-nav">
    <ul>
      <li className="active">
        <HomeIcon />
        <span className="label">Accueil</span>
      </li>
      <li>
        <SearchIcon />
        <span className="label">recherche</span>
      </li>
      <li>
        <QrcodeIcon />
        <span className="label">QRcode</span>
      </li>
    </ul>
  </nav>
);

export default BottomNav;
