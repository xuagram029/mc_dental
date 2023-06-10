import {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PatientNavbar from '../components/PatientNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientProfile = () => {
    const { user, error, loading, dispatch } = useContext(AuthContext)
    const [firstname, setFirstName] = useState('')
    const [middlename, setMiddleName] = useState('')
    const [lastname, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [email, setEmail] = useState('')
    // const [newPassword, setNewPassword] = useState('')
    // const [conPassword, setConPassword] = useState('')

    const id = user?.resp[0]?.id
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:8000/patient/${id}`)
            const patient = res.data[0]
            console.log(patient);
            setFirstName(patient.firstname)
            setMiddleName(patient.middlename)
            setLastName(patient.lastname)
            setAge(patient.age)
            setNumber(patient.mobile)
            setAddress(patient.address)
            setBirthdate(patient.birthdate)
            setEmail(patient.email)
            // setPassword(patient.password)
        }
        getUser()
    }, [])

    // console.log(id)
    const handleUpdate = async (e) => {
        // console.log(storedPass)
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8000/patient/profile/${id}`, {firstname, middlename, lastname, age, mobile:number, address, birthdate, email}) //password
            toast.success("Profile Info Updated", {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            window.location.reload()
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
    }

  return (
    <div className='w-screen'>
        <PatientNavbar />
    <div className={`bg-white rounded-lg shadow-lg border border-black p-10 h-[600px] mt-10 mx-10 `}>
        <h2 className="text-xl font-bold mb-4">Update Information</h2>
        <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="firstname">
            First Name
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={firstname}
            onChange={(e) => {
                setFirstName(e.target.value);
            }}
            id="firstname"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="middlename">
            Middle Name
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={middlename}
            onChange={(e) => {
                setMiddleName(e.target.value);
            }}
            id="middlename"
            />
        </div>
        
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="lastname">
            Last Name
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={lastname}
            onChange={(e) => {
                setLastName(e.target.value);
            }}
            id="lastname"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="age">
            Age
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="number"
            value={age}
            onChange={(e) => {
                setAge(e.target.value);
            }}
            id="age"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="number">
            Mobile Number
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="number"
            value={number}
            onChange={(e) => {
                setNumber(e.target.value);
            }}
            id="number"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="Address">
            Address
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={address}
            onChange={(e) => {
                setAddress(e.target.value);
            }}
            id="Address"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="birthdate">
            Birthday
            </label>
            <input
            disabled
            className="w-full border border-gray-400 p-2 rounded opacity-50"
            type="date"
            value={birthdate}
            onChange={(e) => {
                setBirthdate(e.target.value);
            }}
            id="birthdate"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="Email">
            Email
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            id="email"
            />
        </div>
        </div>
            <button
            className="w-full bg-rose-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            onClick={handleUpdate}
            >
            Submit
            </button>
    </div>
</div>
  )
}

export default PatientProfile
