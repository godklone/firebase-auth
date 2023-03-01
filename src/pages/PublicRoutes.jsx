import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ForgotPasswd from './ForgotPasswd';
import Register from './Register';
import Signup from './Signup';

const PublicRoutes = () => {
  const { webHook } = useAuth();
  return (
    <Routes>
      {!webHook ? (
        <Route path='/404' />
      ) : (
        <>
          <Route index element={<Signup />} />
          <Route path='register' element={<Register />} />
          <Route path='forgoten-password' element={<ForgotPasswd />} />
        </>
      )}
    </Routes>
  );
};

export default PublicRoutes;
