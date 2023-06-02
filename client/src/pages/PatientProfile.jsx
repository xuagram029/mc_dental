import {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PatientNavbar from '../components/PatientNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientProfile = () => {
    const { user, error, loading, dispatch } = useContext(AuthContext)
    // const [name, setName] = useState('')
    // const [specialty, setSpecialty] = useState('')
    // const [number, setNumber] = useState('')
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [storedPass, setStoredPass] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const id = user?.resp[0]?.id
    const navigate = useNavigate()

    useEffect(() => {
        if(user?.resp[0]?.role === 'user'){
            navigate('/patient-profile')
        }else if(user?.resp[0]?.role === 'patient'){
            navigate('/patient-dashboard')
        }
    }, [user, navigate])

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:8000/patient/${id}`)
            const patient = res.data[0]
            // console.log(patient);
            // setPassword(patient.password)
        }
        getUser()
    }, [])

    // console.log(id)
    const handleUpdate = async (e) => {
        console.log(storedPass)
        e.preventDefault()
        try {
            if(newPassword != conPassword){
                console.log("new password and current pass does not match")
            }else{
                const res = await axios.put(`http://localhost:8000/patient/${id}`, {storedPass, password: newPassword}) //password
                console.log(res.data.message)
                window.location.reload()
                toast.success("New Password has been set", {
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
    <div className={`bg-white rounded-lg shadow-lg border border-black p-10 h-[500px] mt-10 mx-10 `}>
        <h2 className="text-xl font-bold mb-4">Update Information</h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
            Current Password
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={storedPass}
            onChange={(e) => {
                setStoredPass(e.target.value);
            }}
            id="specialty"
            />
        </div>

        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
            New Password
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={newPassword}
            onChange={(e) => {
                setNewPassword(e.target.value);
            }}
            id="specialty"
            />
        </div>
        
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
            Confirm Password
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={conPassword}
            onChange={(e) => {
                setConPassword(e.target.value);
            }}
            id="specialty"
            />
        </div>

        </div>
            <button
            className="w-full bg-rose-500 hover:bg-rose-300 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            onClick={handleUpdate}
            >
            Submit
            </button>
    </div>
    <ToastContainer />
</div>
  )
}

export default PatientProfile