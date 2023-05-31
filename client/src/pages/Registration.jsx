import React, { useState } from 'react'
import bgPic from "../assets/loginPic.jpg"
import {AiOutlineEye} from 'react-icons/ai'
import {BsArrowBarLeft} from 'react-icons/bs'
import { TermsAndConditions } from '../components/TermsAndConditions'

export const Registration = () => {

  const [passType, setPassType] = useState("password")
  const [agreement, setAgreement] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleAgreement = (e) => {
    setAgreement(e.target.checked)
  }
  
  const handlePassType = () => {
    if (passType === "password") {
        setPassType("text");
        return;
      }
      setPassType("password");
    };

  return (
    <div className='bg-white lg:h-screen md:h-full sm:h-full flex'>
        <div className='basis-1/3 lg:block sm:hidden'>
            <img src={bgPic} alt="aparatus" className='h-full w-full'/>
        </div>
        <div className='lg:basis-2/3 sm:basis-full flex flex-col justify-center'>
            <h1 className='font-pop font-bold text-3xl text-gray-700 py-4 pl-4 flex items-center gap-x-2'>
                <a href="/"><BsArrowBarLeft /></a>
                Registration Form
            </h1>
            <form className='flex text-gray-700 lg:flex-row sm:flex-col'>
                <div className='basis-1/3 px-8 space-y-4 py-4'>
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
                </div>

                <div className='basis-1/3 px-8 space-y-4 py-4'>
                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Age:</span>
                        <input type="number" min="0" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

                    <label className='flex flex-col'>
                        <span className='font-pop font-semibold'>Religion:</span>
                        <input type="text" className='w-full p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                    </label>

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
                </div>

                <div className='basis-1/3 px-8 space-y-4 py-4'>
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
                        <span onClick={handlePassType} className='cursor-pointer relative -top-7 lg:left-[240px] sm:left-[270px] w-10 text-xl'><AiOutlineEye /></span>
                    </label>

                    {agreement && (
                        <button className='w-full bg-primary text-xl p-3 font-bold font-pop rounded-md text-white hover:bg-second'>Submit</button>
                    )}

                    {!agreement && (
                        <button disabled className='w-full bg-gray-300 text-xl p-3 font-bold font-pop rounded-md text-white'>Submit</button>
                    )}

                    <span className='font-pop text-sm space-y-3'>
                        <span className='flex items-center pt-6'>
                            <input type="checkbox" name='agreement' onChange={handleAgreement}/>
                            <p className='flex items-center gap-x-1'>I agree with the <p onClick={() => setOpenModal(!openModal)} className='text-violet-500 cursor-pointer hover:text-violet-800'>terms and conditions</p></p>
                        </span>
                        <p>Already have an account? <a href="login" className='font-semibold hover:underline text-primary'>Sign In Here.</a></p>
                    </span>

                    {openModal && <TermsAndConditions setOpenModal={setOpenModal}/>}
                </div>
            </form>
        </div>
    </div>
  )
}
