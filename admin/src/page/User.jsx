import React from 'react';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import styles from './Main.module.css';
const User = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <span>
        <List />
      </span>
    </div>
  );
};

export default User;
