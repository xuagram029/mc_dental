import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import DentistNavBar from '../components/DentistNavBar'
import PendingAppointments from '../components/PendingAppointments'

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
    <div>
        <DentistNavBar />
        <PendingAppointments />
    </div>
  )
}

export default DentistDashboard