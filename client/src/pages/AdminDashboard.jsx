import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Calendar from '../components/Calendar'
import { AuthContext } from '../context/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdTextsms } from 'react-icons/md'
import { AiOutlineSchedule } from 'react-icons/ai'
import  Message from '../components/Message'
import { toast } from "react-toastify";
import axios from 'axios'

const AdminDashboard = () => {
  const [openSMS, setOpenSMS] = useState(false)
  const { user, error, loading, dispatch } = useContext(AuthContext)
  const [limit, setLimit] = useState('')
  const [limitModal, setLimitModal] = useState(false)
  const [appLimit, setAppLimit] = useState('')
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

    useEffect(() => {
      const maxAppointment = async () => {
        try {
          const res = await axios.get('http://localhost:8000/appointment/limit')
          setAppLimit(Number(res.data[0]?.limit))
          console.log(res.data)
        } catch (error) {
          toast.error(error)
        }
      }
      maxAppointment()
    }, [])

    const updateLimit = async (e) => {
      try {
        const res = await axios.put(`http://localhost:8000/appointment`, {max:limit})
        window.location.reload()
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    const toggleLimit = () => {
      setLimitModal(true);
    };

    useEffect(() => {
      if(limitModal){
        document.body.style.overflow = 'hidden'
      }else{
        document.body.style.overflow = 'visible'
      }
    }, [limitModal])
  
  return (
    <div className='h-screen'>
      <AdminNavbar />
      <div>
        <div className='flex items-center justify-between mx-10 mt-4'>
          <h1 className='pt-8 font-pop font-bold text-2xl text-gray-700'>Appointment Calendar</h1>
          <div className='flex'>
            <div className='mr-5'>
              <button onClick={() => setOpenSMS(true)} className='bg-primary text-white px-6 py-3 rounded-md flex items-center gap-x-2 hover:bg-second'><MdTextsms/>SMS</button>
            </div>
            <div>
              <button
                onClick={() => toggleLimit(true)}
                className="bg-primary text-white px-6 py-3 rounded-md flex items-center gap-x-2 hover:bg-second"
              >
                <AiOutlineSchedule className="text-xl"/>
                Limit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Calendar />
      {openSMS && <Message setOpenSMS={setOpenSMS} />}

      {limitModal && (
        <>
          <div className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[rgba(49,49,49,0.8)]">
            <div className="relative w-auto my-6 mx-auto max-w-4xl ">
              {/*content*/}
              <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Appointment Limit</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="space-y-8">
                    <div>
                      <label htmlFor="name">CURRENT LIMIT: {appLimit}</label>
                      {/* <input required type="text" value={editName} onChange={(e) => {setEditName(e.target.value)}} className='w-full p-2 border border-black rounded focus:outline-none'/> */}
                      <input
                        required
                        onChange={(e) => setLimit(e.target.value)}
                        type="text"
                        className="w-full p-2 border border-black rounded focus:outline-none "
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setLimitModal(false)}
                  >
                    Close
                  </button>
                  <button onClick={updateLimit}
                  className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    UPDATE LIMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
