import React, { useEffect, useState } from 'react'
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


const Supplies = () => {
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
                fixedHeader
                fixedHeaderScrollHeight="550px"
                subHeader
                subHeaderComponent={
                    <div className='flex items-center gap-x-4 w-full justify-between'>
                        <div className='flex items-center gap-x-4'>
                            <RiUserSearchLine className='text-2xl text-black'/>
                            <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                        </div>
                        <div onClick={toggleModal} className='flex items-center gap-x-4 bg-primary text-white cursor-pointer px-6 py-3 rounded-md hover:bg-second'>
                            <IoMdAddCircle className=' text-white text-xl'/>
                            <span>Add Supply</span>
                        </div>
                    </div>
                }
            />
        </div>
        </div>

        { modal && <SupplyAddModal modal={modal} setModal={setModal} handleChange={handleChange} addSupply={addSupply} />}

        {
            editModal &&
            <div className='border border-black w-96 h-96 absolute left-[550px] bg-slate-300 '>
                <div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setEditModal(!editModal)}}>X</button>
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" value={editName} onChange={(e) => {setEditName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity: </label>
                    <input type="number" value={editQuantity} onChange={(e) => {setEditQuantity(e.target.value)}}/>
                </div>
                <div>
                    <button className='w-[90%] border border-black py-4 rounded-xl' onClick={editMedicine}>EDIT ITEM</button>
                </div>
            </div>
        }
    </div>
  )
}

export default Supplies