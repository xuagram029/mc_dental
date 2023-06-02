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
        if(user?.resp[0]?.role === 'dentist'){
            navigate('/dentist-dashboard')
        }else if(user?.resp[0]?.role === 'user'){
            navigate('/')
        }else{
            navigate('/dentist-login')
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