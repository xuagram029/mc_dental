import React from 'react'
import DentistNavBar from '../components/DentistNavBar'
import Calendar from '../components/Calendar'

const DentistCalendar = () => {
  return (
    <div>
      <DentistNavBar />
      <h1 className='pt-8 text-center font-pop font-bold text-2xl text-gray-700'>Appoinment Calendar</h1>
      <Calendar />
    </div>
  )
}

export default DentistCalendar
