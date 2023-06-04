import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AppointmentBooking from '../components/AppointmentBooking'
import PatientNavbar from '../components/PatientNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientDashboard = () => {
    const { user, error, loading, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const id = user?.resp[0]?.id
    // console.log(user?.resp[0]?.id);

    useEffect(() => {
        if(!user){
          navigate('/login')
        }else if(user?.resp[0]?.role === 'dentist'){
          navigate('/dentist-dashboard')
        }else if(user?.resp[0]?.role === 'admin'){
          navigate('/admin-dashboard')
        }
      }, [user])

    
  return (
    <div>
        <PatientNavbar />
        <AppointmentBooking />
        <ToastContainer />
    </div>
  )
}

export default PatientDashboard