import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import dentist from '../assets/dents.png'
import {AiOutlineEye} from 'react-icons/ai'
import {BsArrowBarLeft} from 'react-icons/bs'

const DentistLogin = () => {
    const [passType, setPassType] = useState("password")
    const [ username, setUsername] = useState('')
    const [ password, setPassword] = useState('')
    const [err, setErr] = useState(null)
    const navigate = useNavigate()
    const { user, error, loading, dispatch } = useContext(AuthContext)

    const handlePassType = () => {
      if (passType === "password") {
          setPassType("text");
          return;
        }
        setPassType("password");
      };

    useEffect(() => {
        if (user && user.resp && user.resp.length > 0) {
          if (user.resp[0].role === 'dentist') {
            navigate('/dentist-dashboard');
          } else if (user.resp[0].role === 'user') {
            navigate('/');
          }
        }
      }, [user, navigate]);
      

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post('http://localhost:8000/dentist/login', {username, password})
            dispatch({ type: "LOGIN_SUCCESS",  payload: res.data})
            navigate('/dentist-dashboard')
        } catch (error) {
            dispatch({ type: "LOGIN_SUCCESS",  payload: error.response.data.error})
            setErr(error.response.data.error)
        }
    }

  return (
    <div className='font-pop bg-acsent h-screen flex items-center justify-center px-16'>
        <div className='bg-white p-8 shadow-xl rounded-md max-w-5xl flex'>
          <div className='basis-1/2 flex flex-col justify-center'>
          <a href="/" className='pl-8 font-pop flex items-center gap-x-2 text-base font-semibold text-gray-700 mb-8'>
                <BsArrowBarLeft/> Go Back to Home Page
          </a>
          <h1 className='text-2xl text-black font-extrabold text-center'>Welcome Back!</h1>
          <form className="space-y-4 px-8">
            <p className="text-center text-lg font-medium py-8">Sign in to your account</p>
            <label htmlFor='email'>
              <span>Username:</span>
              <input
                    type="email"
                    className="w-full text-sm py-4 px-2 border-b-2 border-primary focus:outline-none mb-4"
                    placeholder="Enter username"
                    onChange={(e) => {setUsername(e.target.value)}}
                />
            </label>

            <label htmlFor="password" className='relative'>
              <span>Password:</span>
              <input
                    type={passType}
                    className="w-full text-sm py-4 px-2 border-b-2 border-primary focus:outline-none"
                    placeholder="Enter password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
              <span onClick={handlePassType} className='cursor-pointer absolute top-10 end-4 text-xl text-primary'>
                  <AiOutlineEye />
              </span>
            </label>

            <button
                type="submit"
                className="block w-full rounded-lg bg-second px-5 py-3 text-sm font-semibold text-white hover:bg-acsent"
                onClick={handleSubmit}
            >
                Sign in
            </button>
            {err && <div className='text-red-700'>{err}</div>}
            <p className="text-center text-sm text-gray-500">
                No account? Kindly inform the Admin
            </p>
            </form>
          </div>
          <div className='basis-1/2 flex items-center justify-center'>
            <img src={dentist} alt="dentist" className='' />
          </div>
        </div>
    </div>
  )
}

export default DentistLogin