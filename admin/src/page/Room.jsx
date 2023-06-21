import React from 'react';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import styles from './Main.module.css';
import New from '../components/New';
import Edit from '../components/Edit';

const Room = () => {
  const url = window.location.pathname;
  return (
    <div className={styles.main}>
      <Sidebar />
      <span>
        {url === '/room' ? <List /> : url === '/room/new' ? <New /> : <Edit />}
      </span>
    </div>
  );
};

export default Room;
