import React, { useContext, useState, useEffect } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Message = () => {
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
    <div>
        <AdminNavbar />
        <div className='border border-black w-72 p-5 m-auto mt-5'>
            <div className='mb-2'>
                <label htmlFor="number">Number: </label>
                <input onChange={(e) => {setNumber(e.target.value)}} type="text" className='border border-black rounded-md' placeholder='639*********'/>
            </div>
            <div className='mb-2'>
                <label htmlFor="message">Message: </label>
                <textarea onChange={(e) => {setMessage(e.target.value)}} name="" id="" cols="30" rows="10" className='border border-black rounded-md'></textarea>
            </div>
            <div className='mb-2'>
                <button onClick={handleSend} className='border border-black px-5 py-3'>SEND MESSAGE</button>
            </div>
        </div>
    </div>
  )
}

export default Message