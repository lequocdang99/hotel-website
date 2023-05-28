import React from 'react';
import './SearchListItem.css';
import styles from '../home/Button.module.css';

const SearchListItem = ({ result }) => {
  const moveToDetail = (id) => {
    window.location.href = `hotel/detail/${id}`;
  };
  return (
    result &&
    result.map((items) => {
      return (
        <div
          className='searchListItem'
          key={items.name}
        >
          <img
            src={items.photos[0]}
            alt={items.name}
            onError={(e) => (e.target.src = items.photos[2])}
          ></img>
          <div className='searchListItem-description'>
            <h1 className='name'>{items.name}</h1>
            <p className='types'>{items.address}</p>
            <p className='distance'>{items.distance}km from airport</p>
            <h3 className='tag'>{items.type.toUpperCase()}</h3>
            <h2 className='description'>{items.desc}</h2>
            {items.free_cancel && (
              <div className='freeCancel'>
                <h3>Free cancellation</h3>
                <p>You can cancel later, so lock in this great price today!</p>
              </div>
            )}
          </div>
          <div className='searchListItem-price'>
            <h2 className='rateText'>{items.rate_text}</h2>
            <h3 className='price'>${items.cheapestPrice}</h3>
            <p>Includes taxes and fee.</p>
            <button
              className={styles.buttonBlue}
              onClick={() => moveToDetail(items._id)}
            >
              See availability
            </button>
          </div>
        </div>
      );
    })
  );
};

export default SearchListItem;
