import React, { useEffect, useState } from 'react';
import NavBarItem from './NavBarItem';
import styles from './Button.module.css';
import './NavBar.css';

const NavBarData = require('../../data/navBar.json');

const NavBar = () => {
  const [email, setEmail] = useState(null);
  //Username
  useEffect(() => setEmail(JSON.parse(localStorage.getItem('username'))), []);
  //Log out handler
  const logoutHandler = () => {
    localStorage.clear();
    setEmail(null);
  };

  return (
    <div className='nav-bar'>
      <h1
        id='title'
        onClick={() => (window.location.href = '/')}
      >
        Booking Website
      </h1>
      {!email ? (
        <>
          <button
            type='submit'
            className={styles.button}
            onClick={() => (window.location.href = '/user/login')}
          >
            Login
          </button>
          <button
            type='submit'
            className={styles.button}
            onClick={() => (window.location.href = '/user/signup')}
          >
            Sign Up
          </button>
        </>
      ) : (
        <>
          <button
            type='submit'
            className={styles.button}
            onClick={logoutHandler}
          >
            Logout
          </button>
          <button
            type='submit'
            className={styles.button}
            onClick={() =>
              (window.location.href = `/transaction?username=${email}`)
            }
          >
            Transactions
          </button>
        </>
      )}
      <h1 id='nav-bar_email'>{email}</h1>
      {window.location.pathname !== '/user/login' &&
        window.location.pathname !== '/user/signup' && (
          <NavBarItem items={NavBarData} />
        )}
    </div>
  );
};

export default NavBar;
