import React, { useState, useEffect } from 'react';
import './List.css';
import styles from './Card.module.css';

const List = () => {
  //List state
  const [list, setList] = useState([]);
  //List of checked checkboxes
  const [checkList, setCheckList] = useState([]);
  //Check all checkboxes
  const [checkAll, setCheckAll] = useState(false);
  //URL pathname
  const url = window.location.pathname;
  //Fetch order information
  const adminInfoHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000${url === '/home' ? '/transaction' : url}`
      );
      const data = await response.json();
      if (data.result) {
        if (url === '/home') {
          setList(data.result.splice(0, 8));
        } else {
          setList(data.result);
        }
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    adminInfoHandler();
  }, []);
  //Change date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  //Define title based on url
  let title;
  switch (url) {
    case '/hotel':
      title = 'Hotels List';
      break;
    case '/user':
      title = 'Users List';
      break;
    case '/room':
      title = 'Rooms List';
      break;
    default:
      title = 'Latest Transaction';
      break;
  }
  //Check handler
  const checkHandler = (id) => {
    if (checkList.includes(id)) {
      setCheckList(checkList.filter((e) => e !== id));
    }
    if (!checkList.includes(id)) {
      setCheckList([...checkList, id]);
    }
  };
  //Check all handler
  const checkAllHandler = () => {
    setCheckAll(!checkAll);
    if (checkAll) {
      setCheckList([]);
    }
    if (!checkAll) {
      setCheckList(list.map((item) => item._id));
    }
  };
  //Delete hotel handler
  const deleteHotelHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/hotel/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (data.result) {
        alert('Hotel deleted successfully');
        window.location.reload();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Delete room handler
  const deleteRoomHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/room/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (data.result) {
        alert('Room deleted successfully');
        window.location.reload();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Transaction status handler
  const transactionStatusHandler = async (id, status) => {
    try {
      let newStatus;
      switch (status) {
        case 'Booked':
          newStatus = 'Checkin';
          break;
        case 'Checkin':
          newStatus = 'Checkout';
          break;
        case 'Checkout':
          newStatus = 'Booked';
          break;
        default:
          break;
      }
      const response = await fetch(
        `http://localhost:5000/transaction/edit?id=${id}&newStatus=${newStatus}`
      );
      const data = await response.json();
      if (data.result) {
        console.log(data.result);
        window.location.reload();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //Move to edit page
  const editHandler = (id) => {
    window.location.href = `${url}/edit?id=${id}`;
  };
  return (
    <div
      className={styles.card}
      id='list'
    >
      <h1>{title}</h1>
      {(url === '/transaction' || url === '/home') && (
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type='checkbox'
                  checked={checkAll}
                  onChange={checkAllHandler}
                />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td key={index}>
                      <input
                        type='checkbox'
                        id={item._id}
                        checked={checkList.includes(item._id)}
                        onChange={() => checkHandler(item._id)}
                      />
                    </td>
                    <td key={item._id}>{item._id}</td>
                    <td key={item.user.fullName}>{item.user.fullName}</td>
                    <td key={item.hotel}>{item.hotel.name}</td>
                    <td key={item.room}>{item.room.toString()}</td>
                    <td key={item.date}>
                      {`${formatDate(item.dateStart)} -
                    ${formatDate(item.dateEnd)}`}
                    </td>
                    <td key={item.price}>${item.price}</td>
                    <td key={item.payment}>{item.payment}</td>
                    <td>
                      <button
                        key={item.status}
                        className={
                          item.status === 'Booked'
                            ? 'status-booked'
                            : item.status === 'Checkin'
                            ? 'status-checkin'
                            : 'status-checkout'
                        }
                        onClick={() =>
                          transactionStatusHandler(item._id, item.status)
                        }
                      >
                        {item.status}
                      </button>
                    </td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {`1-${list.length} of ${list.length}`}
                <i className='material-icons'>&#xe315;</i>
                <i className='material-icons'>&#xe314;</i>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      {url === '/hotel' && (
        <>
          <button
            id='new-btn'
            onClick={() => (window.location.href = '/hotel/new')}
          >
            Add New
          </button>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    checked={checkAll}
                    onChange={checkAllHandler}
                  />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Title</th>
                <th>City</th>
                <th>Action</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td key={index}>
                        <input
                          type='checkbox'
                          id={item._id}
                          checked={checkList.includes(item._id)}
                          onChange={() => checkHandler(item._id)}
                        />
                      </td>
                      <td key={item._id}>{item._id}</td>
                      <td key={item.name}>{item.name}</td>
                      <td key={item.type}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </td>
                      <td key={item.name + item._id}>{item.title}</td>
                      <td key={item.city}>{item.city}</td>
                      <td key='action'>
                        <button
                          className='delete-btn'
                          onClick={() => deleteHotelHandler(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td key='edit'>
                        <button
                          className='edit-btn'
                          onClick={() => {
                            editHandler(item._id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
      {url === '/room' && (
        <>
          <button
            id='new-btn'
            onClick={() => (window.location.href = '/room/new')}
          >
            Add New
          </button>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    checked={checkAll}
                    onChange={checkAllHandler}
                  />
                </th>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Max People</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type='checkbox'
                          id={item._id}
                          checked={checkList.includes(item._id)}
                          onChange={() => checkHandler(item._id)}
                        />
                      </td>
                      <td key={item._id}>{item._id}</td>
                      <td key={item.title}>{item.title}</td>
                      <td
                        key={item.desc}
                        className='desc'
                      >
                        {item.desc}
                      </td>
                      <td key={item.price}>${item.price}</td>
                      <td key={item.maxPeople}>{item.maxPeople}</td>
                      <td key='action'>
                        <button
                          className='delete-btn'
                          onClick={() => deleteRoomHandler(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td key='edit'>
                        <button
                          className='edit-btn'
                          onClick={() => {
                            editHandler(item._id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id='icon'>
                  {`1-${list.length} of ${list.length}`}
                  <i className='material-icons'>&#xe314;</i>
                  <i className='material-icons'>&#xe315;</i>
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
      {url === '/user' && (
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type='checkbox'
                  checked={checkAll}
                  onChange={checkAllHandler}
                />
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td key={index}>
                      <input
                        type='checkbox'
                        id={item._id}
                        checked={checkList.includes(item._id)}
                        onChange={() => checkHandler(item._id)}
                      />
                    </td>
                    <td key={item._id}>{item._id}</td>
                    <td key={item.username}>{item.username}</td>
                    <td key={item.password}>{item.password}</td>
                    <td key={item.phoneNumber}>{item.phoneNumber}</td>
                    <td key={item.email + '@'}>{item.email}</td>
                    <td key={item.isAdmin}>
                      {item.isAdmin ? 'True' : 'False'}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {`1-${list.length > 0 ? list.length : '0'} of ${
                  list.length > 0 ? list.length : '0'
                }`}
                <i className='material-icons'>&#xe315;</i>
                <i className='material-icons'>&#xe314;</i>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default List;
