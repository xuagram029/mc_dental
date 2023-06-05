import {useContext, useState}from 'react'
import mcLogo from '../assets/mcloginlogo.png'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const AdminNavbar = () => {
    const { user, dispatch } = useContext(AuthContext)
    const [navbar, setNavbar] = useState(false);  
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.get('http://localhost:8000/admin/logout')
            dispatch({type: "LOGOUT"})
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <nav className="font-pop w-full bg-second shadow">
    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <a href="javascript:void(0)">
                    <img src={mcLogo} alt="MC Logo" className='w-28' />
                </a>
                <div className="md:hidden">
                    <button
                        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={() => setNavbar(!navbar)}
                    >
                        {navbar ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                    navbar ? "block" : "hidden"
                }`}
            >
                <ul className="font-medium items-center justify-center space-y-8 md:flex md:space-x-10 md:space-y-0">
                    <li className="text-white hover:text-acsent hover:border-b-2">
                        <NavLink to='/admin-dashboard'>Dashboard</NavLink>
                    </li>
                    <li className="text-white hover:text-acsent hover:border-b-2">
                        <NavLink to='/admin-reports'>Reports</NavLink>
                    </li>
                    <li className="text-white hover:text-acsent hover:border-b-2">
                        <NavLink to='/admin-patientinfo'>Patient Info</NavLink>
                    </li>
                    <li className="text-white hover:text-acsent hover:border-b-2">
                        <NavLink to='/admin-patient-records'>Patient Records</NavLink>
                    </li>
                    <li className="text-white hover:text-acsent hover:border-b-2">
                        <NavLink to='/admin-supplies'>Supplies</NavLink>
                    </li>
                    <li className="text-white hover:text-acsent hover:border-b-2">
                        <NavLink to='/admin-manageuser'>Manage Dentist</NavLink>
                    </li>
                </ul>

                <div className="mt-6 space-y-6 lg:hidden md:inline-block">
                    <Link
                        to=''
                        className="lg:px-4 sm:px-0 lg:py-8 lg:text-sm sm:text-normal text-white font-semibold hover:text-rose-300"
                    >
                        Profile
                    </Link>
                    <div
                        onClick={handleLogout}
                        className="cursor-pointer inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Logout
                    </div>
                </div>
            </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
            <NavLink
                to='admin-profile'
                className="px-4 py-2 text-sm text-white font-semibold hover:text-rose-300"
            >
                {/* Hello {name}! */}
            </NavLink>
            <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
            >
                Logout
            </button>
        </div>
    </div>
</nav>
  )
}

export default AdminNavbar
