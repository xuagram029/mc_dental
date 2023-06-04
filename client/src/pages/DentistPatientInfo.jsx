import React from 'react'
import DentistNavBar from '../components/DentistNavBar'
import PatientInfo from '../components/PatientInfo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DentistPatientInfo = () => {
  return (
    <div>
      <DentistNavBar />
      <PatientInfo />
      <ToastContainer />
    </div>
  )
}

export default DentistPatientInfo
