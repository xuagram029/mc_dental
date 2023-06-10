import {useContext, useEffect, useState} from 'react'
import AdminNavbar from './AdminNavbar'
import DataTable from 'react-data-table-component'
import { IoMdAddCircle } from 'react-icons/io';
import { FiEdit3 } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { RiUserSearchLine } from 'react-icons/ri';
import DentistReg from './DentistReg';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientInfo = () => {
    const { user } = useContext(AuthContext)
    const[addUserModal, setAddUserModal] = useState(false)
    const[editModal, setEditModal] = useState(false)
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])
    const [ pId, setPId ] = useState('')
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [civil_status, setCivilStatus] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [age, setAge] = useState('');
    const [religion, setReligion] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [referred_by, setReferredBy] = useState('');
    const [username, setUsername] = useState('');
    const [guardian, setGuardian] = useState('');
    const [good_health, setGoodHealth] = useState('');
    const [m_treat, setMTreat] = useState('');
    const [c_treated, setCTreated] = useState('');
    const [illness, setIllness] = useState('');
    const [op_details, setOpDetails] = useState('');
    const [hozpitalized, setHozpitalized] = useState('');
    const [hozpitalized_details, setHozpitalizedDetails] = useState('');
    const [medication, setMedication] = useState('');
    const [meds, setMeds] = useState('');
    const [tobacco, setTobacco] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [allergies, setAllergies] = useState('');
    const [pregnant, setPregnant] = useState('');
    const [nursing, setNursing] = useState('');
    const [birth_control, setBirthControl] = useState('');
    const [b_type, setBType] = useState('');
    const [b_pressure, setBPressure] = useState('');
    const [condition, setCondition] = useState('');
    const [bleeding_time, setBleedingTime] = useState('');
    const [clotting_time, setClottingTime] = useState('');
    const navigate = useNavigate()


    useEffect(() => {
        if(!user){
          navigate('/admin-login')
        }else if(user?.resp[0]?.role === 'patient'){
          navigate('/patient-dashboard')
        }
      }, [user])

    useEffect(() => {
        const getPatients = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/patients')
                setPatients(res.data);
                setFilteredPatients(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPatients()
    }, [])

    const toggleEdit = async (id) => {
        setEditModal(!editModal)
        try {
            const res = await axios.get(`http://localhost:8000/admin/patient/${id}`)
            console.log(firstname, middlename, lastname, gender, civil_status, birthdate, age, religion, nationality, address, mobile, occupation, email, referred_by, username, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time);
            const patient = res.data[0]
            setPId(patient.id)
            setFirstname(patient.firstname)
            setMiddlename(patient.middlename)
            setLastname(patient.lastname)
            setGender(patient.gender)
            setCivilStatus(patient.civil_status)
            setBirthdate(patient.birthdate)
            setAge(patient.age)
            setReligion(patient.religion)
            setNationality(patient.nationality)
            setAddress(patient.address)
            setMobile(patient.mobile)
            setOccupation(patient.occupation)
            setEmail(patient.email)
            setReferredBy(patient.referred_by)
            setUsername(patient.username)
            setGuardian(patient.guardian)
            setGoodHealth(patient.good_health)
            setMTreat(patient.m_treat)
            setCTreated(patient.c_treated)
            setIllness(patient.illness)
            setOpDetails(patient.op_details)
            setHozpitalized(patient.hozpitalized)
            setHozpitalizedDetails(patient.hozpitalized_details)
            setMedication(patient.medication)
            setMeds(patient.meds)
            setTobacco(patient.tobacco)
            setAlcohol(patient.alcohol)
            setAllergies(patient.allergies)
            setPregnant(patient.pregnant)
            setNursing(patient.nursing)
            setBirthControl(patient.birth_control)
            setBType(patient.b_type)
            setBPressure(patient.b_pressure)
            setCondition(patient.condition)
            setBleedingTime(patient.bleeding_time)
            setClottingTime(patient.clotting_time)
        } catch (error) {
            console.log(error);
        }
    }

    const editPatient = async (e) => {
        e.preventDefault()
        console.log(firstname, middlename, lastname, gender, civil_status, birthdate, age, religion, nationality, address, mobile, occupation, email, referred_by, username, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time);
        try {
            const res = await axios.put(
              `http://localhost:8000/admin/patient/${pId}`,
              { firstname, middlename, lastname, gender, civil_status, birthdate, age, religion, nationality, address, mobile, occupation, email, referred_by, username, guardian, good_health, m_treat, c_treated, illness, op_details, hozpitalized, hozpitalized_details, medication, meds, tobacco, alcohol, allergies, pregnant, nursing, birth_control, b_type, b_pressure, condition, bleeding_time, clotting_time}
            );
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            window.location.reload(); // <-- Corrected the function invocation
        } catch (error) {
          console.log(error);
        }
      };
      
    //   const deleteDentist = async (id) => {
    //     try {
    //         const res = await axios.delete(`http://localhost:8000/admin/dentist/${id}`)
    //         console.log(res.data.message);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   }

    const handleFilter = (e) => {
        const newData = filteredPatients.filter(row =>
          row.firstname.toLowerCase().includes(e.target.value.toLowerCase()) || 
          row.lastname.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setPatients(newData)
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "First Name",
            selector: row => row.firstname,
            sortable: true
        },
        {
            name: "Last Name",
            selector: row => row.lastname,
            sortable: true
        },
        {
            name: "Contact No.",
            selector: row => row.mobile
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "Edit",
            cell: row => (
              <button onClick={() => {toggleEdit(row.id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FiEdit3 className='text-white text-base'/>
              </button>
            ),
            button: true
        },
        {
            name: "Delete",
            cell: row => (
                <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <MdOutlineDelete className='text-base'/>
                </button>
            ),
            button: true
        }
    ]

  return (
    <div className=''>
      <div className='font-pop font-bold border-2 border-black mx-10 mt-8'>
        <DataTable
            title="Manage Patients"
            columns={columns}
            data={patients}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="550px"
            subHeader
            subHeaderComponent={
                <div className='flex items-center gap-x-4 w-full justify-between'>
                    <div className='flex items-center gap-x-4'>
                        <RiUserSearchLine className='text-2xl text-black'/>
                        <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                    </div>
                </div>
            }
        />
      </div>

      {
      editModal &&
      <>
        <div
      className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
    >
      <div className="relative w-full my-6 mx-auto ">
        {/*content*/}
        <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              Patient Information
            </h3>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
              <form className="mt-6 flex gap-x-2">
                  <div className='h-full'>
                  <div className="mb-2">
                      <label
                          htmlFor="firstname"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          First Name
                      </label>
                      <input
                          value={firstname}
                          onChange={(e) => {setFirstname(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="middlename"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Middlename
                      </label>
                      <input
                          value={middlename}
                          onChange={(e) => {setMiddlename(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="lastname"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Lastname
                      </label>
                      <input
                          value={lastname}
                          onChange={(e) => {setLastname(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Gender
                      </label>
                      <input
                          value={gender}
                          onChange={(e) => {setGender(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Civil Status
                      </label>
                      <input
                          value={civil_status}
                          onChange={(e) => {setCivilStatus(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Birthday
                      </label>
                      <input
                          value={birthdate}
                          onChange={(e) => {setBirthdate(e.target.value)}}
                          type="date"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  
                  </div>
                  

                 <div>
                 <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Age
                      </label>
                      <input
                          value={age}
                          onChange={(e) => {setAge(e.target.value)}}
                          type="number"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Religion
                      </label>
                      <input
                          value={religion}
                          onChange={(e) => {setReligion(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Nationality
                      </label>
                      <input
                          value={nationality}
                          onChange={(e) => {setNationality(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Address
                      </label>
                      <input
                          value={address}
                          onChange={(e) => {setAddress(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Mobile
                      </label>
                      <input
                          value={mobile}
                          onChange={(e) => {setMobile(e.target.value)}}
                          type="number"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Occupation
                      </label>
                      <input
                          value={occupation}
                          onChange={(e) => {setOccupation(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                 </div>


                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Email
                      </label>
                      <input
                          value={email}
                          onChange={(e) => {setEmail(e.target.value)}}
                          type="email"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Referred By
                      </label>
                      <input
                          value={referred_by}
                          onChange={(e) => {setReferredBy(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Username
                      </label>
                      <input
                          value={username}
                          onChange={(e) => {setUsername(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Guardian
                      </label>
                      <input
                          value={guardian}
                          onChange={(e) => {setGuardian(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Good Health
                      </label>
                      <input
                          value={good_health}
                          onChange={(e) => {setGoodHealth(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Medical Treatment
                      </label>
                      <input
                          value={m_treat}
                          onChange={(e) => {setMTreat(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  </div>
                  
                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Condition Being Treated
                      </label>
                      <input
                          value={c_treated}
                          onChange={(e) => {setCTreated(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Illness
                      </label>
                      <input
                          value={illness}
                          onChange={(e) => {setIllness(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Operations Details
                      </label>
                      <input
                          value={op_details}
                          onChange={(e) => {setOpDetails(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Hospitalized
                      </label>
                      <input
                          value={hozpitalized}
                          onChange={(e) => {setHozpitalized(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Hospitalization Details
                      </label>
                      <input
                          value={hozpitalized_details}
                          onChange={(e) => {setHozpitalizedDetails(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Under Medication
                      </label>
                      <input
                          value={medication}
                          onChange={(e) => {setMedication(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  </div>

                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Medicines
                      </label>
                      <input
                          value={meds}
                          onChange={(e) => {setMeds(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Using Tobacco Products
                      </label>
                      <input
                          value={tobacco}
                          onChange={(e) => {setTobacco(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Using Alcohol or Drugs
                      </label>
                      <input
                          value={alcohol}
                          onChange={(e) => {setAlcohol(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Allergies
                      </label>
                      <input
                          value={allergies}
                          onChange={(e) => {setAllergies(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Pregnant
                      </label>
                      <input
                          value={pregnant}
                          onChange={(e) => {setPregnant(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Nursing
                      </label>
                      <input
                          value={nursing}
                          onChange={(e) => {setNursing(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>    
                  </div>

                  <div>
                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Birth Control
                      </label>
                      <input
                          value={birth_control}
                          onChange={(e) => {setBirthControl(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Blood Type
                      </label>
                      <input
                          value={b_type}
                          onChange={(e) => {setBType(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Blood Pressure
                      </label>
                      <input
                          value={b_pressure}
                          onChange={(e) => {setBPressure(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Condition
                      </label>
                      <input
                          value={condition}
                          onChange={(e) => {setCondition(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Bleeding Time
                      </label>
                      <input
                          value={bleeding_time}
                          onChange={(e) => {setBleedingTime(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>

                  <div className="mb-2">
                      <label
                          htmlFor="address"
                          className="block text-sm font-semibold text-gray-800"
                      >
                          Clotting Time
                      </label>
                      <input
                          value={clotting_time}
                          onChange={(e) => {setClottingTime(e.target.value)}}
                          type="text"
                          className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                  </div>
                  </div>
                  {/* {err && <div className="text-red-600">{err}</div>} */}
                  {/* {error && <div className='text-red-700'>{error}</div>} */}
              </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              onClick={() => {setEditModal(!editModal)}}
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Close
            </button>
            <button 
                      onClick={editPatient}
                      className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                          Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      }

      {addUserModal && <DentistReg setAddUserModal={setAddUserModal} addUserModal={addUserModal} />}
    </div>
  )
}

export default PatientInfo
