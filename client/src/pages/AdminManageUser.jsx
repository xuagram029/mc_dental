import {useState} from 'react'
import AdminNavbar from '../components/AdminNavbar'
import DataTable from 'react-data-table-component'
import { IoMdAddCircle } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import DentistReg from '../components/DentistReg';


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
        selector: row => row.speciality,
        sortable: true
    },
    {
        name: "Contact No.",
        selector: row => row.contact
    },
    {
        name: "Username",
        selector: row => row.username,
        sortable: true
    },
]

const AdminManageUser = () => {

    const[addUserModal, setAddUserModal] = useState(false)

  return (
    <div className=''>
      <AdminNavbar />
      <div className='font-pop font-bold border-2 border-black mx-10 mt-8'>
        <DataTable
            title="Manage User"
            columns={columns}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="550px"
            subHeader
            subHeaderComponent={
                <div className='flex items-center gap-x-4 w-full justify-between'>
                    <div className='flex items-center gap-x-4'>
                        <RiUserSearchLine className='text-2xl text-black'/>
                        <input type="text" placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                    </div>
                    <div onClick={() => setAddUserModal(true)} className='flex items-center gap-x-4 bg-primary text-white cursor-pointer px-6 py-3 rounded-md hover:bg-second'>
                        <IoMdAddCircle className=' text-white text-xl'/>
                        <span>Add User</span>
                    </div>
                </div>
            }
        />
      </div>
      {addUserModal && <DentistReg setAddUserModal={setAddUserModal} addUserModal={addUserModal} />}
    </div>
  )
}

export default AdminManageUser
