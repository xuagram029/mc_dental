import React from 'react'

const RegisterUser = () => {

  const label = 'flex flex-col'  

  return (
    <div className='bg-primary lg:h-screen lg:py-6 lg:px-10 sm:p-0'>
        <div className='bg-white lg:h-full rounded-3xl p-4 text-gray-700'>
            <h1 className='font-pop font-bold text-3xl'>Registration Form</h1>
            <form className='flex gap-x-4 item-center flex-wrap lg:justify-center'>
                <div className='flex gap-x-4'>
                    
                        <div className='flex flex-col'>
                        <label className='text-lg font-semibold font-pop flex'>Age:</label>
                            <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none' />
                        </div>

                        <div  className='flex flex-col'>
                            <span className='text-xs font-pop'>First Name:</span>
                            <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none' />
                        </div>

                        <div  className='flex flex-col'>
                            <span className='text-xs font-pop'>Middle Name:</span>
                            <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none' />
                        </div>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Age:</label>
                    <input type="number" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Civil Status:</label>
                    <select name="" id="" className='bg-white p-2 border-2 border-primary rounded focus:outline-none focus:border-2'>
                        <option value="">--Select Civil Status--</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Birthdate:</label>
                    <input type="date" className='bg-white p-2 border-2 border-primary rounded focus:outline-none focus:border-2'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Sex:</label>
                    <select name="" id="" className='bg-white p-2 border-2 border-primary rounded focus:outline-none focus:border-2'>
                        <option value="">--Select Gender--</option>
                        <option value="Single">Male</option>
                        <option value="Married">Female</option>
                    </select>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Religion:</label>
                    <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>
 
                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Nationality:</label>
                    <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Home Address:</label>
                    <input type="text" className='w-[550px] p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Mobile No:</label>
                    <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Occupation:</label>
                    <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Email:</label>
                    <input type="email" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Reffered By:</label>
                    <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>

                <div className='pt-4'>
                    <label className='text-lg font-semibold font-pop flex'>Password:</label>
                    <input type="text" className='p-2 border-b-2 border-primary bg-white focus:outline-none'/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterUser