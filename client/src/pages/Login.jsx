import React, { useState, useContext, useEffect } from 'react'
import '.././index.css'
import {BsArrowBarLeft} from 'react-icons/bs'
import loginPic from "../assets/12345.jpg"
import loginLogo from "../assets/mcloginlogo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const [ username, setUsername] = useState('')
    const [ password, setPassword] = useState('')
    const [err, setErr] = useState(null)
    const navigate = useNavigate()
    const { user, error, loading, dispatch } = useContext(AuthContext)

    useEffect(() => {
        if (user && user.resp && user.resp.length > 0) {
          if (user.resp[0].role === 'user') {
            navigate('/patient-dashboard');
          } else if (user.resp[0].role === 'dentist') {
            navigate('/dentist-dashboard');
          }
        }
      }, [user, navigate]);
      

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post('http://localhost:8000/patient/login', {username, password})
            dispatch({ type: "LOGIN_SUCCESS",  payload: res.data})
            navigate('/patient-dashboard')
        } catch (error) {
            dispatch({ type: "LOGIN_SUCCESS",  payload: error.response.data.error})
            setErr(error.response.data.error)
        }
    }

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
                    <input type="text" 
                    placeholder="Enter username"
                    onChange={(e) => {setUsername(e.target.value)}}
                    className='p-2 rounded opacity-50 
                    focus:outline-none' />
                </label>

                <label className='flex flex-col gap-y-1 pb-4'>
                    <span className='text-lg font-medium font-pop'>Password:</span>
                    <input type="password" 
                    className='p-2 rounded opacity-50 focus:outline-none' 
                    placeholder="Enter password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
                </label>

                <button 
                onClick={handleSubmit}
                type='submit' className='bg-white rounded w-full py-3 font-pop font-semibold my-4' >
                    Login
                </button>
            {err && <div className='text-red-700'>{err}</div>}
            </form>
            <p className='text-gray-700 font-pop font-semibold'>Don't have an account?<Link className='hover:underline text-primary px-1' to='/user-signup'>Sign up Here</Link></p>
            <a href="/">
                <img src={loginLogo} alt="mc login logo" className='w-96 max-w-full mx-auto p-8' style={{mixBlendMode: "multiply"}}/>
            </a>
        </div>

        <div className='lg:basis-1/2 lg:block sm:hidden'>
            <img src={loginPic} alt="name plate" className='w-[450px] pl-20 pt-10' style={{mixBlendMode: "multiply"}}/>
        </div>
    </div>
  )
}

export default Login
