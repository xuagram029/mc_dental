import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import  DataTable  from 'react-data-table-component'
import { RiUserSearchLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';
import { AuthContext } from '../context/AuthContext';


const PatientAppointments = () => {
    const { user } = useContext(AuthContext)
    const [ appointments, setAppointments] = useState([])
    const [ filteredAppointments, setFilteredAppointments] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if(!user){
        navigate('/login')
      }else if(user?.resp[0]?.role === 'dentist'){
        navigate('/dentist-dashboard')
      }else if(user?.resp[0]?.role === 'admin'){
        navigate('/admin-dashboard')
      }
    }, [user])

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

    const cancelAppointment = async (id) => {
      try {
        const res = await axios.delete(`http://localhost:8000/appointment/cancel/${id}`)
        console.log(res.data.message);
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }

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
            name: 'Appointment ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Date",
            selector: row => new Date(row.date).toLocaleDateString("en-US", {dateStyle: "long"}),
            sortable: true
        },
        {
            name: "Time",
            selector: row => row.time,
            sortable: true
        },
        {
            name: "Services",
            selector: row => row.service,
            sortable: true
        },
        {
            name: "Action",
            cell: row => (
              row.status === 'pending' ? 
              (<button onClick={() => {cancelAppointment(row.id)}}
              className='bg-red-500 rounded-lg py-2 px-4'>
                cancel
              </button>)
              : null
            ),
            button: true,
        },
    ]

    const handleFilter = (e) => {
        const newData = filteredAppointments.filter(row =>
          row.service.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setAppointments(newData);
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