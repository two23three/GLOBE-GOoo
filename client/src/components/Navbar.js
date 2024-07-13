import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-brand">Globe GO</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
