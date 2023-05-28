import React from 'react';
import styles from '../home/Button.module.css';
import './Signup.css';
import NavBar from '../home/NavBar';

const Signup = () => {
  //Pass email and password to backend
  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('username', JSON.stringify(email));
        console.log(data.message);
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className='signup'>
        <form
          className='signup-form'
          onSubmit={submitHandler}
        >
          <header className='signup-title'>Sign Up</header>
          <input
            type='text'
            id='email'
            className='signup-input'
            placeholder='Email'
          ></input>
          <input
            type='password'
            id='password'
            className='signup-input'
            placeholder='Password'
          ></input>
          <button
            className={styles.buttonBlue}
            id='signup-button'
            type='submit'
          >
            Create account
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
