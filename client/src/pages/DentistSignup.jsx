import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DentistSignup = () => {
    // name, specialty, number, username, password
    const [name, setName] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [number, setNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/dentist', {name, specialty, number, username, password})
            console.log(res.data.message)
            navigate('/dentist-login')
        } catch (err) {
            // console.log(err)
            console.log(err.response.data.message)
            setError(err.response.data.message)
        }
    }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-500 underline uppercase decoration-wavy">
            Sign UP
        </h1>
        <form className="mt-6">
            <div className="mb-2">
                <label
                    htmlFor="firstname"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Name
                </label>
                <input
                    onChange={(e) => {setName(e.target.value)}}
                    name="firstname"
                    type="text"
                    className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="specialty"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Specialty
                </label>
                <input
                    onChange={(e) => {setSpecialty(e.target.value)}}
                    name="specialty"
                    type="text"
                    className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="number"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Contact Number
                </label>
                <input
                    onChange={(e) => {setNumber(e.target.value)}}
                    name="number"
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
                    onChange={(e) => {setUsername(e.target.value)}}
                    name="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Password
                </label>
                <input
                    onChange={(e) => {setPassword(e.target.value)}}
                    name="password"
                    type="password"
                    className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            {/* {err && <div className="text-red-600">{err}</div>} */}
            <div className="mt-6">
                <button onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    Submit
                </button>
            </div>
            {error && <div className='text-red-700'>{error}</div>}
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link 
                to='/dentist-login'
                className="font-medium text-indigo-600 hover:underline"
            >
                Sign in
            </Link>
        </p>
    </div>
</div>
);
}

export default DentistSignup