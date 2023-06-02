import {useEffect, useState} from 'react'
import  DataTable  from 'react-data-table-component'
// import Sidebar from '../components/Sidebar'
import { RiUserSearchLine } from 'react-icons/ri';
// import axios from '../api/axios';
import axios from 'axios';

const PendingAppointments = () => {
    const [count, setCount] = useState(1)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCount(prevCount => {
    //         if (prevCount >= 50) {
    //           clearInterval(interval); // Stop the interval when count reaches 20
    //           return prevCount; // Return the current count without incrementing
    //         } else {
    //           return prevCount + 1; // Increment the count by 1
    //         }
    //       });
    //     }, 200); // Interval in milliseconds (e.g., increment every second)
    
    //     return () => {
    //       clearInterval(interval); // Clear the interval when the component unmounts
    //     };
    //   }, []);
    // const currentDate = new Date(); // Get the current date and time

    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // const day = String(currentDate.getDate()).padStart(2, '0');
    // const hours = String(currentDate.getHours()).padStart(2, '0');
    // const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    // const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // console.log(formattedDate);
    
    const [ appointments, setAppointments] = useState([])
    const [ filteredAppointments, setFilteredAppointments] = useState([])
    useEffect(()=>{
        const getAppointments = async() =>{
          const res = await axios.get('http://localhost:8000/appointment/pending')
        //   setUsers(res.data)
            setAppointments(res.data)
            setFilteredAppointments(res.data)
        }
        getAppointments()
      },[])

    const acceptAppointment = async (id) => {
        // e.preventDefault()
        // window.location.reload()
        const res = await axios.put(`http://localhost:8000/appointment/${id}`)
        console.log(res.data.message)
    }
    const rejectAppointment = async (id) => {
        // e.preventDefault()
        window.location.reload()
        const res = await axios.delete(`http://localhost:8000/appointment/${id}`)
        console.log(res.data.message)
    }
    
    const columns = [
        {
            name: 'Full Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Phone Number',
            selector: row => row.number,
            sortable: true
        },
        {
            name: "Date",
            selector: row => new Date(row.date).toLocaleString(),
            sortable: true
        },
        {
            name: "Agenda",
            selector: row => row.service,
            sortable: true
        },
        {
          name: "Edit",
          cell: row => (
            <button onClick={() => acceptAppointment(row.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ✓
            </button>
          ),
          button: true
        },
        {
          name: "Delete",
          cell: row => (
            <button onClick={() => rejectAppointment(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              X
            </button>
          ),
          button: true
        }
    ]
    
    const handleFilter = (e) => {
        const newData = filteredAppointments.filter(row =>
          row.name.toLowerCase().includes(e.target.value.toLowerCase()) 
        );    
        setAppointments(newData)
      }
      
  return (
    <div className='font-pop font-bold text-black flex items-center justify-center'>
        <div className={`mt-8 mx-10 w-full border-2 border-black`}>
                <DataTable
                title="Pending Appointments"
                data={appointments}
                columns={columns}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="550px"
                subHeader
                subHeaderAlign="left"
                subHeaderComponent={
                    <div className='flex items-center gap-x-4'>
                        <RiUserSearchLine className='text-2xl text-black'/>
                        <input type="text" onChange={handleFilter} placeholder='Search' className='border-b-2 border-black p-1 text-sm font-normal focus:outline-none'/>
                    </div>
                }
                />
            </div>
    </div>
  )
}

export default PendingAppointments