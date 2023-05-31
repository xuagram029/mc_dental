import React from 'react'
import mcLogo from '../assets/mcLogo.png'
import heropic from '../assets/heroImg.jpg'
import { AboutUs } from '../components/Landing Page/AboutUs'
import { Services } from '../components/Landing Page/Services'
import { Contacts } from '../components/Landing Page/Contacts'

const Landing = () => {
  return (
    <div>
      <div className='h-screen lg:px-8 sm:px-2 bg-primary shadow-inner'>
        <nav className='p-4 flex items-center justify-between'>
            <img src={ mcLogo } alt="MC Logo" className='w-20 p-1 border-4 border-white rounded-full' />
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
            <div className='text-white font-pop font-semibold lg:space-x-4 sm:space-x-2'>
                <a href="login" className='border-white border-2 px-8 py-3 rounded-3xl hover:bg-acsent hover:border-acsent'>Login</a>
                <a href="register" className='bg-white border-2 border-white text-primary px-6 py-3 rounded-3xl hover:bg-second hover:text-white hover:border-second'>Sign Up</a>
            </div>
        </nav>
        <section className='flex items-center py-16 px-8 gap-x-8'>
            <div className='lg:basis-1/2 sm:basis-full'>
                <h1 className='text-white uppercase lg:text-8xl sm:text-4xl font-pop font-medium'>
                    Smile, It lets your teeth breathe
                </h1>
                <p className='text-white font-lora font-thin text-justify pt-8 pb-16 opacity-80'>
                At MC Dental Clinic, we are dedicated to providing exceptional dental care and creating beautiful, healthy smiles. With our team of highly skilled dental professionals and state-of-the-art facilities, we strive to make every visit a comfortable and rewarding experience.
                </p>
                <a href='register' className="bg-second rounded text-white font-pop text-xl py-4 px-8 font-bold hover:bg-acsent shadow-lg">
                    Register Now!
                </a>
            </div>
            <div className='basis-1/2 lg:block sm:hidden'>
                <img src={heropic} alt="hero image" className='rounded-full w-9/12 mx-auto border-4 border-white' />
            </div>
        </section>
      </div>
      <div id='about' className='h-screen bg-second'>
        <AboutUs />
      </div>

      <div id='services' className='h-full bg-acsent'>
        <Services />
      </div>

      <div id='contacts' className='h-screen bg-white'>
        <Contacts />
      </div>
    </div>
  )
}

export default Landing
