import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import  DataTable  from 'react-data-table-component'
import { RiUserSearchLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';


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
            selector: row => new Date(row.date).toLocaleDateString("en-US", {dateStyle: "long"}),
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
    <div className='h-screen w-full'>
        <PatientNavbar />
        <div className='mt-8 mx-10'>
        <div className="font-pop font-bold flex flex-col items-center justify-center border-2 border-black">
            <DataTable
                title="Appointment History"
                data={appointments}
                columns={columns}
                pagination
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="550px"
                subHeader
                subHeaderAlign="left"
                subHeaderComponent = {
                    <div className='flex items-center gap-x-4'>
                        <RiUserSearchLine className='text-2xl text-black'/>
                        <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                    </div>
                    }
            />
        </div>
        </div>
    </div>
  )
}

export default PatientAppointments