import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PatientAppointment = () => {
    const { user } = useContext(AuthContext)
    const patient_id = user?.resp[0]?.id

    console.log(user?.resp[0]?.id)

    const [patient, setPatient] = useState({
    dentist: "",
    name: "",
    number: "",
    date: "",
    service: "",
    id:patient_id
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setPatient((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...patient,
        id: patient_id
      };
      const res = await axios.post('http://localhost:8000/appointment', data);
      console.log(res.data.message);
      // navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  

    console.log(patient); 
  return (
  <div class="font-pop mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold text-primary sm:text-3xl">
      Set your appointment now
      </h1>
      <form
        class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
      >
        <label htmlFor="dentist">
          <span>Select a Dentist:</span>
          <select name="dentist" id="" onChange={(e) => setPatient({...patient, dentist: e.target.value})}    
            className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <option value=''>--SELECT--</option>
              <option value="dentist_1">Dentist 1</option>
              <option value="dentist_2">Dentist 2</option>
              <option value="dentist_3">Dentist 3</option>
              <option value="dentist_4">Dentist 4</option>
            </select>
        </label>

        <label htmlFor="name">
          <span>Your Full Name:</span>
          <input
              name='name'
              onChange={handleChange}
              type="text"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Full Name"
            />
        </label>
        
        <label htmlFor="number">
          <span>Mobile No:</span>
          <input
              name='number'
              onChange={handleChange}
              type="number"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Phone Number"
            />
        </label>
  
        <label htmlFor="date">
          <span>Desire Date to Schedule:</span>
          <input
              name='date'
              onChange={handleChange}
              type="datetime-local"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
        </label>

        <label htmlFor="service">
          <span>Select a Service</span>
          <select name="service" id="" onChange={(e) => setPatient({...patient, service: e.target.value})} className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <option hidden>--SELECT--</option>
              <option value="Composite Restoration">Composite Restoration</option>
              <option value="Direct Composite Veeners">Direct Composite Veeners</option>
              <option value="Orthodontic Treatment">Orthodontic Treatment</option>
              <option value="Diastema Closure">Diastema Closure</option>
              <option value="Zirconia Crowns">Zirconia Crowns</option>
            </select>  
        </label>
  
        <button
          onClick={handleSubmit}
          class="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-second"
        >
          Book Appointment
        </button>
      </form>
    </div>
  </div>
  )
}

export default PatientAppointment