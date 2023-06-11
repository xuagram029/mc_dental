import { useContext, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const AppointmentBooking = ({setOpenModal}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const patient_id = user?.resp[0]?.id;
  const patient_firstname = user?.resp[0]?.firstname;
  const patient_lastname = user?.resp[0]?.lastname;
  const patient_mobile = user?.resp[0]?.mobile;
  const patient_fullname = patient_firstname + ' ' + patient_lastname;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [time, setTime] = useState([]);
  const [services, setServices] = useState([])
  const [patient, setPatient] = useState({
    time: '',
    name: patient_fullname,
    number: patient_mobile,
    date: selectedDate,
    service: '',
    id: patient_id,
  });

  useEffect(() => {
    console.log(patient);
  },[patient])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/appointment');
        setAppointments(res.data);
        setTime(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
    getServices()
  }, []);

  const getServices = async () => {
    const res = await axios.get('http://localhost:8000/services')
    setServices(res.data);
  }

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

  const convertToManilaTime = (date) => {
    const manilaTimeZone = 'Asia/Manila';
    const utcDate = zonedTimeToUtc(date, manilaTimeZone);
    const manilaDate = utcToZonedTime(utcDate, manilaTimeZone);
    return manilaDate;
  };
  
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
        window.location.reload(true)
    } catch (error) {
      toast.error(error.response.data.message, {
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
  // console.log(patient);
  
  return (
    <>
    <div
      className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
    >
      <div className="relative w-auto my-6 mx-auto max-w-xl ">
        {/*content*/}
        <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              Book Appointment
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
          <form
      >
        <label htmlFor="dentist">
          <span>Appointment Date:</span>
          <DatePicker
            required
            className='border-2 w-full p-3 rounded-lg border-gray-200'
            selected={convertToManilaTime(selectedDate)}
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
            dateFormat="yyyy-MM-dd"
            timeZone="Asia/Manila" // Add this line to set the time zone
            value={selectedDate && selectedDate.toLocaleDateString('en-PH')}
          />

        </label>

        <label htmlFor="name">
          <span>Your Full Name:</span>
          <input
                disabled
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2"
                placeholder={patient_fullname}
          />
        </label>
        
        <label htmlFor="number">
          <span>Mobile No:</span>
          <input
              name='number'
              disabled
              type="number"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2"
              placeholder={patient_mobile}
            />
        </label>
  
        <label htmlFor="date">
          <span>Desire Time to Schedule:</span>
          <select
                required
                name="time"
                id=""
                onChange={(e) => setPatient({ ...patient, time: e.target.value })}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2'>
                <option value="">--SELECT--</option>
                <option value="9am">9am</option>
                <option value="11am">11am</option>
                <option value="1pm">1pm</option>
                <option value="3pm">3pm</option>
                <option value="5pm">5pm</option>
            </select>
        </label>

        <label htmlFor="service">
          <span>Select a Service</span>
          <select required name="service" id="" onChange={(e) => setPatient({...patient, service: e.target.value})} className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2'>
            <option value="">--SELECT--</option>
            {services.map(service => (
              <option value={service.name}>{service.name}</option>
            ))}
          </select>  
        </label>
  
        
      </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Back
            </button>
            <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Book Appointment
        </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default AppointmentBooking
