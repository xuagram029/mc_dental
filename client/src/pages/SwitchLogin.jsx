import React from 'react'
import { Link } from 'react-router-dom'
import patient from '../assets/patient.png'
import admin from '../assets/admin.png'
import dentist from '../assets/dentist.png'
import mcLogo from '../assets/mcLogo.png'
import { useNavigate } from 'react-router-dom'

const SwitchLogin = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className='bg-black h-screen w-full'>
      <img src={mcLogo} alt="MC Logo" className='lg:w-24 sm:w-16 absolute border-2 border-rose-300 rounded-full p-2 m-3'/>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-3xl text-white font-medium font-pop'>Who is Logging In?</h1>
        <div className='flex items-center lg:gap-x-24 sm:gap-x-8 justify-center pt-24 w-full'>
            <Link to="/login" className='relative group transition duration-300'>
              <img src={patient} alt="patient" className='rounded-[50px] group-hover:blur' />
              <span className='absolute scale-0 inset-14 font-pop text-xl font-bold text-white uppercase group-hover:scale-100 transition-all duration-300'>Patient</span>
              <p className='text-center font-pop text-white pt-4 font-semibold group-hover:scale-0 transition-all duration-300'>Patient</p>
            </Link>
            <Link to="/dentist-login" className='relative group transition duration-300'>
              <img src={dentist} alt="dentist" className='rounded-[50px] group-hover:blur' />
              <span className='absolute scale-0 inset-14 font-pop text-xl font-bold text-white uppercase group-hover:scale-100 transition-all duration-300'>Dentist</span>
              <p className='text-center font-pop text-white pt-4 font-semibold group-hover:scale-0 transition-all duration-300'>Dentist</p>
            </Link>
            <Link to="/admin-login" className='relative group'>
              <img src={admin} alt="admin" className='rounded-[50px] group-hover:blur' />
              <span className='absolute scale-0 inset-14 font-pop text-xl font-bold text-white uppercase group-hover:scale-100 transition-all duration-300'>Admin</span>
              <p className='text-center font-pop text-white pt-4 font-semibold group-hover:scale-0 transition-all duration-300'>Admin</p>
            </Link>
        </div>
        <button onClick={handleBack} className='border-2 border-white text-white font-pop text-lg font-medium px-8 py-2 mt-8 rounded-3xl uppercase hover:bg-white hover:text-black' >Go Back</button>
      </div>
    </div>
  )
}

export default SwitchLogin
