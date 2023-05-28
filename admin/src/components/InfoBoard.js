import React, { useState, useEffect } from 'react';
import './InfoBoard.css';
import styles from './Card.module.css';

const InfoBoard = () => {
  //Information state
  const [info, setInfo] = useState({
    users: 0,
    orders: 0,
    earnings: 0,
    balance: 0,
  });
  //Fetch order information
  const adminInfoHandler = async () => {
    try {
      const response = await fetch('http://localhost:5000/transaction');
      const data = await response.json();
      if (data.result) {
        setInfo({
          users: new Set(data.result.map((e) => e.user)).size,
          orders: data.result.length,
          earnings: data.result.map((e) => e.price).reduce((a, b) => a + b),
          balance: data.result.map((e) => e.price).reduce((a, b) => a + b),
        });
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    adminInfoHandler();
  });
  return (
    <div className='infoboard'>
      <div
        className={styles.card}
        id='user'
      >
        <h1>USERS</h1>
        <h2>{info.users}</h2>
        <i className='material-icons'>&#xe7ff;</i>
      </div>
      <div
        className={styles.card}
        id='order'
      >
        <h1>ORDERS</h1>
        <h2>{info.orders}</h2>
        <i className='material-icons'>&#xe8cc;</i>
      </div>
      <div
        className={styles.card}
        id='earning'
      >
        <h1>EARNINGS</h1>
        <h2>$ {info.earnings}</h2>
        <i className='material-icons'>&#xe263;</i>
      </div>
      <div
        className={styles.card}
        id='balance'
      >
        <h1>BALANCE</h1>
        <h2>$ {info.balance}</h2>
        <i className='material-icons'>&#xe850;</i>
      </div>
    </div>
  );
};

export default InfoBoard;
