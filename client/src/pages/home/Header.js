import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import styles from './Button.module.css';

const Header = () => {
  const navigate = useNavigate();
  const searchHandler = (event) => {
    event.preventDefault();
    const searchData = {
      destination: event.target.elements.destination.value,
      date: event.target.elements.date.value,
      people: event.target.elements.people.value,
    };
    navigate('/search', { state: searchData });
  };
  return (
    <div className='header'>
      <h1>A lifetime of discounts? It's Genius.</h1>
      <p>
        Get reward for your travel - unlock instant savings of 10% or more with
        a free discount
      </p>
      <button className={styles.buttonBlue}>Sign in / Register</button>
      <div>
        <form onSubmit={searchHandler}>
          <input
            type='text'
            id='destination'
            placeholder='&#xF236; Where are you going?'
          ></input>
          <input
            type='text'
            id='date'
            placeholder='&#xF073; 06/24/2022 to 06/24/2022'
          ></input>
          <input
            type='text'
            id='people'
            placeholder='&#xF182; 1 adult • 0 children • 1 room'
          ></input>
          <button
            type='submit'
            className={styles.buttonBlue}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
