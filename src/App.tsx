import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, Navigate } from 'react-router';
import Home from './pages/Home';
import Apply from './pages/Apply';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route path='/' element={<Login onLogin={handleLogin} />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/home'
        element={isLoggedIn ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path='/event'
        element={isLoggedIn ? <Apply /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
