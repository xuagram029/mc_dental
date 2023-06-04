import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import  DataTable  from 'react-data-table-component'
import { IoMdAddCircle } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DentistNavBar from '../components/DentistNavBar';
import SupplyAddModal from '../components/Supplies/SupplyAddModal';
import SuppltEditModal from '../components/Supplies/SuppltEditModal';
import { AuthContext } from '../context/AuthContext';


const Supplies = () => {
    const { user } = useContext(AuthContext)
    const [ supplies, setSupplies] = useState([])
    const [ filteredSupplies, setFilteredSupplies] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editName, setEditName] = useState('')
    const [editQuantity, setEditQuantity] = useState('')
    const [ supplyId, setSupplyId ] = useState('')

    const [ supply, setSupply ] = useState({
        name: "", 
        quantity:""
    })
    const role = user?.resp[0]?.role;

    useEffect(() => {
        const getSupplies = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/supplies`)
                console.log(res.data)
                setSupplies(res.data)
                setFilteredSupplies(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getSupplies()
    }, [])

    const toggleModal = () => {
        setModal(true)
    }

    const toggleEditModal = async (id) => {
        setEditModal(true)
        try {
            const res = await axios.get(`http://localhost:8000/supplies/${id}`)
            setEditName(res.data[0].name)
            setEditQuantity(res.data[0].quantity)
            setSupplyId(res.data[0].id)
        } catch (error) {
            console.log(error)
        }
    }

    const addSupply = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8000/supplies/`, supply)
            console.log(res.data)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setSupply((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    
    const editMedicine = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/supplies/${supplyId}`, {name: editName, quantity:editQuantity})
            console.log(res.data)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMedicine = async(id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/supplies/${id}`)
            console.log(res.data);
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
            name: 'Supply ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Quantity",
            selector: row => row.quantity,
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
        name: "Delete",
        cell: row => (
            <button onClick={() => deleteMedicine(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <MdOutlineDelete className='text-base'/>
            </button>
        ),
        button: true
        }
    ]

    const handleFilter = (e) => {
        const newData = filteredSupplies.filter(row =>
          row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setSupplies(newData)
      }

  return (
    <div>
        <DentistNavBar />
        <div className='mx-10 mt-8'>
        <div className="font-pop font-bold flex flex-col w-full items-center justify-center border-2 border-black">
            <DataTable
                title="Supplies"
                data={supplies}
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
                        { role !== 'admin' ?                         
                         null : <div onClick={toggleModal} className='lg:ml-0 lg:order-2 sm:ml-8 flex items-center gap-x-4 bg-primary text-white cursor-pointer px-6 py-3 rounded-md hover:bg-second'>
                         <IoMdAddCircle className=' text-white text-xl'/>
                         <span>Add Supply</span>
                     </div> }
                    </div>
                }
            />
        </div>
        </div>

        { modal && <SupplyAddModal modal={modal} setModal={setModal} handleChange={handleChange} addSupply={addSupply} />}

        { editModal && <SuppltEditModal editMedicine={editMedicine} setEditModal={setEditModal} editModal={editModal} editQuantity={editQuantity} setEditQuantity={setEditQuantity} editName={editName} setEditName={setEditName} addSupply={addSupply} />}
    </div>
  )
}

export default Supplies