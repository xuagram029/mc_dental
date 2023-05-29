import React from 'react'
import mcLogo from '../assets/mcLogo.png'
import heropic from '../assets/heroImg.jpg'

const Landing = () => {
  return (
    <div>
      <div className='h-screen px-8 bg-primary shadow-inner'>
        <nav className='p-4 flex items-center justify-between'>
            <img src={ mcLogo } alt="MC Logo" className='w-20 p-1 border-4 border-white rounded-full' />
            <div className='flex items-center gap-x-16 font-pop font-medium text-white'>
                <a href="#about" class="group transition duration-300">
                    About Us
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white">
                    </span>
                </a>
                <a href="#" class="group transition duration-300">
                    Services
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white">
                    </span>
                </a>
                <a href="#" class="group transition duration-300">
                    Contacts
                    <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white">
                    </span>
                </a>
            </div>
            <div className='text-white font-pop font-semibold space-x-4'>
                <a href="login" className='border-white border-2 px-8 py-3 rounded-3xl hover:bg-acsent hover:border-acsent'>Login</a>
                <a href="#" className='bg-white border-2 border-white text-primary px-6 py-3 rounded-3xl hover:bg-second hover:text-white hover:border-second'>Sign Up</a>
            </div>
        </nav>
        <section className='flex items-center py-16 px-8 gap-x-8'>
            <div className='basis-1/2'>
                <h1 className='text-white uppercase text-8xl font-pop font-medium'>
                    Smile, It lets your teeth breathe
                </h1>
                <p className='text-white font-lora text-lg font-thin text-justify py-4 opacity-80'>
                At MC Dental Clinic, we are dedicated to providing exceptional dental care and creating beautiful, healthy smiles. With our team of highly skilled dental professionals and state-of-the-art facilities, we strive to make every visit a comfortable and rewarding experience.
                </p>
                <button className="bg-second rounded text-white font-pop text-xl py-4 px-8 font-bold hover:bg-acsent shadow-lg">
                    Register Now!
                </button>
            </div>
            <div className='basis-1/2'>
                <img src={heropic} alt="hero image" className='rounded-full w-full border-4 border-white' />
            </div>
        </section>
      </div>
      <div id='about' className='h-screen bg-white'>

      </div>
    </div>
  )
}

export default Landing
