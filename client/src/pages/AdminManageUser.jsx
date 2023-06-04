import {useContext, useEffect, useState} from 'react'
import AdminNavbar from '../components/AdminNavbar'
import DataTable from 'react-data-table-component'
import { IoMdAddCircle } from 'react-icons/io';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { RiUserSearchLine } from 'react-icons/ri';
import DentistReg from '../components/DentistReg';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminManageUser = () => {
    const { user } = useContext(AuthContext)
    const[addUserModal, setAddUserModal] = useState(false)
    const[editModal, setEditModal] = useState(false)
    const [dentists, setDentists] = useState([])
    const [filteredDentists, setFilteredDentists] = useState([])
    const [ eId, setEId ] = useState('')
    const [ eName, setEname ] = useState('')
    const [ eSpecialty, setESpecialty ] = useState('')
    const [ eNumber, setENumber ] = useState('')
    const [ eUsername, setEUsername ] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getDentist = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/dentist')
                setDentists(res.data);
                setFilteredDentists(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getDentist()
    }, [])

    useEffect(() => {
      if(!user){
        navigate('/admin-login')
      }else if(user?.resp[0]?.role === 'dentist'){
        navigate('/dentist-dashboard')
      }else if(user?.resp[0]?.role === 'patient'){
        navigate('/patient-dashboard')
      }
    }, [user])

    const toggleEdit = async (id) => {
        setEditModal(!editModal)
        try {
            const res = await axios.get(`http://localhost:8000/admin/dentist/${id}`)
            const dentist = res.data[0]
            setEId(dentist.id)
            setEname(dentist.name)
            setESpecialty(dentist.specialty)
            setENumber(dentist.number)
            setEUsername(dentist.username)
        } catch (error) {
            console.log(error);
        }
    }
    
    const editDentist = async (e) => {
        e.preventDefault()
        try {
          if (!eName || !eSpecialty || !eNumber || !eUsername) {
            alert("Please Enter All Fields")
            return false;
          } else {
            const res = await axios.put(
              `http://localhost:8000/admin/dentist/${eId}`,
              { name: eName, specialty: eSpecialty, number: eNumber, username: eUsername }
            );
            alert(res.data.message);
            window.location.reload(); // <-- Corrected the function invocation
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      const deleteDentist = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/admin/dentist/${id}`)
            console.log(res.data.message);
            window.location.reload(true)
        } catch (error) {
            console.log(error);
        }
      }

    const handleFilter = (e) => {
        const newData = filteredDentists.filter(row =>
          row.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
          row.specialty.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setDentists(newData)
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Speciality",
            selector: row => row.specialty,
            sortable: true
        },
        {
            name: "Contact No.",
            selector: row => row.number
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "Edit",
            cell: row => (
              <button onClick={() => {toggleEdit(row.id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FiEdit3 className='text-white text-base'/>
              </button>
            ),
            button: true
        },
        {
            name: "Delete",
            cell: row => (
                <button onClick={() => {deleteDentist(row.id)}}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <MdOutlineDelete className='text-base'/>
                </button>
            ),
            button: true
        }
    ]

  return (
    <div className=''>
      <AdminNavbar />
      <div className='font-pop font-bold border-2 border-black mx-10 mt-8'>
        <DataTable
            title="Manage Dentists"
            columns={columns}
            data={dentists}
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
                    <div onClick={() => setAddUserModal(true)} className='flex items-center gap-x-4 bg-primary text-white cursor-pointer px-6 py-3 rounded-md hover:bg-second'>
                        <IoMdAddCircle className=' text-white text-xl'/>
                        <span>Add Dentist</span>
                    </div>
                </div>
            }
        />
      </div>
      <ToastContainer />

      {
      editModal &&
      <>
        <div
      className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
    >
      <div className="relative w-auto my-6 mx-auto max-w-4xl ">
        {/*content*/}
        <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              Creating Account for Dentist
            </h3>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
              <form className="mt-6">
                  <div className="mb-2">
                      <label
                          htmlFor="firstname"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Name
                      </label>
                      <input
                          value={eName}
                          onChange={(e) => {setEname(e.target.value)}}
                          name="firstname"
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="specialty"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Specialty
                      </label>
                      <input
                          value={eSpecialty}
                          onChange={(e) => {setESpecialty(e.target.value)}}
                          name="specialty"
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="number"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Contact Number
                      </label>
                      <input
                          value={eNumber}
                          onChange={(e) => {setENumber(e.target.value)}}
                          name="number"
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Username
                      </label>
                      <input
                          value={eUsername}
                          onChange={(e) => {setEUsername(e.target.value)}}
                          name="username"
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  {/* {err && <div className="text-red-600">{err}</div>} */}
                  {/* {error && <div className='text-red-700'>{error}</div>} */}
              </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              onClick={() => {setEditModal(!editModal)}}
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Close
            </button>
            <button onClick={editDentist} 
                      className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                          Update
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    }

      {addUserModal && <DentistReg setAddUserModal={setAddUserModal} addUserModal={addUserModal} />}
    </div>
  )
}

export default AdminManageUser
