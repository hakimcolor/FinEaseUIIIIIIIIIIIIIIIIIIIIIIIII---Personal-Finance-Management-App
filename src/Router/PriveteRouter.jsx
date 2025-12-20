import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PriveteRouter = () => {
  const { user } = useContext(AuthContext);
  return user?<Outlet></Outlet>:<Navigate to='/signin' replace/>
   
}

export default PriveteRouter
