import React, { useEffect, useState } from 'react';
import './DetailPage.css';
import styles from '../home/Button.module.css';

const DetailPage = () => {
  //Hotel detail
  const [result, setResult] = useState([]);
  //Room avaibility
  const [room, setRoom] = useState([]);
  //Total price state
  const [totalPrice, setTotalPrice] = useState(0);
  //Selected room number
  const [roomNumber, setRoomNumber] = useState([]);
  //Date state
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  //Show hide reserve form
  const [showForm, setShowForm] = useState(false);
  //Checck all state
  const [uncheckAll, setUncheckAll] = useState(false);
  //Validate user input
  const [validate, setValidate] = useState(false);
  //Current day value
  const currentDate = new Date().toISOString().substring(0, 10);

  //Fetch hotel detail
  const hotelDetail = async () => {
    try {
      const id = window.location.pathname;
      const response = await fetch(`http://localhost:5000${id}`);
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    hotelDetail();
  }, []);

  //Check room availability when change check in date and check out date
  const roomCheck = async () => {
    try {
      if (checkInDate && checkOutDate) {
        const id = result._id;
        const response = await fetch(
          `http://localhost:5000/transaction/${id}?checkin=${checkInDate}&checkout=${checkOutDate}`
        );
        const data = await response.json();
        if (data.result) {
          //Turn result into an array
          const resultArr = [].concat(...Object.values(data.result));
          //Clone result rooms
          let newRoom = result.rooms;
          //Filter out rooms are empty
          let newRoomNum = newRoom.map((e) => {
            return e.roomNumbers.filter((num) => !resultArr.includes(num));
          });
          //Set room numbers into empty rooms
          for (let i = 0; i < newRoomNum.length; i++) {
            newRoom[i] = { ...newRoom[i], roomNumbers: newRoomNum[i] };
          }
          setRoom(newRoom);
        } else {
          setRoom(result.rooms);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    roomCheck();
    uncheckAllHandler();
  }, [checkInDate, checkOutDate]);

  //Total price handler
  const totalPriceHandler = (event, price) => {
    //Calculate total days book
    const days = Math.floor(
      (new Date(checkOutDate) - new Date(checkInDate)) / (24 * 3600 * 1000)
    );
    //Checked room
    if (event.target.checked) {
      setTotalPrice((prev) => prev + price * days);
      setRoomNumber([...roomNumber, parseInt(event.target.value)]);
    }
    //Unchecked room
    if (!event.target.checked) {
      setTotalPrice((prev) => prev - price * days);
      setRoomNumber(
        roomNumber.filter((e) => e !== parseInt(event.target.value))
      );
    }
  };
  //Uncheck all room checkboxes
  const uncheckAllHandler = () => {
    setUncheckAll(true);
    setRoomNumber([]);
    setTotalPrice(0);
  };
  //Reserve Room
  const reserveRoomHandler = async (e) => {
    try {
      e.preventDefault();
      const reserveRoom = {
        id: result._id,
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        phone: e.target.elements.phone.value,
        card: e.target.elements.card.value,
        payment: e.target.elements.payment.value,
        price: totalPrice,
        hotel: result,
        dateStart: e.target.elements.dateStart.value,
        dateEnd: e.target.elements.dateEnd.value,
        room: roomNumber,
      };
      //Check if user login
      if (!localStorage.getItem('username')) {
        alert('Please login to reserve room');
      } else {
        //Check fields filled
        for (let key in reserveRoom) {
          if (!reserveRoom[key]) {
            alert(
              `${key.charAt(0).toUpperCase() + key.slice(1)} must be filled`
            );
            setValidate(false);
          } else {
            setValidate(true);
          }
        }
      }
      if (validate) {
        const response = await fetch('http://localhost:5000/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reserveRoom),
        });
        const data = await response.json();
        if (data.result) {
          console.log(data.result);
          window.location.href = `/transaction?username=${reserveRoom.email}`;
        } else {
          console.error(data.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='detail'>
        <div className='detailInfo'>
          <h1 id='name'>{result.name}</h1>
          <p id='address'>
            <i className='fa fa-map-marker'></i>
            {result.address}
          </p>
          <h2 id='distance'>
            Excellent location - {result.distance}m from the airport
          </h2>
          <h2 id='price'>
            Book a stay over $350 at this property and get a free airport taxi
          </h2>
        </div>
        <div className='detailImg'>
          {result.photos &&
            result.photos.map((img, index) => {
              return (
                <img
                  src={img}
                  alt={img}
                  key={index}
                />
              );
            })}
        </div>
        <div className='detailDescription'>
          <h1 id='title'>{result.title}</h1>
          <p id='text'>{result.desc}</p>
        </div>
        <div className='detailBook'>
          <p id='price9Night'>
            <b>${result.cheapestPrice}</b> (1 night)
          </p>
          <button
            className={styles.buttonBlue}
            onClick={() => setShowForm(!showForm)}
          >
            Reserve or Book Now!
          </button>
        </div>
      </div>
      {showForm && (
        <form onSubmit={(event) => reserveRoomHandler(event)}>
          <div className='detail-form'>
            <div className='detail-form_date'>
              <h1>Dates</h1>
              <div id='input'>
                <input
                  className='form-date'
                  type='date'
                  id='dateStart'
                  required
                  pattern='\d{4}-\d{2}-\d{2}'
                  min={currentDate}
                  defaultValue={currentDate}
                  onChange={(event) => setCheckInDate(event.target.value)}
                ></input>
                <input
                  className='form-date'
                  type='date'
                  id='dateEnd'
                  required
                  pattern='\d{4}-\d{2}-\d{2}'
                  min={checkInDate}
                  defaultValue={currentDate}
                  onChange={(event) => setCheckOutDate(event.target.value)}
                ></input>
              </div>
            </div>
            <div className='detail-form_info'>
              <h1>Reserve Info</h1>
              <label htmlFor='name'>Your Full Name:</label>
              <input
                type='text'
                id='name'
                placeholder='Full Name'
              ></input>
              <label htmlFor='email'>Your Email:</label>
              <input
                type='text'
                id='email'
                placeholder='Email'
              ></input>
              <label htmlFor='phone'>Your Phone Number:</label>
              <input
                type='text'
                id='phone'
                placeholder='Phone Number'
              ></input>
              <label htmlFor='card'>Your Card Number:</label>
              <input
                type='text'
                id='card'
                placeholder='Card Number'
              ></input>
            </div>
          </div>
          <>
            <h1 id='room-title'>Select Rooms</h1>
            <div className='detail-form_room'>
              {room &&
                room.map((room) => (
                  <div
                    className='detail-room'
                    key={room._id}
                  >
                    <div className='detail-room_info'>
                      <h2 key={room.title}>{room.title}</h2>
                      <p key={room.desc}>{room.desc}</p>
                      <p
                        key={room.maxPeople}
                        id='maxPeople'
                      >
                        Max People: <b>{room.maxPeople}</b>
                      </p>
                      <h2 key={room.price}>${room.price}</h2>
                    </div>
                    <div className='detail-room_checkbox'>
                      {room.roomNumbers &&
                        room.roomNumbers.map((num, index) => (
                          <div
                            className='checkbox-input'
                            key={num}
                          >
                            <label key={index}>{num}</label>
                            <input
                              key={num}
                              type='checkbox'
                              checked={roomNumber.includes(num)}
                              value={num}
                              id={num}
                              onChange={(event) =>
                                totalPriceHandler(event, room.price)
                              }
                            ></input>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </>
          <div className='detail-form_payment'>
            <h1>Total Bill: ${totalPrice}</h1>
            <select id='payment'>
              <option value=''>Select Payment Method</option>
              <option value='Cash'>Cash</option>
              <option value='Credit Card'>Credit Card</option>
            </select>
            <button
              type='submit'
              className={styles.buttonBlue}
            >
              Reserve Now
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default DetailPage;
