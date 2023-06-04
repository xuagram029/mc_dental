import React, { useContext, useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Message = ({setOpenSMS}) => {
    const { user } = useContext(AuthContext)
    const [ number, setNumber ] = useState('')
    const [ message, setMessage ] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
          navigate('/admin-login')
        }else if(user?.resp[0]?.role === 'dentist'){
          navigate('/dentist-dashboard')
        }else if(user?.resp[0]?.role === 'patient'){
          navigate('/patient-dashboard')
        }
      }, [user])

    const handleSend = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/admin/message', {number, message}) 
            console.log(res.data);
        } catch (error) {
            
        }
    }

  return (
    <>
          <div
            className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl ">
            <div>
              <div className='border border-black w-[330px] p-5 m-auto mt-5 rounded-lg bg-white'>
                  <div className='mb-2'>
                      <label htmlFor="number">Number: </label>
                      <input onChange={(e) => {setNumber(e.target.value)}} type="text" className='border border-black rounded p-2' placeholder='639*********'/>
                  </div>
                  <div className='mb-2'>
                      <label htmlFor="message">Message: </label>
                      <textarea placeholder='Send an Appointment Message to Patient' onChange={(e) => {setMessage(e.target.value)}} name="" id="" cols="30" rows="10" className='border border-black rounded-md font-medium text-xs w-full p-2'></textarea>
                  </div>
                  <div className='mb-2'>
                      <button onClick={handleSend} className='border border-black px-5 py-3 w-full rounded'>SEND MESSAGE</button>
                  </div>
                  <div className='flex justify-center'>
                    <button onClick={() => setOpenSMS(false)} className='text-red-500'>Close</button>
                  </div>
              </div>
          </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    
  )
}

export default Message