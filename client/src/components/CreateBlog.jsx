import React, { useState } from 'react'
import axios from 'axios'

const CreateBlog = () => {
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
    <div>
      <h1>CREATE BLOG</h1>
      <div>
        <div className='mb-2'>
          <label htmlFor="title">Title: </label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="description">description: </label>
          <textarea name="" id="" cols="10" rows="1"
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
        </div>
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
        <div className="mb-2">
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog