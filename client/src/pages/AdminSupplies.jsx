import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Supplies from '../components/Supplies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSupplies = () => {
  const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
      if(!user){
        navigate('/admin-login')
      }else if(user?.resp[0]?.role === 'dentist'){
        navigate('/dentist-dashboard')
      }else if(user?.resp[0]?.role === 'patient'){
        navigate('/patient-dashboard')
      }
    }, [user]) 


  return (
    <div>
      <AdminNavbar />
      <Supplies />
      <ToastContainer />
    </div>
  )
}

export default AdminSupplies
