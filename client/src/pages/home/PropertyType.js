import React from 'react';
import './PropertyType.css';

const PropertyType = ({ hotel, apartment, resort, villa, cabin }) => {
  return (
    <div className='type'>
      <h1>Browse by property type</h1>
      <div className='type-items'>
        <img
          src='./images/type_1.webp'
          alt='hotels'
        ></img>
        <h1>Hotels</h1>
        <h2>{hotel} hotels</h2>
      </div>
      <div className='type-items'>
        <img
          src='./images/type_2.jpg'
          alt='apartments'
        ></img>
        <h1>Apartments</h1>
        <h2>{apartment} apartments</h2>
      </div>
      <div className='type-items'>
        <img
          src='./images/type_3.jpg'
          alt='resorts'
        ></img>
        <h1>Resorts</h1>
        <h2>{resort} resorts</h2>
      </div>
      <div className='type-items'>
        <img
          src='./images/type_4.jpg'
          alt='villas'
        ></img>
        <h1>Villa</h1>
        <h2>{villa} villas</h2>
      </div>
      <div className='type-items'>
        <img
          src='./images/type_5.jpg'
          alt='cabins'
        ></img>
        <h1>Cabins</h1>
        <h2>{cabin} cabins</h2>
      </div>
    </div>
  );
};

export default PropertyType;
