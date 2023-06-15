import React from 'react'
import {useContext, useEffect, useState} from 'react'
import  DataTable  from 'react-data-table-component'
import { RiUserSearchLine } from 'react-icons/ri';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientRecords = () => {
    const [editModal, setEditModal] = useState(false)
    const [ appointments, setAppointments] = useState([])
    const [ filteredAppointments, setFilteredAppointments] = useState([])
    const [ viewRemarks, setViewRemarks] = useState(false)
    const [ remark, setRemark] = useState('')

    const modalRemarks = (remarks) => {
      setViewRemarks(true)
      setRemark(remarks) 
  }
    useEffect(()=>{
        const getAppointments = async() =>{
          const res = await axios.get('http://localhost:8000/admin')
            console.log(res.data)
            setAppointments(res.data)
            setFilteredAppointments(res.data)
        }
        getAppointments()
      },[])

    const toggleEditModal = () => {
        setEditModal(true)
    }

    const acceptAppointment = async (id) => {
        // e.preventDefault()
        // window.location.reload()
        const res = await axios.put(`http://localhost:8000/appointment/${id}`)
        console.log(res.data.message)
    }
    const rejectAppointment = async (id) => {
        // e.preventDefault()
        window.location.reload()
        const res = await axios.delete(`http://localhost:8000/appointment/${id}`)
        console.log(res.data.message)
    }
    console.log(appointments)

    const customStyles = {
      header: {
        style: {
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
        },
      },
      headCells: {
        style: {
          fontSize: "0.875rem",
          backgroundColor: "#AD8B73",
          color: "#fff",
        },
      },
      cells: {
        style: {
          fontWeight: 600,
        },
      },
    };
    
    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstname,
            sortable: true
        },
        {
            name: 'Last Name',
            selector: row => row.lastname,
            sortable: true
        },
        {
            name: "Visit Date",
            selector: (row) => {
              const date = new Date(row.date);
              return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
            },
            sortable: true,
        },
        {
          name: "Scheduled Time",
          selector: row => row.time,
          sortable: true
        },
        {
            name: "Services",
            selector: row => row.service,
            sortable: true
        },
        {
          name: "Remarks",
          cell: (row) => (
            <div className="flex gap-2">
              <button
                onClick={() => modalRemarks(row.remarks)}
                className="hover:bg-primary bg-second text-white font-bold py-1 px-2 rounded"
              >
                View Remarks
              </button>
              {viewRemarks && (
                <>
                <div
                  className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                >
                  <div className="relative w-auto my-6 mx-auto max-w-xl ">
                    {/*content*/}
                    <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold">
                          Remarks
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p>{remark}</p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setViewRemarks(false)}
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
              )}
            </div>
          ),
          button: true,
        }
    ]
    
    const handleFilter = (e) => {
        const newData = filteredAppointments.filter(row =>
          row.firstname.toLowerCase().includes(e.target.value.toLowerCase()) || 
          row.lastname.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setAppointments(newData)
      }  

  return (
    <div className='font-pop font-bold text-black flex items-center justify-center'>
          <div className={`mt-8 mx-10 w-full border-2 border-black flex flex-col items-center
          justify-center`}>
                  <DataTable
                  title="Patients Record List"
                  data={appointments}
                  columns={columns}
                  pagination
                  customStyles={customStyles}
                  fixedHeader
                  fixedHeaderScrollHeight="550px"
                  subHeader
                  subHeaderAlign="left"
                  subHeaderComponent={
                      <div className='flex items-center gap-x-4'>
                          <RiUserSearchLine className='text-2xl text-black'/>
                          <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                      </div>
                  }
                  />
              </div>
              
        </div>
  )
}

export default PatientRecords
