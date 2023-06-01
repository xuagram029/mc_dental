import React from 'react'
import '.././index.css'
import loginPic from "../assets/12345.jpg"
import loginLogo from "../assets/mcloginlogo.png"

const Login = () => {
  return (
    <div className='bgImg h-screen flex'>
        <div className='glass px-28 basis-1/2 flex flex-col justify-center'>
            <div className='py-8'>
                <h1 className='text-gray-700 font-pop font-bold text-4xl py-4 text-center'>Glad to See Your Smile Back!</h1>
                <p className='font-lora font-semibold text-center text-lg text-gray-700'>"MC Dentals: Where Healthy Smiles Shine Bright!"</p>
            </div>
            <form className='text-gray-700'>
                <label className='flex flex-col gap-y-1 pb-4'>
                    <span className='text-lg font-medium font-pop'>Username:</span>
                    <input type="text" className='p-2 rounded opacity-50 focus:outline-none' />
                </label>

                <label className='flex flex-col gap-y-1 pb-4'>
                    <span className='text-lg font-medium font-pop'>Password:</span>
                    <input type="password" className='p-2 rounded opacity-50 focus:outline-none' />
                </label>

                <button type='submit' className='bg-white rounded w-full py-3 font-pop font-semibold my-4'>
                    Login
                </button>
            </form>
            <p className='text-gray-700 font-pop font-semibold py-8'>Don't have an account? <a href="#" className='text-blue-950 hover:underline'>Register Here.</a></p>
            <a href="/">
                <img src={loginLogo} alt="mc login logo" className='w-96 max-w-full mx-auto p-8' style={{mixBlendMode: "multiply"}}/>
            </a>
        </div>

        <div className='basis-1/2'>
            <img src={loginPic} alt="name plate" className='w-[450px] pl-20 pt-10' style={{mixBlendMode: "multiply"}}/>
        </div>
    </div>
  )
}

export default Login
