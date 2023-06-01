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
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        Book Appointment
      </h1>
  
      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
        dolores deleniti inventore quaerat mollitia?
      </p>
  
      <form
        action=""
        class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
      >
        <p class="text-center text-lg font-medium">Set your appointment now </p>
  
        <div>
          <label for="Dentist" class="sr-only">Select Dentist: </label>
          <div class="relative">
            <select name="dentist" id="" onChange={(e) => setPatient({...patient, dentist: e.target.value})}    
            className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <option value=''>--SELECT--</option>
              <option value="dentist_1">Dentist 1</option>
              <option value="dentist_2">Dentist 2</option>
              <option value="dentist_3">Dentist 3</option>
              <option value="dentist_4">Dentist 4</option>
            </select>  
          </div>
        </div>

        <div>
          <label for="name" class="sr-only">Full Name</label>
          <div class="relative">
            <input
              name='name'
              onChange={handleChange}
              type="text"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Full Name"
            />
          </div>
        </div>

        <div>
          <label for="name" class="sr-only">Phone Number</label>
          <div class="relative">
            <input
              name='number'
              onChange={handleChange}
              type="number"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Phone Number"
            />
          </div>
        </div>
  
        <div>
          <label for="password" class="sr-only">Appointment Date</label>
          <div class="relative">
            <input
              name='date'
              onChange={handleChange}
              type="datetime-local"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            />
          </div>
        </div>

        <div>
          <label for="Services" class="sr-only">Services</label>
          <div class="relative">
            <select name="service" id="" onChange={(e) => setPatient({...patient, service: e.target.value})} className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
              <option hidden>--SELECT--</option>
              <option value="Composite Restoration">Composite Restoration</option>
              <option value="Direct Composite Veeners">Direct Composite Veeners</option>
              <option value="Orthodontic Treatment">Orthodontic Treatment</option>
              <option value="Diastema Closure">Diastema Closure</option>
              <option value="Zirconia Crowns">Zirconia Crowns</option>
            </select>  
          </div>
        </div>
  
        <button
          onClick={handleSubmit}
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Book Appointment
        </button>
      </form>
    </div>
  </div>
  )
}

export default PatientAppointment