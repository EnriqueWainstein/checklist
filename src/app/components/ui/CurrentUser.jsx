'use client';

import React, { useState } from 'react';
import { FaSignOutAlt, FaUser, FaUserCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './currentUser.css';

const CurrentUser = ({ currentUser, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest('.current-user-container')) {
      setDropdownOpen(false);
    }
  };
  React.useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [dropdownOpen]);


  return (
    <div className="current-user-container">
      <button
        type="button"
        className="user-menu-button"
        id="user-menu"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="sr-only">Abrir menú de usuario</span>
        <div className="user-button-content">
            {currentUser.avatar ? (
              <div className="user-avatar">
              <img
              src={currentUser.avatar}
              alt={`Foto de ${currentUser.name}`}
            />
            </div>
          ) : (
            <FaUser className="notificationIcon"/>
          )}
          <span className="user-name">{currentUser.name}</span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          className="user-dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <button className="dropdown-item" onClick={() => {router.push('/user')}}>
            <FaUserCog className="icon" />
            Mi perfil
          </button>
          <div className="dropdown-item">
            {currentUser.email}
          </div>
          <div
            onClick={handleLogout}
            className="dropdown-item logout-item"
            role="menuitem"
          >
            <FaSignOutAlt className="icon" />
            Cerrar sesión
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentUser;
