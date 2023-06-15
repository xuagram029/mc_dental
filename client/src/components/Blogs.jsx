import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const Blogs = () => {

    const url = "http://localhost:8000/blogs"
    const { data } = useFetch(url)

  return (
    <div>
      <div className='grid grid-cols-3 gap-4 px-8 py-8'>
      {Array.isArray(data) ? (
        data.map((blog) => (
            <div key={blog.id} className='relative bg-second border-2 max-h-[555px] p-2 rounded-md shadow-2xl group'>
                <Link to={`/blogs/${blog.id}`}>
                <img src={`http://localhost:8000/uploads/${blog.photo_1}`} alt={blog.title} className='w-full h-96 rounded-md group-hover:blur-md'/>
                <span className='absolute scale-0 inset-40 font-pop text-xl font-bold text-white uppercase group-hover:scale-100 transition-all duration-300'>{blog.title}</span>
                </Link>
                <div className='px-4 py-2 text-white'>
                    <h1 className='font-pop font-bold text-2xl group-hover:scale-0 transition-all duration-300'>{blog.title}</h1>
                    <p className='font-pop text-base'>{blog.description.substring(0, 100)} ...</p>
                </div>
            </div>
        ))
        ) : (
        <p>No data available</p>
        )}
      </div>
    </div>
  )
}

export default Blogs
