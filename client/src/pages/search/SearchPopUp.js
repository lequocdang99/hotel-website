import React, { useState } from 'react';
import styles from '../home/Button.module.css';
import './SearchPopUp.css';
import SearchList from './SearchList';

const SearchPopUp = ({ search }) => {
  //Result state
  const [result, setResult] = useState([]);
  //Submit handler
  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const destination = event.target.elements.destination.value;
      const date = event.target.elements.date.value;
      const min = event.target.elements.min.value;
      const max = event.target.elements.max.value;
      const adult = event.target.elements.adult.value;
      const children = event.target.elements.children.value;
      const room = event.target.elements.room.value;
      const url = `http://localhost:5000/hotel/search${
        destination ? `?destination=${destination}` : ''
      }${date ? `&date=${date}` : ''}${min ? `&min=${min}` : ''}${
        max ? `&max=${max}` : ''
      }${adult ? `&adult=${adult}` : ''}${
        children ? `&children=${children}` : ''
      }${room ? `&room=${room}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult([]);
        console.error('No hotel found');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='searchPopUp'>
        <form onSubmit={submitHandler}>
          <div className='search'>
            <h1>Search</h1>
            <div>
              <label htmlFor='destination'>Destination</label>
              <input
                type='text'
                id='destination'
                defaultValue={search ? search.destination : ''}
              ></input>
            </div>
            <div>
              <label htmlFor='date'>Check-in Date</label>
              <input
                type='text'
                id='date'
                placeholder={new Date().toLocaleDateString('en-US')}
                defaultValue={search ? search.date : ''}
              ></input>
            </div>
          </div>
          <div className='options'>
            <label>Options</label>
            <div className='options-item'>
              <label htmlFor='min'>Min price per night</label>
              <input
                type='text'
                id='min'
              ></input>
            </div>
            <div className='options-item'>
              <label htmlFor='max'>Max price per night</label>
              <input
                type='text'
                id='max'
              ></input>
            </div>
            <div className='options-item'>
              <label htmlFor='adult'>Adult</label>
              <input
                type='text'
                id='adult'
                placeholder='1'
                defaultValue={search ? search.people : ''}
              ></input>
            </div>
            <div className='options-item'>
              <label htmlFor='children'>Children</label>
              <input
                type='text'
                id='children'
                placeholder='0'
              ></input>
            </div>
            <div className='options-item'>
              <label htmlFor='room'>Room</label>
              <input
                type='text'
                id='room'
                placeholder='1'
              ></input>
            </div>
          </div>
          <button
            type='submit'
            className={styles.buttonBlue}
          >
            Search
          </button>
        </form>
      </div>
      <SearchList result={result} />
    </>
  );
};

export default SearchPopUp;
