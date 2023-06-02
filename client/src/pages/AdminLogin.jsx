import {BsArrowBarLeft} from "react-icons/bs"
import {AiOutlineEye} from "react-icons/ai"
import admin from '../assets/adminPanel.png'
import { useState } from 'react';

const AdminLogin = () => {

    const [passType, setPassType] = useState("password")
    const handlePassType = () => {
        if (passType === "password") {
            setPassType("text");
            return;
          }
          setPassType("password");
        };

    const handleSubmit = () => {
        BsWindowSidebar.alert("okay")
    }    
    
  return (
    <div className='font-pop bg-white h-screen flex items-center justify-center'>
      <div className='bg-second p-4 rounded-lg shadow-2xl flex mx-10'>
        <div className='basis-1/2 lg:flex sm:hidden items-cente justify-center'>
            <img src={admin} alt="Admin Logo" />
        </div>
        <div className='lg:basis-1/2 sm:basis-full'>
        <a href="/" className='pl-8 font-pop flex items-center gap-x-2 text-base font-semibold text-white mb-8 hover:text-black'>
                <BsArrowBarLeft/> Go Back to Home Page
          </a>
          <h1 className='text-2xl text-white font-extrabold text-center'>Welcome Back!</h1>
          <form className="space-y-4 px-8">
            <p className="text-center text-lg font-medium py-8 text-white">Sign in to your account</p>
            <label htmlFor='email'>
              <span className="font-semibold">Username:</span>
              <input
                    type="email"
                    className="w-full text-sm py-4 px-2 border-b-2 border-white focus:outline-none mb-4 bg-transparent text-black font-medium"
                    placeholder="Enter username"
                    onChange={(e) => {setUsername(e.target.value)}}
                />
            </label>

            <label htmlFor="password" className='relative'>
              <span className="font-semibold">Password:</span>
              <input
                    type={passType}
                    className="w-full text-sm py-4 px-2 border-b-2 border-white focus:outline-none bg-transparent text-black font-medium"
                    placeholder="Enter password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
              <span onClick={handlePassType} className='cursor-pointer absolute top-10 end-4 text-xl text-black'>
                  <AiOutlineEye />
              </span>
            </label>

            <button
                type="submit"
                className="block w-full rounded-lg bg-acsent px-5 py-3 text-sm font-semibold text-black hover:bg-primary"
                onClick={handleSubmit}
            >
                Sign in
            </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
