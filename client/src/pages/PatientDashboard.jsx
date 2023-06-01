import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import AppointmentBooking from './AppointmentBooking'

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
            navigate('/patient-login')
        }
    }, [user, navigate])

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/patient/logout')
            console.log(res.data.message)
            dispatch({type: "LOGOUT"})
            navigate('/login')
        } catch (err) {
            // console.log(err)
            console.log(err)
        }
    }
  return (
    <div>
        PatientDashboard
        <button 
            className="block w-36 mt-4 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            onClick={handleLogout}
        >Logout
        </button>
        <button
            className="block w-36 mt-4 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        ><Link to='/patient-profile'>Change Password</Link></button>
        <button
            className="block w-36 mt-4 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        ><Link to={`/appointments/${id}`}>Appointments</Link></button>
        <AppointmentBooking />
    </div>
  )
}

export default PatientDashboard