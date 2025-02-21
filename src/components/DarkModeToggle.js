import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/DarkModeToggle.css';

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}

export default DarkModeToggle;
