import React, {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home';
import Hotel from './page/Hotel';
import Room from './page/Room';
import Trans from './page/Trans';
import User from './page/User';
function App() {
  const isLoggedIn = localStorage.getItem('username');
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/home'
          element={isLoggedIn ? <Home /> : <Navigate to='/' />}
        />
        <Route
          path='/user'
          element={isLoggedIn ? <User /> : <Navigate to='/' />}
        />
        <Route
          path='/hotel'
          element={isLoggedIn ? <Hotel /> : <Navigate to='/' />}
        />
        <Route
          path='/hotel/new'
          element={isLoggedIn ? <Hotel /> : <Navigate to='/' />}
        />
        <Route
          path='/hotel/edit/:id'
          element={isLoggedIn ? <Hotel /> : <Navigate to='/' />}
        />
        <Route
          path='/room'
          element={isLoggedIn ? <Room /> : <Navigate to='/' />}
        />
        <Route
          path='/room/new'
          element={isLoggedIn ? <Room /> : <Navigate to='/' />}
        />
        <Route
          path='/room/edit/:id'
          element={isLoggedIn ? <Room /> : <Navigate to='/' />}
        />
        <Route
          path='/transaction'
          element={isLoggedIn ? <Trans /> : <Navigate to='/' />}
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
