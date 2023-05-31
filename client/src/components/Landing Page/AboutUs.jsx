import React from 'react'
import doc from '../../assets/doktora.png'

export const AboutUs = () => {
  return (
    <div className='flex h-full'>
      <div className='lg:basis-1/2 sm:basis-0 flex items-end justify-center h-full'>
        <img src={doc} alt="" className='w-72 z-40'/>
        <div className='lg:bg-white sm:ng-transparent p-72 absolute z-0 rounded-full mb-8'></div>
      </div>

      <div className='lg:basis-1/2 sm:basis-full flex flex-col justify-center items-center lg:pr-16 sm:px-8'>
        <h1 className='lg:text-6xl sm:text-4xl text-white font-pop font-extrabold'>
          Our Clinic Is Designed To Make You Smile Constantly
        </h1>

        <p className='font-lora text-white font-extralight py-8 text-justify'>
          Our Vision Is To Give Our Patients A Dental Experience That Will Foster A Relationship That Lasts A Lifetime And Is Based On Reliability, Competence, High Standards Of Performance, And Great Patient
        </p>

        <p className='font-lora text-white font-extralight pb-8 text-justify'>
          Our Goal Is to Go Above And Beyond Expectations By Giving Our Patients The Best Dental Care Possible While Also Developing Trusthworthy Relationships With Them. We Are Enthusiastic About What We Do And What Our Patients To Have Faith That They Will Get The Greatest Care Available In Dentistry.
        </p>
      </div>
    </div>
  )
}
