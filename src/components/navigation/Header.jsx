import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';

const Header = ({ userUsername, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
      <nav className="header-nav">
        <h1 className="header-title">Cinema Guru</h1>
        <div className="header-user-group">
          <img src="https://picsum.photos/100/100" alt="avatar" />
          <p>Welcome, {userUsername}!</p>
          <span className="logout-button" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </span>
        </div>
      </nav>
  );
};

export default Header;