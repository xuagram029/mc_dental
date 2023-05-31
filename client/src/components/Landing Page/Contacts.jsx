import React from 'react'
import {BsFillTelephoneFill, BsClock, BsInstagram, BsFillSendFill} from 'react-icons/bs'
import {HiLocationMarker} from "react-icons/hi"
import {FaFacebookF} from "react-icons/fa"
import {AiOutlineUser, AiOutlineMail} from "react-icons/ai"

export const Contacts = () => {
  return (
    <div className='h-full bg-rose-300 rounded-md flex sm:flex-col lg:flex-row'>
      <div className='basis-1/3 bg-primary m-2 rounded-xl px-8 lg:pt-24 sm:pt-8 border-2 border-primary'>
        <div>
          <h1 className='font-pop text-white font-medium text-3xl'>Contact Information</h1>
          <p className='font-pop text-white font-extralight py-4'>Fill up the form and Our Team will get back to you within 24 hours.</p>
        </div>

        <div className='space-y-12 lg:pt-16 sm:pt-4 font-pop'>
          <div className='flex flex-col gap-y-3 text-white'>
            <span className='flex items-center gap-x-8 text-xl'>
              <HiLocationMarker className='text-lg text-rose-300' />
              <p className=' text-base font-medium'>Branch 1: 2341 Leveriza St., Pasay City, Philippines</p>
            </span>

            <span className='flex items-center gap-x-8 text-xl'>
              <HiLocationMarker className='scale-0' />
              <p className='text-base font-medium'>Branch 2: 2519 P. Zamora, Pasay City, Philippines</p>
            </span>
              
          </div>

          <div className='flex items-center gap-x-8 text-white'>
            <span>
              <BsFillTelephoneFill className='text-rose-300' />
            </span>
            <p>+63960-609-4407</p>
          </div>

          <div className='flex flex-col text-white'>
            <span className='flex items-center gap-x-8'>
              <BsClock className='text-lg text-rose-300' />
              <p className='font-medium'>Mon to Sat: <i className='text-sm font-light'>9:00am - 7:00pm</i></p>
            </span>

            <span className='flex items-center gap-x-8'>
              <BsClock className='scale-0' />
              <p className='font-medium'>Sunday: <i className='text-sm font-light'>Appointment Only</i></p>
            </span>
          </div>
        </div>
        <div className='flex gap-x-6 text-white items-center justify-center pt-16 text-xl'>
            <a href='https://www.facebook.com/MaChristineDentalClinic' className='hover:rounded-full hover:bg-rose-300 p-4'><FaFacebookF /></a>
            <a href='https://www.instagram.com/mcdclinic' className='hover:rounded-full hover:bg-rose-300 p-4'><BsInstagram /></a>
        </div>
      </div>

      <div className='basis-2/3 h-full flex flex-col justify-center w-full pt-16 bg-rose-300'>
        <form className='px-16 space-y-8'>
            <label className='flex lg:flex-row sm:flex-col items-center gap-x-4 sm:gap-y-2'>
              <span className='lg:text-4xl sm:hidden lg:block text-white'><AiOutlineUser /></span>
              <input type="text" placeholder='First Name' className='p-4 basis-1/2 sm:w-full rounded-md focus:outline-none focus:border-2 focus:border-acsent'/>
              <input type="text" placeholder='Last Name' className='p-4 basis-1/2 sm:w-full rounded-md focus:outline-none focus:border-2 focus:border-acsent'/>
            </label>

            <label className='flex items-center gap-x-4'>
              <span className='lg:text-4xl sm:hidden lg:block text-white'><AiOutlineMail /></span>
              <input type="email" placeholder='Email' className='p-4 basis-full rounded-md focus:outline-none focus:border-2 focus:border-acsent' />
            </label>

            <label className='flex items-center gap-x-4'>
              <textarea name="" id="" className='resize-none basis-full rounded-md focus:outline-none focus:border-2 focus:border-acsent p-2 h-36' placeholder='Type your concern/s here.'></textarea>
            </label>

            <button type='submit' className='uppercase w-full bg-white py-5 rounded text-second font-bold text-2xl hover:bg-acsent hover:text-white flex items-center justify-center gap-x-2 font-pop'>
              <span><BsFillSendFill /></span>
              Submit
            </button>
          </form>
      </div>
    </div>
  )
}
