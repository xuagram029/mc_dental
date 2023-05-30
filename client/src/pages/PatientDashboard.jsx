import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const PatientDashboard = () => {
    const { user, error, loading, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

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
            navigate('/patient-login')
        } catch (err) {
            // console.log(err)
            console.log(err)
        }
    }
  return (
    <div>
        PatientDashboard
        <button 
            className="block w-20 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            onClick={handleLogout}
        >Logout
        </button>
        <button
            className="block w-20 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        ><Link to='/patient-profile'>Profile</Link></button>
    </div>
  )
}

export default PatientDashboard