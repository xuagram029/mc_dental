import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import  DataTable  from 'react-data-table-component'
import { RiUserSearchLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const PatientAppointments = () => {
    const [ appointments, setAppointments] = useState([])
    const [ filteredAppointments, setFilteredAppointments] = useState([])
    const { id } = useParams()
    useEffect(() => {
        const getAppointments = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/patient/appointments/${id}`)
                console.log(res.data)
                setAppointments(res.data)
                setFilteredAppointments(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAppointments()
    }, [])

    const columns = [
        // {
        //     name: 'Full Name',
        //     selector: row => row.name,
        //     sortable: true
        // },
        {
            name: 'Patient ID',
            selector: row => row.id,
            // sortable: true
        },
        {
            name: "Date",
            selector: row => new Date(row.date).toLocaleString(),
            sortable: true
        },
        {
            name: "Agenda",
            selector: row => row.service,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
    ]

    const handleFilter = (e) => {
        const newData = filteredAppointments.filter(row =>
          row.service.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setAppointments(newData)
      }

  return (
    <div>
        <div className="flex flex-col md:flex-row">
            <Link to='/patient-dashboard'>Back</Link>
        <div className="flex flex-col w-full md:w-3/4 lg:w-screen">
            <div className="flex ml-8 mt-5 justify-between items-center space-x-6 font-bold font-pop text-base">
                <h1 className="text-4xl">Appointment History</h1>
            </div>
            <div className='w-[90vw]'>
                <div className='p-[50px 10%] mt-2 ml-5 flex'>
                <RiUserSearchLine className='text-2xl mt-1'/>
                <input type="text" onChange={handleFilter} placeholder='search user' className='text-center border border-black rounded-md'/>
                </div>
                <DataTable
                data={appointments}
                columns={columns}
                pagination
                />
            </div>
        </div>
        </div>
    </div>
  )
}

export default PatientAppointments