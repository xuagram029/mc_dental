import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AppointmentBooking from '../components/AppointmentBooking'
import PatientNavbar from '../components/PatientNavbar'

const PatientDashboard = () => {
    const { user, error, loading, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const id = user?.resp[0]?.id
    // console.log(user?.resp[0]?.id);

    useEffect(() => {
        if(user && user.resp[0] && user.resp[0].role === 'user'){
            navigate('/patient-dashboard')
        }else if(user?.resp[0]?.role === 'dentist'){
            navigate('/dentist-dashboard')
        }
        else{
            navigate('/login')
        }
    }, [user, navigate])

    
  return (
    <div>
        <PatientNavbar />
        <AppointmentBooking />
    </div>
  )
}

export default PatientDashboard