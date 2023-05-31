import React from 'react'
import doc from '../../assets/doktora.png'

export const AboutUs = () => {
  return (
    <div className='flex h-full'>
      <div className='basis-1/2 flex items-end justify-center h-full'>
        <img src={doc} alt="" className='w-56 z-40'/>
        <div className='bg-white p-72 absolute z-0 rounded-full mb-4'></div>
      </div>

      <div className='basis-1/2'>

      </div>
    </div>
  )
}
