// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get(
          'https://interview-plus.onrender.com/api/protected',
          { headers: { 'x-access-token': token } }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error getting profile:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetProfile();
  }, []);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       Loading.. <CircularProgress variant='indeterminate' /> 
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return element;
};

export default ProtectedRoute;
