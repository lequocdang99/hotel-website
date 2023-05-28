import React from 'react';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import New from '../components/New';
import Edit from '../components/Edit';
import styles from './Main.module.css';

const Hotel = () => {
  //URL path
  const url = window.location.pathname;
  return (
    <div className={styles.main}>
      <Sidebar />
      <span>
        {url === '/hotel' ? (
          <List />
        ) : url === '/hotel/new' ? (
          <New />
        ) : (
          <Edit />
        )}
      </span>
    </div>
  );
};

export default Hotel;
