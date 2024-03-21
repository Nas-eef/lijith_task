// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Check if token exists

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<ProtectedRoute element={<Home/>} />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
