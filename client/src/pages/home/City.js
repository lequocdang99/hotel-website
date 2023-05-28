import React from 'react';
import './City.css';

const City = ({ hanoi, hcm, danang }) => {
  return (
    <div className='city'>
      <div className='city-items'>
        <img
          src='./images/Ha Noi.jpg'
          alt='Ha Noi'
        ></img>
        <h1>Ha Noi</h1>
        <h2>{hanoi} properties</h2>
      </div>
      <div className='city-items'>
        <img
          src='./images/HCM.jpg'
          alt='Ho Chi Minh City'
        ></img>
        <h1>Ho Chi Minh City</h1>
        <h2>{hcm} properties</h2>
      </div>
      <div className='city-items'>
        <img
          src='./images/Da Nang.jpg'
          alt='Da Nang'
        ></img>
        <h1>Da Nang</h1>
        <h2>{danang} properties</h2>
      </div>
    </div>
  );
};

export default City;
