import React from 'react';
import './Hotel.css';

const Hotel = ({ hotels }) => {
  const moveToDetail = (id) => {
    window.location.href = `/hotel/detail/${id}`;
  };

  return (
    <div className='hotel'>
      <h1>Homes guests love</h1>
      {hotels &&
        hotels.map((hotel) => {
          return (
            <div
              className='hotel-items'
              key={hotel._id}
            >
              <img
                src={
                  hotel.name === 'Alagon Saigon Hotel & Spa'
                    ? hotel.photos[2]
                    : hotel.photos[0]
                }
                alt={hotel.name}
                key={hotel._id}
              ></img>
              <h1
                key={hotel.name}
                onClick={() => moveToDetail(hotel._id)}
                id='name'
              >
                {hotel.name}
              </h1>
              <h2
                key={hotel.city}
                id='city'
              >
                {hotel.city}
              </h2>
              <h3
                key={hotel.cheapestPrice}
                id='price'
              >
                Starting from ${hotel.cheapestPrice}
              </h3>
            </div>
          );
        })}
    </div>
  );
};

export default Hotel;
