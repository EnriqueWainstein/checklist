'use client';

import { useState } from 'react';
//import { useAuth } from '../../../auth/AuthProvider';
import styles from './navbar.css';
import { useCurrentUser } from '../../../lib/state';

// Importar los componentes modulares
import Logo from './Logo';
import Menu from './Menu';
import Notifications from './Notifications';
import CurrentUser from '../ui/CurrentUser';
import { clearAuth } from '@/lib/storage';

export default function Navbar() {
  const { currentUser, updateCurrentUser } = useCurrentUser();
  const logout = () => {
    clearAuth();
    updateCurrentUser(null);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationIndicator, setNotificationIndicator] = useState(true);

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo and Menu */}
        <div className="navbar-left">
          <Logo />
          <Menu />
        </div>

        {/* User Menu */}
        <div className="navbar-right">
          <Notifications notificationIndicator={notificationIndicator} />
          <CurrentUser currentUser={currentUser} logout={logout} />
        </div>
      </div>
    </nav>
  );
}