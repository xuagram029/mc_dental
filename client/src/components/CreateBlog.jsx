import React, { useState } from 'react'
import axios from 'axios'

const CreateBlog = ({setOpenPanel}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [photo1, setPhoto1] = useState('')
  const [photo2, setPhoto2] = useState('')
  const [photo3, setPhoto3] = useState('')
  const [photo4, setPhoto4] = useState('')
  const [photo5, setPhoto5] = useState('')

  const handleFile = (e, fileInput) => {
    const file = e.target.files[0]
    if(fileInput === 'photo1'){
      setPhoto1(file)
    }else if(fileInput === 'photo2'){
      setPhoto2(file)
    }else if(fileInput === 'photo3'){
      setPhoto3(file)
    }else if(fileInput === 'photo4'){
      setPhoto4(file)
    }else if(fileInput === 'photo5'){
      setPhoto5(file)
    }
  }
  console.log(photo1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image1', photo1);
      formData.append('image2', photo2);
      formData.append('image3', photo3);
      formData.append('image4', photo4);
      formData.append('image5', photo5);
  
      const res = await axios.post('http://localhost:8000/blogs', formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
          <div className="font-pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[rgba(49,49,49,0.8)]">
            <div className="relative w-auto my-6 mx-auto max-w-4xl ">
              {/*content*/}
              <div className="max-h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Upload a New Blog</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div>
        <div className='mb-2 flex gap-x-2 items-center'>
          <label htmlFor="title">Title: </label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} className='w-full border-2 p-2 rounded-md'/>
        </div>
        <div className='mb-4 flex gap-x-2 items-center'>
          <label htmlFor="description">Description: </label>
          <textarea name="" id="" cols="10" rows="1"
            onChange={(e) => setDescription(e.target.value)}
            className='w-full border-2 p-2 rounded-md'
          >
          </textarea>
        </div>
        <div className='space-y-4'>
        <div className='mb-2'>
          <label htmlFor="title">Photo1: </label>
          <input type="file" onChange={(e) => handleFile(e, 'photo1')}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="title">Photo2: </label>
          <input type="file" onChange={(e) => handleFile(e, 'photo2')}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="title">Photo3: </label>
          <input type="file" onChange={(e) => handleFile(e, 'photo3')}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="title">Photo4: </label>
          <input type="file" onChange={(e) => handleFile(e, 'photo4')}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="title">Photo5: </label>
          <input type="file" onChange={(e) => handleFile(e, 'photo5')}/>
        </div>
        </div>
      </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenPanel(false)}
                  >
                    Close
                  </button>
                  <button onClick={handleSubmit}
                  className="px-4 py-2 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default CreateBlog