import {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DentistProfile = () => {
    const { user, error, loading, dispatch } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [number, setNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const id = user?.resp[0]?.id
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.resp && user.resp.length > 0) {
          if (user.resp[0].role === 'user') {
            navigate('/patient-dashboard');
          }
        }else if(!user){
            navigate('/dentist-login')
        }
      }, [user, navigate]);

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:8000/dentist/${id}`)
            const dentist = res.data[0]
            setName(dentist.name)
            setSpecialty(dentist.specialty)
            setNumber(dentist.number)
            setUsername(dentist.username)
        }
        getUser()
    }, [])

    // console.log(id)
    const handleUpdate = async (e) => {
        console.log(name, specialty, number, username)
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8000/dentist/${id}`, {name, specialty, number, username}) //password
            console.log(res.data.message)
            window.location.reload()
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

  return (
    <div className='w-screen'>
        <button><Link to='/dentist-dashboard'>back</Link></button>
    <div className={`bg-white rounded-lg shadow-lg border border-black p-10 h-[500px] mt-10 mx-10 `}>
        <h2 className="text-xl font-bold mb-4">Update Information</h2>
        <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
            Name:
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
            }}
            id="specialty"
            />
        </div>
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="lastname">
            specialty:
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={specialty}
            onChange={(e) => {
                setSpecialty(e.target.value);
            }}
            id="specialty"
            />
        </div>
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="number">
            Number:
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
            <label className="block font-bold mb-2" htmlFor="address">
            Username:
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded opacity-50"
            type="text"
            disabled
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
            }}
            id="username"
            />
        </div>
        {/* <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="birthdate">
            Password:
            </label>
            <input
            className="w-full border border-gray-400 p-2 rounded"
            type="text"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            id="username"
            />
        </div> */}
        <div className="mb-4">
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

export default DentistProfile