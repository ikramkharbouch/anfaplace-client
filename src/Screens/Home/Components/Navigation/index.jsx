import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.less';

const Navigation = () => (
  <nav className="navigation">
    <ul>
      <li>
        <Link to="/">Shopping</Link>
      </li>
      <li>
        <Link to="/">Restauration</Link>
      </li>
      <li>
        <Link to="/">Divertissement</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
