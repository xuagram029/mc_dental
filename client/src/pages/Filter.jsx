import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Filter = () => {
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
    setPatient((prevPatient) => ({ ...prevPatient, date: selectedDate }));
  }, [selectedDate]);

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

  // console.log(selectedDate);
//   useEffect(() => {
//     console.log(selectedDate.toISOString().split('T')[0]);
//     const getTimes = async () => {
//       try {
//         const date = selectedDate.toISOString().split('T')[0]
//         const res = await axios.get(`http://localhost:8000/appointment/times?date=${date}`);
//         // const res = await axios.get('http://localhost:8000/appointment/times');
//         setAvailableTimes(res.data.times);
  
//         if (appointments && appointments.length > 0) {
//           const filteredTimes = availableTimes.filter((time) => {
//             const isBooked = appointments.some(
//               (appointment) =>
//                 appointment.date === selectedDate.toISOString().split('T')[0] &&
//                 appointment.time === time.startTime &&
//                 appointment.status !== 'pending'
//             );
//             return !isBooked;
//           });
          
  
//           setFilteredTimes(filteredTimes);
//         } else {
//           setFilteredTimes(res.data.times);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getTimes();
//   }, [selectedDate]);
  
  useEffect(() => {
    const getTimes = async() => {
        // console.log(selectedDate);
        const date = selectedDate.toISOString().split('T')[0];
        const res = await axios.get(`http://localhost:8000/appointment/times?date=${date}`)
        setAvailableTimes(res.data);
    }
    getTimes()
  }, [selectedDate])


  const handleChange = (e) => {
    setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...patient,
        date: selectedDate.toISOString().split('T')[0],
        id: patient_id,
      };
      const res = await axios.post('http://localhost:8000/appointment', data);
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {availableTimes.time === '9am' && <div>9am</div>}
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Book Appointment</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat mollitia?
        </p>
        <form action="" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Set your appointment now </p>
          <div>
          <div>
            <label htmlFor="password" className="sr-only">
              Appointment Date
            </label>
            <div className="relative">
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
            </div>
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <input
                disabled
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm opacity-50"
                placeholder={patient_fullname}
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              Phone Number
            </label>
            <div className="relative">
              <input
                name="number"
                onChange={handleChange}
                type="number"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <label htmlFor="time" className="sr-only">
              Select time:
            </label>
            <div className="relative">
              <select
                name="time"
                id=""
                onChange={(e) => setPatient({ ...patient, time: e.target.value })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              >
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
            </div>
          </div>
          <div>
            <label htmlFor="Services" className="sr-only">
              Services
            </label>
            <div className="relative">
              <select
                name="service"
                id=""
                onChange={(e) => setPatient({ ...patient, service: e.target.value })}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              >
                <option hidden>--SELECT--</option>
                <option value="Composite Restoration">Composite Restoration</option>
                <option value="Direct Composite Veeners">Direct Composite Veeners</option>
                <option value="Orthodontic Treatment">Orthodontic Treatment</option>
                <option value="Diastema Closure">Diastema Closure</option>
                <option value="Zirconia Crowns">Zirconia Crowns</option>
              </select>
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
