import React from 'react'
import {BsFillTelephoneFill, BsClock, BsInstagram, BsFillSendFill} from 'react-icons/bs'
import {HiLocationMarker} from "react-icons/hi"
import {FaFacebookF} from "react-icons/fa"
import {AiOutlineUser, AiOutlineMail} from "react-icons/ai"

export const Contacts = () => {
  return (
    <div className='h-full bg-rose-300 rounded-md flex sm:flex-col lg:flex-row'>
      <div className='basis-1/3 bg-primary lg:my-28 sm:my-0 lg:ml-10 rounded-md sm:order-2 lg:order-1'>
        <h1 className='text-2xl font-pop text-white font-semibold text-center py-6 px-14'>Site Map of Our MC Dental Clinic Branches</h1>
        <div className='flex items-center justify-center'>
          <iframe width="350" height="350" frameborder="10" scrolling="no" marginheight="0" marginwidth="auto" src="https://www.google.com/maps/d/u/2/embed?mid=1Cfo3U3CA0XbgSr5YDve5LiIu5RvHFNM&ehbc=2E312F">
          </iframe>
        </div>
        
      </div>

      <div className='basis-2/3 bg-rose-300 flex flex-col items-center sm:pl-4 lg:my-32 sm:my-0 sm:order-1 lg:order-2'>
      <div>
          <h1 className='font-pop text-white font-medium text-3xl'>Contact Information</h1>
          <p className='font-pop text-white font-extralight py-8'>Fill up the form and Our Team will get back to you within 24 hours.</p>
        </div>

        <div className='space-y-8 font-pop'>
          <div className='flex flex-col gap-y-3 text-white'>
            <span className='flex items-center gap-x-8 text-xl'>
              <HiLocationMarker className='text-lg text-white' />
              <p className=' text-base font-medium'>Branch 1: 2341 Leveriza St., Pasay City, Philippines</p>
            </span>

            <span className='flex items-center gap-x-8 text-xl'>
              <HiLocationMarker className='scale-0' />
              <p className='text-base font-medium'>Branch 2: 2519 P. Zamora, Pasay City, Philippines</p>
            </span>
              
          </div>

          <div className='flex items-center gap-x-8 text-white'>
            <span>
              <BsFillTelephoneFill className='text-white' />
            </span>
            <p>+63960-609-4407</p>
          </div>

          <div className='flex flex-col text-white'>
            <span className='flex items-center gap-x-8'>
              <BsClock className='text-lg text-white' />
              <p className='font-medium'>Mon to Sat: <i className='text-sm font-light'>9:00am - 7:00pm</i></p>
            </span>

            <span className='flex items-center gap-x-8'>
              <BsClock className='scale-0' />
              <p className='font-medium'>Sunday: <i className='text-sm font-light'>Appointment Only</i></p>
            </span>
          </div>
        </div>
        <div className='flex gap-x-6 text-white items-center justify-center py-10 text-2xl'>
            <a href='https://www.facebook.com/MaChristineDentalClinic' className='border-2 border-white rounded-full hover:bg-white hover:text-rose-300 p-4'><FaFacebookF /></a>
            <a href='https://www.instagram.com/mcdclinic' className='border-2 border-white rounded-full hover:bg-white hover:text-rose-300 p-4'><BsInstagram /></a>
        </div>
      </div>
    </div>
  )
}
