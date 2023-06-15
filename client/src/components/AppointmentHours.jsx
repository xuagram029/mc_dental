import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import  DataTable  from 'react-data-table-component'
import { CgUnavailable } from 'react-icons/cg';
import { RiUserSearchLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { MdEventAvailable } from 'react-icons/md';
import SuppltEditModal from './Supplies/SuppltEditModal';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesAddModal from './Services/ServicesAddModal';
import ServicesEditModal from './Services/ServicesEditModal';
import AdminNavbar from '../components/AdminNavbar'
import HoursEditModal from './Appointment Hours/HoursEditModal';

const AppointmentHours = () => {
    const { user } = useContext(AuthContext)
    const [ hours, setHours] = useState([])
    const [ editTime, setEditTime] = useState([])
    const [ filteredHours, setFilteredHours] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [editName, setEditName] = useState('')
    const [ serviceId, setServiceId ] = useState('')
    const [ service, setService ] = useState('')

    const role = user?.resp[0]?.role;

    useEffect(() => {
        const getHours = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/appointment/times`)
                setHours(res.data)
                setFilteredHours(res.data)
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getHours()
    }, [])

    const makeAvailable = async (id) => {
        try {
            const res = await axios.put(`http://localhost:8000/appointment/times`, {id})
            console.log(res.data.message);
        } catch (error) {
            console.log(error)
        }
    }

    const makeNotAvailable = async (id) => {
        try {
            const res = await axios.put(`http://localhost:8000/appointment/times/${id}`)
            console.log(res.data.message);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setService(() => ({[e.target.name]: e.target.value}))
    }
    
    const editHours = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/services/${serviceId}`, {name: editName})
            toast.success(res.data.message)
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
        {
            name: "Appointment Hours",
            selector: row => row.time,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Action",
            cell: row => (
              <div className="flex">
                  <button onClick={() => makeAvailable(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <MdEventAvailable className='text-white text-base'/>
                  </button>
                  <button onClick={() => makeNotAvailable(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-5">
                    <CgUnavailable className='text-white text-base'/>
                  </button>
              </div>
            ),
            button: true
        },
        // {
        //     name: "Edit",
        //     cell: row => (
        //       <button onClick={() => toggleEditModal(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //         <FiEdit3 className='text-white text-base'/>
        //       </button>
        //     ),
        //     button: true
        // },
    ]

    const handleFilter = (e) => {
        const newData = filteredHours.filter(row =>
          row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setHours(newData)
      }

  return (
    <>
        <AdminNavbar />
        <div>
            <div className='mx-10 mt-8'>
            <div className="font-pop font-bold flex flex-col w-full items-center justify-center border-2 border-black">
                <DataTable
                    title="Clinic Hours"
                    data={hours}
                    columns={columns}
                    pagination
                    customStyles={customStyles}
                    fixedHeader
                    fixedHeaderScrollHeight="550px"
                    subHeader
                    subHeaderComponent={
                        <div className='flex items-center gap-4 w-full lg:justify-between sm:flex-wrap'>
                            <div className='flex items-center gap-x-4 lg:order-1 sm:order-2'>
                                <RiUserSearchLine className='text-2xl text-black'/>
                                <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                            </div>
                        </div>
                    }
                />
            </div>
            </div>

            { editModal && <HoursEditModal editHours={editHours} editTime={editTime} setEditTime={setEditTime} setEditModal={setEditModal} editModal={editModal}/>}
        </div>
    </>
  )
}

export default AppointmentHours