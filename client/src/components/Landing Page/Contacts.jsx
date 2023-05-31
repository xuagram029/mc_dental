import React from 'react'
import {BsFillTelephoneFill, BsClock, BsInstagram} from 'react-icons/bs'
import {HiLocationMarker} from "react-icons/hi"
import {FaFacebookF} from "react-icons/fa"

export const Contacts = () => {
  return (
    <div className='h-full bg-rose-300 rounded-md flex'>
      <div className='basis-1/3 bg-primary m-2 rounded-xl px-8 pt-24 relative border-2 border-primary'>
        <div>
          <h1 className='font-pop text-white font-medium text-3xl'>Contact Information</h1>
          <p className='font-pop text-white font-extralight py-4'>Fill up the form and Our Team will get back to you within 24 hours.</p>
        </div>

        <div className='space-y-12 pt-8'>
          <div className='flex flex-col gap-y-3 text-white'>
            <span className='flex items-center gap-x-8 text-xl'>
              <HiLocationMarker className='text-pink-300' />
              <p className=' text-base font-medium'>Branch 1: 2341 Leveriza St., Pasay City, Philippines</p>
            </span>

            <span className='flex items-center gap-x-8 text-xl'>
              <HiLocationMarker className='scale-0' />
              <p className='text-base font-medium'>Branch 2: 2519 P. Zamora, Pasay City, Philippines</p>
            </span>
              
          </div>

          <div className='flex items-center gap-x-8 text-white'>
            <span>
              <BsFillTelephoneFill className='text-pink-300' />
            </span>
            <p>+63960-609-447</p>
          </div>

          <div className='flex flex-col text-white'>
            <span className='flex items-center gap-x-8'>
              <BsClock className='text-lg text-pink-300' />
              <p className='font-medium'>Mon to Sat: <i className='text-sm font-light'>9:00am - 7:00pm</i></p>
            </span>

            <span className='flex items-center gap-x-8'>
              <BsClock className='scale-0' />
              <p className='font-medium'>Sunday: <i className='text-sm font-light'>Appointment Only</i></p>
            </span>
          </div>
        </div>

        <div>
          <div className='absolute -bottom-20 -right-16 bg-rose-300 p-32 rounded-full'></div>
          <div className='absolute bottom-20 right-24 bg-acsent p-16 rounded-full opacity-90'></div>
        </div>

        <div className='absolute bottom-10 left-24'>
          <div className='flex gap-x-6 text-white items-center text-xl'>
              <a href='https://www.facebook.com/MaChristineDentalClinic' className='hover:rounded-full hover:bg-pink-300 p-4'><FaFacebookF /></a>
              <a href='https://www.instagram.com/mcdclinic' className='hover:rounded-full hover:bg-pink-300 p-4'><BsInstagram /></a>
            </div>
        </div>
      </div>
      

      <div className='basis-2/3'>

      </div>
    </div>
  )
}
