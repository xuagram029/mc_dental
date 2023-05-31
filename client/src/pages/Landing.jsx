import React from 'react'
import heropic from '../assets/heroImg.jpg'
import { AboutUs } from '../components/Landing Page/AboutUs'
import { Services } from '../components/Landing Page/Services'
import { Contacts } from '../components/Landing Page/Contacts'
import { NavBar } from '../components/NavBar'

const Landing = () => {
  return (
    <div className='w-full'>
      <NavBar />
      <div className='h-screen lg:px-8 sm:px-2 bg-primary shadow-inner pt-16'>
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
            <div className='basis-1/2 lg:block sm:hidden py-4'>
                <img src={heropic} alt="hero image" className='rounded-full w-[550px] h-full m-auto border-4 border-white' />
            </div>
        </section>
      </div>
      <div id='about' className='h-screen bg-second'>
        <AboutUs />
      </div>

      <div id='services' className='h-full bg-acsent'>
        <Services />
      </div>

      <div id='contacts' className='h-screen bg-slate-400'>
        <Contacts />
      </div>
    </div>
  )
}

export default Landing
