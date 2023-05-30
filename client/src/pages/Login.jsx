import React from 'react'
import '.././index.css'
import {BsArrowBarLeft} from 'react-icons/bs'
import loginPic from "../assets/12345.jpg"
import loginLogo from "../assets/mcloginlogo.png"

const Login = () => {
  return (
    <div className='bgImg h-screen flex'>
        <div className='glass lg:px-28 lg:basis-1/2 flex flex-col justify-center sm:basis-full sm:h-screen sm:px-4'>
        <a href="/" className='font-pop flex items-center gap-x-2 text-lg font-semibold text-gray-700 mb-8'>
                <BsArrowBarLeft/> Go Back to Home Page
        </a>
            <div className='pb-8'>
                <h1 className='text-gray-700 font-pop font-bold lg:text-4xl sm:text-3xl py-4 text-center'>Glad to See Your Smile Back!</h1>
                <p className='lg:block sm:hidden font-lora font-semibold text-center text-lg text-gray-700'>"MC Dentals: Where Healthy Smiles Shine Bright!"</p>
            </div>
            <form className='text-gray-700'>
                <label className='flex flex-col gap-y-1 pb-4'>
                    <span className='text-lg font-medium font-pop'>Username:</span>
                    <input type="text" className='p-2 rounded opacity-70 focus:outline-none' />
                </label>

                <label className='flex flex-col gap-y-1 pb-4'>
                    <span className='text-lg font-medium font-pop'>Password:</span>
                    <input type="password" className='p-2 rounded opacity-70 focus:outline-none' />
                </label>

                <button type='submit' className='bg-white rounded w-full py-3 font-pop font-semibold my-4'>
                    Login
                </button>
            </form>
            <p className='text-gray-700 font-pop font-semibold pt-8'>Don't have an account? <a href="register-user" className='text-blue-950 hover:underline'>Register Here.</a></p>
        </div>

        <div className='lg:basis-1/2 lg:block sm:hidden'>
            <img src={loginPic} alt="name plate" className='w-[450px] pl-20 pt-10' style={{mixBlendMode: "multiply"}}/>
        </div>
    </div>
  )
}

export default Login
