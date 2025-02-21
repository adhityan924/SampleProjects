import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

function Navbar() {
  const { darkMode } = useTheme();
  
  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-brand">
        <h1>🍕 Pizza Paradise</h1>
      </div>
      <div className="nav-links">
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <DarkModeToggle />
        <button className="order-btn">Order Now</button>
      </div>
    </nav>
  );
}

export default Navbar;
