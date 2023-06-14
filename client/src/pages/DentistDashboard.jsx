import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import DentistNavBar from '../components/DentistNavBar'
import PendingAppointments from '../components/PendingAppointments'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blogs from '../components/Blogs'

const DentistDashboard = () => {
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
          navigate('/dentist-login')
        }else if(user?.resp[0]?.role === 'admin'){
          navigate('/admin-dashboard')
        }else if(user?.resp[0]?.role === 'patient'){
          navigate('/patient-dashboard')
        }
      }, [user])

    
  return (
    <div className='h-full'>
        <DentistNavBar />
        <PendingAppointments />
        <h1 className='pt-8 text-center font-pop font-bold text-3xl text-gray-700'>Clinic Hotest Blogs</h1>
        <Blogs />
        <ToastContainer />
    </div>
  )
}

export default DentistDashboard