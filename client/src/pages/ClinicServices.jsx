import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Supplies from '../components/Supplies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../components/Services';
import DentistNavBar from '../components/DentistNavBar';

const AdminSupplies = () => {
  const { user, dispatch } = useContext(AuthContext)
  const role = user?.resp[0]?.role
  const navigate = useNavigate()

    // useEffect(() => {
    //   if(!user){
    //     navigate('/admin-login')
    //   }else if(user?.resp[0]?.role === 'dentist'){
    //     navigate('/dentist-dashboard')
    //   }else if(user?.resp[0]?.role === 'patient'){
    //     navigate('/patient-dashboard')
    //   }
    // }, [user]) 


  return (
    <div>
      {role === 'admin' && <AdminNavbar />}
      {role === 'dentist' && <DentistNavBar />}
      <Services />
      <ToastContainer />
    </div>
  )
}

export default AdminSupplies
