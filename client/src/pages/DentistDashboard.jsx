import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

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

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/dentist/logout')
            console.log(res.data.message)
            dispatch({type: "LOGOUT"})
            navigate('/dentist-login')
        } catch (err) {
            // console.log(err)
            console.log(err)
        }
    }
  return (
    <div>
        DentistDashboard
        <button 
            className="block w-20 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            onClick={handleLogout}
        >Logout
        </button>
        <button
            className="block w-20 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        ><Link to='/dentist-profile'>Profile</Link></button>
    </div>
  )
}

export default DentistDashboard