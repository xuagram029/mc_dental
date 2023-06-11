import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { IoMdAddCircle } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import AppointmentBooking from '../components/AppointmentBooking'
import PatientNavbar from '../components/PatientNavbar'
import Calendar from '../components/Calendar'

const PatientDashboard = () => {
    const [openModal, setOpenModal] = useState(false)
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
        <div className='font-pop flex items-center justify-between mx-10 mt-8'>
          <h1 className='text-3xl font-bold text-gray-700'>Appointment Calendar</h1>
          <button onClick={() => setOpenModal(true)} className='bg-primary px-4 py-2 rounded-md text-white font-medium hover:bg-second flex items-center gap-x-2'><IoMdAddCircle /> Set Appointment</button>
        </div>
        {openModal && <AppointmentBooking setOpenModal={setOpenModal} />}
        <Calendar />
        <ToastContainer />
    </div>
  )
}

export default PatientDashboard