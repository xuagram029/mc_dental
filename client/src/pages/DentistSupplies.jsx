import React from 'react'
import DentistNavBar from '../components/DentistNavBar'
import Supplies from '../components/Supplies'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

const DentistSupplies = () => {
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
      <Supplies />
    </div>
  )
}

export default DentistSupplies
