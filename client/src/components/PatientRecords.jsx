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
          selector: row => row.remarks,
          sortable: true
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
