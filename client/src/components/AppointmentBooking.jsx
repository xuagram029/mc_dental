import { useContext, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

const PatientAppointment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const patient_id = user?.resp[0]?.id;
  const patient_firstname = user?.resp[0]?.firstname;
  const patient_lastname = user?.resp[0]?.lastname;
  const patient_fullname = patient_firstname + ' ' + patient_lastname;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState({
    time: '',
    name: patient_fullname,
    number: '',
    date: selectedDate,
    service: '',
    id: patient_id,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/appointment');
        setAppointments(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const res = await axios.get('http://localhost:8000/appointment/disabled');
        setDisabledDates(res.data.disabledDates);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchDisabledDates();
  }, []);

  useEffect(() => {
    setPatient((prevPatient) => ({ ...prevPatient, date: selectedDate }));
  }, [selectedDate]);

  useEffect(() => {
    const getTimes = async () => {
      try {
        const res = await axios.get('http://localhost:8000/appointment/times');
        setAvailableTimes(res.data.times);
  
        if (appointments && appointments.length > 0) {
          const filteredTimes = availableTimes.filter((time) => {
            const isBooked = appointments.some(
              (appointment) =>
                appointment.date === selectedDate.toISOString().split('T')[0] &&
                appointment.time === time.startTime &&
                appointment.status !== 'pending'
            );
            return !isBooked;
          });
          
  
          setFilteredTimes(filteredTimes);
        } else {
          setFilteredTimes(res.data.times);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTimes();
  }, [selectedDate, appointments, availableTimes]);


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
      toast.success("Your appointment has been set", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  
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
          <span>Appointment Date:</span>
          <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                excludeDates={disabledDates.map((date) => new Date(date))}
                placeholderText="Select a date"
                filterDate={(date) => {
                  const dateString = date.toISOString().split('T')[0];
                  if (disabledDates.includes(dateString)) {
                    return false;
                  }
                  const appointedDates = appointments ? appointments.map((appointment) => appointment.date) : [];
                  return !appointedDates.includes(dateString);
                }}
              />
        </label>

        <label htmlFor="name">
          <span>Your Full Name:</span>
          <input
                disabled
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder={patient_fullname}
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
              required
            />
        </label>
  
        <label htmlFor="date">
          <span>Desire Date to Schedule:</span>
          <select
                name="time"
                id=""
                onChange={(e) => setPatient({ ...patient, time: e.target.value })}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
                <option value="">--SELECT--</option>
                {filteredTimes.length > 0 &&
                filteredTimes.map((time) => {
                  return (
                    <option
                      key={time.id}
                      value={time.startTime}
                    >
                      {time.startTime}
                    </option>
                  );
                })}
              </select>
        </label>

        <label htmlFor="service">
          <span>Select a Service</span>
          <select required name="service" id="" onChange={(e) => setPatient({...patient, service: e.target.value})} className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'>
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
    <ToastContainer />
  </div>
  )
}

export default PatientAppointment