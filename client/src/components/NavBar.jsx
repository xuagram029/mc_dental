import React, { useContext } from 'react'
import mcLogo from '../assets/mcLogo.png'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    const { user } = useContext(AuthContext)
  return (
    <>
        <nav className='w-full lg:fixed sm:static lg:bg-transparent sm:bg-primary py-4 px-12 flex items-center justify-between'>
            <a href="#home"><img src={ mcLogo } alt="MC Logo" className='w-20 p-1 border-4 border-white rounded-full' /></a>
            <div className='lg:flex items-center gap-x-16 font-pop font-medium text-white sm:hidden'>
                <a href="#about" class="group transition duration-300">
                    About Us
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white">
                    </span>
                </a>
                <a href="#services" class="group transition duration-300">
                    Services
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white">
                    </span>
                </a>
                <a href="#contacts" class="group transition duration-300">
                    Contacts
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white">
                    </span>
                </a>
            </div>
            {
                !user &&
                <div className='text-white font-pop font-semibold lg:space-x-4 sm:space-x-2'>
                    <a href="login-as" className='border-white border-2 lg:px-8 lg:py-3 sm:px-4 sm:py-1 rounded-3xl hover:bg-acsent hover:border-acsent'>Login</a>
                    <a href="register" className='bg-white border-2 border-white text-primary lg:px-6 lg:py-3 sm:px-3 sm:py-1 rounded-3xl hover:bg-second hover:text-white hover:border-second'>Sign Up</a>
                </div>
            }
            {
                user &&
                <div className='text-white font-pop font-semibold lg:space-x-4 sm:space-x-2'>
                    <Link to="/patient-profile" className='border-white border-2 lg:px-8 lg:py-3 sm:px-4 sm:py-1 rounded-3xl hover:bg-acsent hover:border-acsent'>Profile</Link>
                    <a href="register" className='bg-white border-2 border-white text-primary lg:px-6 lg:py-3 sm:px-3 sm:py-1 rounded-3xl hover:bg-second hover:text-white hover:border-second'>Sign Up</a>
                </div>
            }
        </nav>
    </>
  )
}
