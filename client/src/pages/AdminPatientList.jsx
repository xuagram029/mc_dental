import {useContext, useEffect,} from 'react'
import AdminNavbar from '../components/AdminNavbar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PatientRecords from '../components/PatientRecords';

const AdminPatientList = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
      if(!user){
        navigate('/admin-login')
      }else if(user?.resp[0]?.role === 'dentist'){
        navigate('/dentist-dashboard')
      }else if(user?.resp[0]?.role === 'patient'){
        navigate('/patient-dashboard')
      }
    }, [user])

    
      
  return (
    <>
        <AdminNavbar />
        <PatientRecords />
    </>
  )
}

export default AdminPatientList