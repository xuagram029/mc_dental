import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DentistReg = ({setAddUserModal, addUserModal}) => {

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
            window.location.reload(true)
            toast.success("New User Added", {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

      } catch (err) {
          // console.log(err)
          setError(err.response.data.message)
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
  }  
  return (
    <>
          <div
            className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl ">
              {/*content*/}
              <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Creating Account for Dentist
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                            
                        </div>
                    </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setAddUserModal(false)}
                  >
                    Close
                  </button>

                  <button onClick={handleSubmit} className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                                Submit
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => setSignInModal(false)} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default DentistReg
