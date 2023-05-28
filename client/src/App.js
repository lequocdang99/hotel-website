import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Search from './pages/search/Search';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import Transaction from './pages/user/Transaction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/search'
          element={<Search />}
        />
        <Route
          path='hotel/detail/:id'
          element={<Detail />}
        />
        <Route
          path='user/login'
          element={<Login />}
        />
        <Route
          path='user/signup'
          element={<Signup />}
        />
        <Route
          path='/transaction'
          element={<Transaction />}
        />
        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
