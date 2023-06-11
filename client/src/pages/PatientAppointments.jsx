import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import  DataTable  from 'react-data-table-component'
import { RiUserSearchLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';
import { AuthContext } from '../context/AuthContext';


const PatientAppointments = () => {
    const { user } = useContext(AuthContext)
    const [ appointments, setAppointments] = useState([])
    const [ filteredAppointments, setFilteredAppointments] = useState([])
    const [modal, setModal] = useState(false)
    const [remark, setRemark] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if(!user){
        navigate('/login')
      }else if(user?.resp[0]?.role === 'dentist'){
        navigate('/dentist-dashboard')
      }else if(user?.resp[0]?.role === 'admin'){
        navigate('/admin-dashboard')
      }
    }, [user])

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/patient/appointments/${id}`)
                console.log(res.data)
                setAppointments(res.data)
                setFilteredAppointments(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAppointments()
    }, [])

    useEffect(() => {
      if(modal){
        document.body.style.overflow = 'hidden'
      }else{
        document.body.style.overflow = 'visible'
      }
    }, [modal])

    const toggleModal = (remarks) => {
      setModal(true);
      setRemark(remarks)
    };

    const cancelAppointment = async (id) => {
      try {
        const res = await axios.delete(`http://localhost:8000/appointment/cancel/${id}`)
        console.log(res.data.message);
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }

    const customStyles = {
        header: {
          style: {
            fontSize: "1.5rem",
            fontFamily: "Montserrat",
          },
        },
        headCells: {
          style: {
            fontSize: "0.875rem",
            backgroundColor: "#AD8B73",
            color: "#fff",
          },
        },
        cells: {
          style: {
            fontWeight: 600,
          },
        },
      };

    const columns = [
        // {
        //     name: 'Full Name',
        //     selector: row => row.name,
        //     sortable: true
        // },
        {
            name: 'Appointment ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Date",
            selector: row => new Date(row.date).toLocaleDateString("en-US", {dateStyle: "long"}),
            sortable: true
        },
        {
            name: "Time",
            selector: row => row.time,
            sortable: true
        },
        {
            name: "Services",
            selector: row => row.service,
            sortable: true
        },
        {
            name: "Remarks",
            cell: row => (
              <button onClick={() => toggleModal(row.remarks)}
              className='bg-blue-500 text-white rounded-lg py-2 px-4'
              >
                VIEW
              </button>
            ),
            sortable: true
        },
        {
            name: "Action",
            cell: row => (
              row.status === 'pending' ? 
              (<button onClick={() => {cancelAppointment(row.id)}}
              className='bg-red-500 text-white rounded-lg py-2 px-4'>
                cancel
              </button>)
              : null
            ),
            button: true,
        },
    ]

    const handleFilter = (e) => {
        const newData = filteredAppointments.filter(row =>
          row.service.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setAppointments(newData);
      }
      

  return (
    <div className='h-screen w-full'>
        <PatientNavbar />
        <div className='mt-8 mx-10'>
        <div className="font-pop font-bold flex flex-col items-center justify-center border-2 border-black">
            <DataTable
                title="Appointment History"
                data={appointments}
                columns={columns}
                pagination
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="550px"
                subHeader
                subHeaderAlign="left"
                subHeaderComponent = {
                    <div className='flex items-center gap-x-4'>
                        <RiUserSearchLine className='text-2xl text-black'/>
                        <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                    </div>
                    }
            />
        </div>
        </div>
        {modal && (
        <>
          <div className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[rgba(49,49,49,0.8)]">
            <div className="relative w-auto my-6 mx-auto max-w-4xl ">
              {/*content*/}
              <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Remark</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="space-y-8">
                    <div>
                      <label htmlFor="name">Remarks: </label>
                      {/* <input required type="text" value={editName} onChange={(e) => {setEditName(e.target.value)}} className='w-full p-2 border border-black rounded focus:outline-none'/> */}
                      <p>{remark}</p>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PatientAppointments