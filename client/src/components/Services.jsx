import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import  DataTable  from 'react-data-table-component'
import { IoMdAddCircle } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import SuppltEditModal from './Supplies/SuppltEditModal';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesAddModal from './Services/ServicesAddModal';
import ServicesEditModal from './Services/ServicesEditModal';


const Services = () => {
    const { user } = useContext(AuthContext)
    const [ services, setServices] = useState([])
    const [ filteredServices, setFilteredServices] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editName, setEditName] = useState('')
    const [ serviceId, setServiceId ] = useState('')

    const [ service, setService ] = useState('')

    const role = user?.resp[0]?.role;

    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/services`)
                setServices(res.data)
                setFilteredServices(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getServices()
    }, [])

    const toggleModal = () => {
        setModal(true)
    }

    const toggleEditModal = async (id) => {
        setEditModal(true)
        try {
            const res = await axios.get(`http://localhost:8000/services/${id}`)
            console.log(res.data);
            setEditName(res.data[0].name)
            setServiceId(res.data[0].id)
        } catch (error) {
            console.log(error)
        }
    }

    const addService = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8000/services/`, service)
            toast.success(res.data.message);
            window.location.reload()
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setService(() => ({[e.target.name]: e.target.value}))
    }
    
    const editService = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/services/${serviceId}`, {name: editName})
            toast.success(res.data.message)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteService = async(id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/services/${id}`)
            toast.success(res.data.message);
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
        //     name: 'Service ID',
        //     selector: row => row.id,
        //     sortable: true
        // },
        {
            name: "Service Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Edit",
            cell: row => (
              <button onClick={() => toggleEditModal(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FiEdit3 className='text-white text-base'/>
              </button>
            ),
            button: true
        },
        {
            name: 'Delete',
            cell: row => (
                <button onClick={() => deleteService(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <MdOutlineDelete className='text-base'/>
                </button>
            ),
            button: true
        }
    ]

    const handleFilter = (e) => {
        const newData = filteredServices.filter(row =>
          row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setServices(newData)
      }

  return (
    <div>
        <div className='mx-10 mt-8'>
        <div className="font-pop font-bold flex flex-col w-full items-center justify-center border-2 border-black">
            <DataTable
                title="Clinic Services"
                data={services}
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
                        <div onClick={toggleModal} className='lg:ml-0 lg:order-2 sm:ml-8 flex items-center gap-x-4 bg-primary text-white cursor-pointer px-6 py-3 rounded-md hover:bg-second'>
                         <IoMdAddCircle className=' text-white text-xl'/>
                         <span>Add Service</span>
                     </div> 
                    </div>
                }
            />
        </div>
        </div>

        { modal && <ServicesAddModal modal={modal} setModal={setModal} handleChange={handleChange} addService={addService} />}

        { editModal && <ServicesEditModal editService={editService} setEditModal={setEditModal} editModal={editModal} editName={editName} setEditName={setEditName} addService={addService} />}
    </div>
  )
}

export default Services