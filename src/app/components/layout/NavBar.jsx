'use client';

import { useState } from 'react';
//import { useAuth } from '../../../auth/AuthProvider';
import styles from './navbar.css';


// Importar los componentes modulares
import Logo from './Logo';
import Menu from './Menu';
import Notifications from './Notifications';
import CurrentUser from '../ui/CurrentUser';
import { useCurrentUser } from '@/lib/state';

export default function Navbar() {
  const { logoutUser, currentUser, updateCurrentUser } = useCurrentUser();
  const logout = () => {
    logoutUser();
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationIndicator, setNotificationIndicator] = useState(true);

  if (!currentUser) return null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoMenu}>
        <Logo />
        <Menu />
      </div>
      <div className={styles.userActions}>
        <Notifications />
        <CurrentUser />

        <button
          onClick={logout}
          className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>

      </div>
    </nav>
  );
}