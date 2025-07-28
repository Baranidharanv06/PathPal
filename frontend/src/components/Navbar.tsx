import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <img src={logo} alt="PathPal Logo" />
          <span>PathPal</span>
        </Link>
        
        <div className="navbar-menu">
          <Link to="/create-pool" className="navbar-link">
            Create Pool
          </Link>
          <div className="navbar-user-info">
            {/* Turn the welcome message into a link */}
            <Link to="/profile" className="navbar-link">
              Welcome, {user?.name || 'User'}!
            </Link>
            <button onClick={handleLogout} className="navbar-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;