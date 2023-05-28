import React from 'react';
import styles from '../components/Button.module.css';
import './Login.css';

const Login = () => {
  //Login email and password
  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const response = await fetch(
        `http://localhost:5000/user/login/${email}/${password}?isAdmin=true`
      );
      const data = await response.json();
      if (data.result) {
        localStorage.setItem('username', JSON.stringify(email));
        window.location.href = '/home';
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className='login'>
        <form
          className='login-form'
          onSubmit={loginHandler}
        >
          <header className='login-title'>Login</header>
          <input
            type='text'
            id='email'
            className='login-input'
            placeholder='Email'
          ></input>
          <input
            type='password'
            id='password'
            className='login-input'
            placeholder='Password'
          ></input>
          <button
            className={styles.buttonBlue}
            id='login-button'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
