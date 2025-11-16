'use client';

import { useState } from 'react';
import { useCurrentUser } from '../../../lib/state';
import './navbar.css';

// Importar los componentes modulares
import Logo from './Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Menu from './Menu';
import Notifications from './Notifications';
import CurrentUser from '../ui/CurrentUser';
import { clearAuth } from '@/lib/storage';

export default function Navbar() {
  const { currentUser, updateCurrentUser, logoutUser } = useCurrentUser();
  const pathname = usePathname();
  const logout = () => {

    clearAuth();
    updateCurrentUser(null);
    logoutUser();

    setTimeout(() => {
      console.log('recargando pagina');
      window.location.reload();
    }, 100);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationIndicator, setNotificationIndicator] = useState(true);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo and Menu */}
        <div className="navbar-left">
          <Logo />
          {currentUser && <Menu />}
        </div>

        {/* User Menu */}
        <div className="navbar-right">
          {currentUser ? (
            <>
              <Notifications notificationIndicator={notificationIndicator} />
              <CurrentUser currentUser={currentUser} logout={logout} />
            </>
          ) : (
            <div className="desktopNavLinks">
              <Link 
                href="/auth/login" 
                className={`navLink ${pathname === '/auth/login' ? 'activeLink' : 'inactiveLink'}`}
              >
                <FaSignInAlt className="navIcon" />
                Iniciar Sesión
              </Link>
              <Link 
                href="/auth/signup" 
                className={`navLink ${pathname === '/auth/signup' ? 'activeLink' : 'inactiveLink'}`}
              >
                <FaUserPlus className="navIcon" />
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}