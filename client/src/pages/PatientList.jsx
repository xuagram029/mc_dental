import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import  DataTable  from 'react-data-table-component'
import { Link } from 'react-router-dom';
import { RiUserSearchLine } from 'react-icons/ri';
import { GrAddCircle } from 'react-icons/gr';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';

const PatientList = () => {
    const [ patients, setPatients] = useState([])
    const [ filteredPatients, setFilteredPatients] = useState([])
    const [editModal, setEditModal] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        const getPatients = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/patient`)
                console.log(res.data)
                setPatients(res.data)
                setFilteredPatients(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPatients()
    }, [])

    const toggleEditModal = async (id) => {
        setEditModal(true)
        try {
            // const res = await axios.get(`http://localhost:8000/supplies/${id}`)
            // setEditName(res.data[0].name)
            // setEditQuantity(res.data[0].quantity)
            // setSupplyId(res.data[0].id)
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            name: 'Patient ID',
            selector: row => row.id,
        },
        {
            name: "Firstname",
            selector: row => row.firstname,
            sortable: true
        },
        {
            name: "Lastname",
            selector: row => row.lastname,
            sortable: true
        },
        {
            name: "Contact Number",
            selector: row => row.mobile,
            sortable: true
        },
        {
            name: "Edit",
            cell: row => (
                <button onClick={() => toggleEditModal(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <FiEdit3 className='text-white text-base'/>
                </button>
              ),
            sortable: false
        },
    ]

    const handleFilter = (e) => {
        const newData = filteredPatients.filter(row =>
          row.firstname.toLowerCase().includes(e.target.value.toLowerCase()) || row.lastname.toLowerCase().includes(e.target.value.toLowerCase())
        );    
        setPatients(newData);
      }
      

  return (
    <div>
        <div className="flex flex-col md:flex-row">
            <Link to='/patient-dashboard'>Back</Link>
        <div className="flex flex-col w-full md:w-3/4 lg:w-screen">
            <div className="flex ml-8 mt-5 justify-between items-center space-x-6 font-bold font-pop text-base">
                <h1 className="text-4xl">Patients List</h1>
            </div>
            <div className='w-[90vw]'>
                <div className='p-[50px 10%] mt-2 ml-5 flex'>
                <RiUserSearchLine className='text-2xl mt-1'/>
                <input type="text" onChange={handleFilter} placeholder='search user' className='text-center border border-black rounded-md'/>
                </div>
                <DataTable
                data={patients}
                columns={columns}
                pagination
                />
            </div>
        </div>
        </div>

        {
            editModal &&
            <div className='border border-black w-96 h-96 absolute left-[550px] bg-slate-300 '>
                <div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setEditModal(!editModal)}}>X</button>
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    {/* <input type="text" value={editName} onChange={(e) => {setEditName(e.target.value)}}/> */}
                </div>
                <div>
                    <label htmlFor="quantity">Quantity: </label>
                    {/* <input type="number" value={editQuantity} onChange={(e) => {setEditQuantity(e.target.value)}}/> */}
                </div>
                <div>
                    <button className='w-[90%] border border-black py-4 rounded-xl'>UPDATE PATIENT</button>
                </div>
            </div>
        }
    </div>
  )
}

export default PatientList