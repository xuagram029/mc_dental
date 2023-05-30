import React, { useState } from 'react'
import bgPic from "../assets/loginPic.jpg"
import {AiOutlineEye} from 'react-icons/ai'

export const Registration = () => {

  const [passType, setPassType] = useState("password")
  
  const handlePassType = () => {
    if (passType === "password") {
        setPassType("text");
        return;
      }
      setPassType("password");
    };

  return (
    <div className='bg-white h-screen flex'>
        <div className='basis-1/3 px-2'>
            <img src={bgPic} alt="aparatus" className='h-full w-full rounded-l-3xl'/>
        </div>
        <div className='basis-2/3 mr-4 rounded-r-3xl border-r-2 border-gray-300'>
            <h1 className='font-pop font-bold text-3xl text-gray-700 pt-4'>Registration Form</h1>
            <form className='flex text-gray-700'>
                <div className='basis-1/2 px-8 space-y-4 py-4'>
                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Last Name:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>First Name:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Middle Name:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Gender:</span>
                        <select name="" id="" className='bg-white p-2 border-2 border-primary rounded focus:outline-none focus:border-2'>
                            <option value="">--Select Gender--</option>
                            <option value="Single">Male</option>
                            <option value="Married">Female</option>
                        </select>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Civil Status:</span>
                        <select name="" id="" className='bg-white p-2 border-2 border-primary rounded focus:outline-none focus:border-2'>
                            <option value="">--Select Civil Status--</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Birthdate:</span>
                        <input type='date' className='text-sm bg-white p-2 border-2 border-primary rounded focus:outline-none focus:border-2'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Age:</span>
                        <input type="number" min="0" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Religion:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>
                </div>
                <div className='basis-1/2 px-8 space-y-4 py-4'>
                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Nationality:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Home Address:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Mobile No:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Occupation:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Email:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Referred By:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Password:</span>
                        <input type={passType} className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                        <span onClick={handlePassType} className='cursor-pointer relative -top-7 left-[400px] w-20 text-xl'><AiOutlineEye /></span>
                    </label>

                    <button className='w-full bg-primary text-xl p-3 font-bold font-pop rounded-md text-white hover:bg-second'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}
