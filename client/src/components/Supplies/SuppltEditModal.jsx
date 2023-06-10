import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const SuppltEditModal = ({editMedicine, editQuantity, editName, editModal, setEditQuantity, setEditName, setEditModal}) => {
  const { user } = useContext(AuthContext)
  const role  = user?.resp[0].role
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
                    Supplies
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className='space-y-8'>
                  {
                    role !== 'admin' ? null : 
                <div>
                    <label htmlFor="name">Name: </label>
                    <input required type="text" value={editName} onChange={(e) => {setEditName(e.target.value)}} className='w-full p-2 border border-black rounded focus:outline-none'/>
                </div> 
                  }
                <div>
                    <label htmlFor="quantity">Quantity: </label>
                    <input required type="number" value={editQuantity} onChange={(e) => {setEditQuantity(e.target.value)}}className='w-full p-2 border border-black rounded focus:outline-none'/>
                </div>
            </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" onClick={editMedicine}>
                    EDIT ITEM
                </button>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => setSignInModal(false)} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default SuppltEditModal
