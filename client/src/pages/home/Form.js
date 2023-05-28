import React from 'react';
import styles from './Button.module.css';
import './Form.css';

const Form = () => {
  return (
    <div className='form'>
      <h1>Save time, save money!</h1>
      <h2>Sign up and we'll send the best deals to you</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type='text'
          placeholder='Your Email'
        ></input>
        <button
          type='submit'
          className={styles.buttonBlue}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Form;
