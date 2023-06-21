import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import classes from './Button.module.css';

const Edit = () => {
  //Details state
  const [detail, setDetail] = useState();
  //Rooms list
  const [roomsList, setRoomsList] = useState([]);
  //Chosen rooms list
  const [rooms, setRooms] = useState([]);
  //URL pathname
  const url = window.location.pathname;
  //Detail ID
  const roomId = window.location.pathname.slice(11, 50);
  const hotelId = window.location.pathname.slice(12, 50);
  //Fetch hotel information
  const hotelInfoHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/hotel/detail/${hotelId}?room=false`
      );
      const data = await response.json();
      if (data.result) {
        setDetail(data.result);
        setRooms(data.result.rooms);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Fetch room information
  const roomInfoHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/room/detail/${roomId}`);
      const data = await response.json();
      if (data.result) {
        setDetail(data.result);
      } else {
        console.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    url.includes('/hotel/edit') ? hotelInfoHandler() : roomInfoHandler();
  }, []);

  //Edit room handler
  const editRoomHandler = async (e) => {
    try {
      e.preventDefault();
      const newRoom = {
        title: e.target.elements.title.value,
        desc: e.target.elements.desc.value,
        maxPeople: e.target.elements.max_people.value,
        price: e.target.elements.price.value,
        rooms: e.target.elements.rooms.value,
      };
      const response = await fetch(`http://localhost:5000/room/edit/${roomId}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newRoom),
      });
      const data = await response.json();
      if (data.result) {
        alert(data.result);
        window.location.href = '/room';
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  //Edit hotel handler
  const editHotelHandler = async (e) => {
    try {
      e.preventDefault();
      const newHotel = {
        name: e.target.elements.title.value,
        city: e.target.elements.city.value,
        type: e.target.elements.type.value,
        address: e.target.elements.address.value,
        distance: e.target.elements.distance.value,
        desc: e.target.elements.desc.value,
        featured: e.target.elements.featured.value,
        images: e.target.elements.images.value,
        rooms: rooms,
      };
      const response = await fetch(`http://localhost:5000/hotel/edit/${hotelId}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newHotel),
      });
      const data = await response.json();
      if (data.result) {
        alert(data.result);
        window.location.href = '/hotel';
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //Fetch all room
  const roomListHandler = async (e) => {
    try {
      const response = await fetch(`http://localhost:5000/room`);
      const data = await response.json();
      if (data.result) {
        setRoomsList(data.result);
      } else {
        console.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    roomListHandler();
  }, []);
  //Room change
  const roomChangeHandler = (e) => {
    if (!rooms.includes(e.target.value)) {
      setRooms([...rooms, e.target.value]);
    } else {
      setRooms(rooms.filter((room) => room !== e.target.value));
    }
  };

  return (
    <div className={styles.card}>
      <header id='hotel-title'>
        {url.includes('/hotel/edit/') ? 'Edit Hotel' : 'Edit Room'}
      </header>
      {url.includes('/hotel/edit') && detail ? (
        <form onSubmit={editHotelHandler}>
          <div className='new'>
            <div id='col1'>
              <label>Name</label>
              <input
                type='text'
                id='name'
                defaultValue={detail.name}
              ></input>
              <label>City</label>
              <input
                type='text'
                id='city'
                defaultValue={detail.city}
              ></input>
              <label>Distance from City Center</label>
              <input
                type='text'
                id='distance'
                defaultValue={detail.distance}
              ></input>
              <label>Description</label>
              <input
                type='text'
                id='desc'
                defaultValue={detail.desc}
              ></input>
              <label>Images</label>
              <input
                type='url'
                id='images'
                defaultValue={detail.photos}
              ></input>
            </div>
            <div id='col2'>
              <label>Type</label>
              <input
                type='text'
                id='type'
                defaultValue={detail.type}
              ></input>
              <label>Address</label>
              <input
                type='text'
                id='address'
                defaultValue={detail.address}
              ></input>
              <label>Title</label>
              <input
                type='text'
                id='title'
                defaultValue={detail.title}
              ></input>
              <label>Price</label>
              <input
                type='text'
                id='price'
                defaultValue={detail.cheapestPrice}
              ></input>
              <label>Featured</label>
              <select
                id='featured'
                defaultValue={detail.featured}
              >
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
              onChange={roomChangeHandler}
              value={rooms}
            >
              {roomsList.map((room) => {
                return (
                  <option
                    key={room._id}
                    value={room._id}
                  >
                    {room.title}
                  </option>
                );
              })}
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
        detail && (
          <form onSubmit={editRoomHandler}>
            <div className='new'>
              <div id='col1'>
                <label>Title</label>
                <input
                  type='text'
                  id='title'
                  defaultValue={detail.title}
                ></input>
                <label>Price</label>
                <input
                  type='text'
                  id='price'
                  defaultValue={detail.price}
                ></input>
                <label>Rooms</label>
                <input
                  type='text'
                  id='rooms'
                  defaultValue={detail.roomNumbers}
                ></input>
              </div>
              <div id='col2'>
                <label>Description</label>
                <input
                  type='text'
                  id='desc'
                  defaultValue={detail.desc}
                ></input>
                <label>Max People</label>
                <input
                  type='text'
                  id='max_people'
                  defaultValue={detail.maxPeople}
                ></input>
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
        )
      )}
    </div>
  );
};

export default Edit;
