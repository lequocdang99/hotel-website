import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import classes from './Button.module.css';
import './New.css';

const New = () => {
  //Hotels list
  const [hotelList, setHotelList] = useState([]);
  //Rooms list
  const [rooms, setRooms] = useState([]);
  //URL path
  const url = window.location.pathname;
  //Create a new hotel
  const submitHotelHandler = async (e) => {
    try {
      e.preventDefault();
      //New hotel information
      const newHotel = {
        name: e.target.elements.name.value,
        type: e.target.elements.type.value,
        city: e.target.elements.city.value,
        address: e.target.elements.address.value,
        distance: e.target.elements.distance.value,
        title: e.target.elements.title.value,
        desc: e.target.elements.desc.value,
        price: e.target.elements.price.value,
        images: e.target.elements.images.value,
        featured: e.target.elements.featured.value,
        room: e.target.elements.room.value,
      };
      //Check if all the fields are filled
      let allFilled = false;
      for (let key in newHotel) {
        if (!newHotel[key]) {
          alert(`${key.charAt(0).toUpperCase() + key.slice(1)} must be filled`);
          allFilled = false;
        } else {
          allFilled = true;
        }
      }
      //All fields are filled
      if (allFilled) {
        const response = await fetch('http://localhost:5000/hotel/new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newHotel),
        });
        const data = await response.json();
        if (data.result) {
          alert('New hotel was successfully created');
          window.location.href = '/hotel';
        } else {
          console.error(data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Create a new room
  const submitRoomHandler = async (e) => {
    try {
      e.preventDefault();
      const newRoom = {
        title: e.target.elements.title.value,
        desc: e.target.elements.desc.value,
        price: e.target.elements.price.value,
        max_people: e.target.elements.max_people.value,
        rooms: e.target.elements.rooms.value,
        hotel: e.target.elements.hotel.value,
      };
      //Check all fields is filled
      let allFilled = false;
      for (let key in newRoom) {
        if (!newRoom[key]) {
          alert(`${key.charAt(0).toUpperCase() + key.slice(1)} must be filled`);
          allFilled = false;
        } else {
          allFilled = true;
        }
      }
      //If all fields are filled
      if (allFilled) {
        const response = await fetch('http://localhost:5000/room/new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRoom),
        });
        const data = await response.json();
        if (data.result) {
          alert('New room was successfully created');
          window.location.href = '/room';
        } else {
          console.error(data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Fetch hotels list
  const hotelListHandler = async () => {
    try {
      const response = await fetch('http://localhost:5000/hotel/');
      const data = await response.json();
      if (data.result) {
        setHotelList(data.result);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    hotelListHandler();
  }, []);

  return (
    <div className={styles.card}>
      <header id='hotel-title'>
        {url === '/hotel/new' ? 'Add New Hotel' : 'Add New Room'}
      </header>
      {url === '/hotel/new' ? (
        <form onSubmit={submitHotelHandler}>
          <div className='new'>
            <div id='col1'>
              <label>Name</label>
              <input
                type='text'
                id='name'
                placeholder='My Hotel'
              ></input>
              <label>City</label>
              <input
                type='text'
                id='city'
                placeholder='New York'
              ></input>
              <label>Distance from City Center</label>
              <input
                type='text'
                id='distance'
                placeholder='500'
              ></input>
              <label>Description</label>
              <input
                type='text'
                id='desc'
                placeholder='Description'
              ></input>
              <label>Images</label>
              <input
                type='url'
                id='images'
              ></input>
            </div>
            <div id='col2'>
              <label>Type</label>
              <input
                type='text'
                id='type'
                placeholder='Hotel'
              ></input>
              <label>Address</label>
              <input
                type='text'
                id='address'
                placeholder='Elton St, 216'
              ></input>
              <label>Title</label>
              <input
                type='text'
                id='title'
                placeholder='The Best Hotel'
              ></input>
              <label>Price</label>
              <input
                type='text'
                id='price'
                placeholder='100'
              ></input>
              <label>Featured</label>
              <select id='featured'>
                <option value='false'>No</option>
                <option value='true'>Yes</option>
              </select>
            </div>
          </div>
          <div className='new-room'>
            <label>Rooms</label>
            <select
              name='room'
              id='room'
              multiple
              onChange={(e) => {
                if (rooms.includes(e.target.value)) {
                  setRooms(rooms.filter((room) => room !== e.target.value));
                } else {
                  setRooms([...rooms, e.target.value]);
                }
              }}
              value={rooms}
            >
              <option value='2 Bed Room'>2 Bed Room</option>
              <option value='1 Bed Room'>1 Bed Room</option>
              <option value='Basement Deluxe Room'>Basement Deluxe Room</option>
              <option value='Superior Basement Room'>
                Superior Basement Room
              </option>
              <option value='Deluxe Room'>Deluxe Room</option>
              <option value='Premier City View Room'>
                Premier City View Room
              </option>
              <option value='Basement Double Room'>Basement Double Room</option>
              <option value='Budget Twin Room'>Budget Twin Room</option>
              <option value='Deluxe Window Room'>Deluxe Window Room</option>
            </select>
          </div>
          <button
            type='submit'
            id='send'
            className={classes.buttonBlue}
          >
            Send
          </button>
        </form>
      ) : (
        <form onSubmit={submitRoomHandler}>
          <div className='new'>
            <div id='col1'>
              <label>Title</label>
              <input
                type='text'
                id='title'
                placeholder='2 Bed Room'
              ></input>
              <label>Price</label>
              <input
                type='text'
                id='price'
                placeholder='100'
              ></input>
              <label>Rooms</label>
              <input
                type='text'
                id='rooms'
                placeholder='Give commas between room numbers'
              ></input>
            </div>
            <div id='col2'>
              <label>Description</label>
              <input
                type='text'
                id='desc'
                placeholder='King Size Bed, 1 Bathroom'
              ></input>
              <label>Max People</label>
              <input
                type='text'
                id='max_people'
                placeholder='2'
              ></input>
              <label>Choose A Hotel</label>
              <select id='hotel'>
                {hotelList.map((hotel) => (
                  <option
                    key={hotel.name}
                    value={hotel.name}
                  >
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type='submit'
            id='send'
            className={classes.buttonBlue}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default New;
