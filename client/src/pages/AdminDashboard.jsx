import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Calendar from '../components/Calendar'
import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdTextsms } from 'react-icons/md'
import  Message from '../components/Message'

const AdminDashboard = () => {
  const [openSMS, setOpenSMS] = useState(false)
  const { user, error, loading, dispatch } = useContext(AuthContext)
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
    <div className='h-screen'>
      <AdminNavbar />
      <div className='flex items-center justify-between mx-10 mt-4'>
        <h1 className='pt-8 font-pop font-bold text-2xl text-gray-700'>Appointment Calendar</h1>
        <button onClick={() => setOpenSMS(true)} className='bg-primary text-white px-6 py-3 rounded-md flex items-center gap-x-2 hover:bg-second'><MdTextsms/>SMS</button>
      </div>
      <Calendar />
      {openSMS && <Message setOpenSMS={setOpenSMS} />}
    </div>
  )
}

export default AdminDashboard
