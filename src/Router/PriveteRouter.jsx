import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import Loding from '../Pages/Loding';

const PriveteRouter = () => {
  const { user, loading } = useContext(AuthContext);

  // Show loading while checking auth state
  if (loading) {
    return <Loding />;
  }

  return user ? <Outlet /> : <Navigate to='/signin' replace />
}

export default PriveteRouter
