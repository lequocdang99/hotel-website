import React from 'react';
import Sidebar from '../components/Sidebar';
import Transaction from '../components/List';
import styles from './Main.module.css';

const Trans = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <span>
        <Transaction />
      </span>
    </div>
  );
};

export default Trans;
