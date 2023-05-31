import React from 'react'
import service1 from '../../assets/Services/service1.jpg'
import service2 from '../../assets/Services/service2.jpg'
import service3 from '../../assets/Services/service3.jpg'
import service4 from '../../assets/Services/service4.jpg'
import service5 from '../../assets/Services/service5.jpg'


export const Services = () => {
  return (
    <>
        <div className="lg:pt-24 sm:pt-8 pb-8 text-center">
            <h2 className="text-4xl font-pop font-bold text-primary py-4">Our Services</h2>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-x-4 lg:pb-8 lg:px-4">
            <div className="glassV2 p-4 text-gray-800 rounded-lg shadow-md bg-slate-200">
                <div className="mb-2">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-64 overflow-hidden">
                            <img src={service3} alt="img"
                                className="object-cover object-center w-full h-full" />
                        </div>
                    </div>
                    <p className="mb-2 text-center text-gray-600 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                    </p>
                </div>
            </div>

            <div className="glassV2 p-4 text-gray-800 rounded-lg shadow-md bg-slate-200">
                <div className="mb-2">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-64 overflow-hidden">
                            <img src={service1} alt="img"
                                className="object-cover object-center w-full h-full" />
                        </div>
                    </div>
                    <p className="mb-2 text-center text-gray-600 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                    </p>
                </div>
            </div>
            <div className="glassV2 p-4 text-gray-800 rounded-lg shadow-md bg-slate-200">
                <div className="mb-2">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-64 overflow-hidden">
                            <img src={service2} alt="img"
                                className="object-cover object-center w-full h-full" />
                        </div>
                    </div>
                    <p className="mb-2 text-center text-gray-600 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                    </p>
                </div>
            </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 pb-8 lg:mx-72">
            <div className="glassV2 p-4 text-gray-800 rounded-lg shadow-md bg-slate-200 px-6">
                <div className="mb-2">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-64 overflow-hidden">
                            <img src={service4} alt="img"
                                className="object-cover object-center w-full h-full" />
                        </div>
                    </div>
                    <p className="mb-2 text-center text-gray-600 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                    </p>
                </div>
            </div>
            <div className="glassV2 p-4 text-gray-800 rounded-lg shadow-md bg-slate-200 px-6">
                <div className="mb-2">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-64 overflow-hidden">
                            <img src={service5} alt="img"
                                className="object-cover object-center w-full h-full" />
                        </div>
                    </div>
                    <p className="mb-2 text-center text-gray-600 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}
