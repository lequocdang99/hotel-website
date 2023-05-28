import React, { useEffect, useState } from 'react';
import NavBar from '../home/NavBar';
import Form from '../home/Form';
import Footer from '../home/Footer';
import './Transaction.css';

const Transaction = () => {
  //Transaction state
  const [transaction, setTransaction] = useState();
  //User email
  const username = JSON.parse(localStorage.getItem('username'));
  //Fetch transactions
  const transactionsFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/transaction?username=${username}`
      );
      const data = await response.json();
      if (data.result) {
        setTransaction(data.result);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    transactionsFetch();
  }, []);
  //Change date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  return (
    <>
      <NavBar />
      <div className='transaction'>
        <h1>Your Transaction</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction &&
              transaction.map((trans, index) => (
                <tr key={trans._id}>
                  <td key={index}>{(index + 1).toString().padStart(2, '0')}</td>
                  <td key={trans.hotel.name}>{trans.hotel.name}</td>
                  <td key={trans.room}>{trans.room.toString()}</td>
                  <td key={trans.date}>
                    {`${formatDate(trans.dateStart)} -
                    ${formatDate(trans.dateEnd)}`}
                  </td>
                  <td key={trans.price}>${trans.price}</td>
                  <td key={trans.payment}>{trans.payment}</td>
                  <td>
                    <button
                      key={trans.status}
                      className={
                        trans.status === 'Booked'
                          ? 'status-booked'
                          : trans.status === 'Checkin'
                          ? 'status-checkin'
                          : 'status-checkout'
                      }
                    >
                      {trans.status}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Form />
      <Footer />
    </>
  );
};

export default Transaction;
