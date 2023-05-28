import React from 'react';
import styles from './Main.module.css';
import Sidebar from '../components/Sidebar';
import Transaction from '../components/List';
import InfoBoard from '../components/InfoBoard';

const Home = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <span>
        <InfoBoard />
        <Transaction />
      </span>
    </div>
  );
};

export default Home;
