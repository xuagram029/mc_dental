import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Supplies from '../components/Supplies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSupplies = () => {
  return (
    <div>
      <AdminNavbar />
      <Supplies />
      <ToastContainer />
    </div>
  )
}

export default AdminSupplies
