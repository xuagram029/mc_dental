import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import Sidebar from '../components/Sidebar'
import { RiUserSearchLine } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import { MdTextsms } from "react-icons/md";
import Message from "./Message";
import { toast } from "react-toastify";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openSMS, setOpenSMS] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState('')
  const [remark, setRemark] = useState('');

  useEffect(() => {
    const getAppointments = async () => {
      const res = await axios.get("http://localhost:8000/appointment/pending");
      setAppointments(res.data);
      setFilteredAppointments(res.data);
    };
    getAppointments();
  }, []);

  useEffect(() => {
    if(modal){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'visible'
    }
  }, [modal])

  const acceptAppointment = async (id) => {
    const res = await axios.put(`http://localhost:8000/appointment/${id}`);
    console.log(res.data.message);
    window.location.reload();
  };
  const rejectAppointment = async (id) => {
    const res = await axios.delete(`http://localhost:8000/appointment/${id}`);
    console.log(res.data.message);
    window.location.reload();
  };

  const toggleModal = (id) => {
    setModal(true);
    setId(id)
  };

  const addRemark = async (e) => {
    try {
      const res = await axios.put(`http://localhost:8000/appointment/pending/${id}`, {remark})
      toast.success(res.data.message)
      console.log(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
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
    {
      name: "Full Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //     name: 'Phone Number',
    //     selector: row => row.number,
    //     sortable: true
    // },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Services",
      selector: (row) => row.service,
      sortable: true,
    },
    {
      name: "Remarks",
      cell: (row) => (
        <button
          onClick={() => toggleModal(row.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <AiFillEye className="text-base"/>
        </button>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => acceptAppointment(row.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ✓
          </button>
          <button
            onClick={() => rejectAppointment(row.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            X
          </button>
        </div>
      ),
      button: true,
    },
  ];

  const handleFilter = (e) => {
    const newData = filteredAppointments.filter(
      (row) =>
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.service.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAppointments(newData);
  };

  return (
    <div className="font-pop font-bold text-black flex items-center justify-center">
      <div
        className={`mt-8 mx-10 w-full border-2 border-black flex flex-col items-center
        justify-center`}
      >
        <DataTable
          title="Pending Appointments"
          data={appointments}
          columns={columns}
          pagination
          customStyles={customStyles}
          fixedHeader
          fixedHeaderScrollHeight="550px"
          subHeader
          subHeaderAlign="left"
          subHeaderComponent={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-4">
                <RiUserSearchLine className="text-2xl text-black" />
                <input
                  type="text"
                  onChange={handleFilter}
                  placeholder="Search"
                  className="border-b-2 border-black p-1 text-sm font-normal focus:outline-none"
                />
              </div>
              <div>
                <button
                  onClick={() => setOpenSMS(true)}
                  className="bg-primary text-white px-6 py-3 rounded-md flex items-center gap-x-2 hover:bg-second"
                >
                  <MdTextsms />
                  SMS
                </button>
              </div>
            </div>
          }
        />
      </div>
      {openSMS && <Message setOpenSMS={setOpenSMS} />}
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
                      <textarea
                        required
                        onChange={(e) => setRemark(e.target.value)}
                        type="text"
                        className="w-full p-2 border border-black rounded focus:outline-none "
                      />
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
                  <button onClick={addRemark}
                  className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    ADD REMARKS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default PendingAppointments;
