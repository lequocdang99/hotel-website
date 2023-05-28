import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  //Logout handler
  const logoutHandler = () => {
    localStorage.removeItem('username');
    alert('User logged out successfully');
    window.location.href = '/';
  };
  return (
    <div className='sidebar'>
      <header>Admin Page</header>
      <div className='sidebar-list'>
        <h1>MAIN</h1>
        <h2 onClick={() => (window.location.href = '/home')}>
          <i className='material-icons'>&#xe871;</i>
          Dashboard
        </h2>
        <h1>LISTS</h1>
        <h2 onClick={() => (window.location.href = '/user')}>
          <i className='material-icons'>&#xe7ff;</i>
          Users
        </h2>
        <h2 onClick={() => (window.location.href = '/hotel')}>
          <i className='material-icons'>&#xe8d1;</i>
          Hotels
        </h2>
        <h2 onClick={() => (window.location.href = '/room')}>
          <i className='material-icons'>&#xe870;</i>
          Rooms
        </h2>
        <h2 onClick={() => (window.location.href = '/transaction')}>
          <i className='material-icons'>&#xe531;</i>
          Transactions
        </h2>
        <h1>NEW</h1>
        <h2 onClick={() => (window.location.href = '/hotel/new')}>
          <i className='material-icons'>&#xe8d1;</i>
          New Hotel
        </h2>
        <h2 onClick={() => (window.location.href = '/room/new')}>
          <i className='material-icons'>&#xe870;</i>
          New Room
        </h2>
        <h1>USER</h1>
        <h2 onClick={logoutHandler}>
          <i className='material-icons'>&#xe890;</i>
          Logout
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
