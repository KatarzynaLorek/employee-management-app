import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar: React.FC = () => {
  return (
    <>
      <div className="navbar">
        <NavLink exact to="/" className="navbar__title">
          Employee management app
        </NavLink>
        <nav className="navbar__navigation">
          <NavLink exact to="/" className="navbar__button" activeClassName="navbar__button--active">
            Table
          </NavLink>
          <NavLink
            exact
            to="/charts"
            className="navbar__button"
            activeClassName=" navbar__button--active"
          >
            Charts
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
