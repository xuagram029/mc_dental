import {useEffect, useState} from 'react';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {BsArrowBarLeft} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Blogsite = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const url = 'http://localhost:8000/blogs/' + id;
  const { data } = useFetch(url);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(data ? data[0]?.title : '');
  const [description, setDescription] = useState(data ? data[0]?.description : '');
  // const [photo1, setPhoto1] = useState(data ? data[0]?.photo_1 : '');
  // const [photo2, setPhoto2] = useState(data ? data[0]?.photo_2 : '');
  // const [photo3, setPhoto3] = useState(data ? data[0]?.photo_3 : '');
  // const [photo4, setPhoto4] = useState(data ? data[0]?.photo_4 : '');
  // const [photo5, setPhoto5] = useState(data ? data[0]?.photo_5 : '');
  // const [p1, setP1] = useState('')
  // const [p2, setP2] = useState('')
  // const [p3, setP3] = useState('')
  // const [p4, setP4] = useState('')
  // const [p5, setP5] = useState('')
  // console.log(title);

  useEffect(() => {
    const getBlog = async() => {
      const res = await axios.get(`http://localhost:8000/blogs/${id}`)
      setTitle(res.data[0]?.title)
      setDescription(res.data[0]?.description)
    }
    getBlog()
  }, [])
  
const updateBlog = async (e) => {
  e.preventDefault();
  setShowModal(false);
  try {
    // const formData = new FormData();
    // formData.append('title', title || t);
    // formData.append('description', description || d);
    // if (!photo1) {
    //   formData.append('image1', p1); 
    // } else {
    //   formData.append('image1', photo1);
    // }
    // if (!photo2) {
    //   formData.append('image2', p2); 
    // } else {
    //   formData.append('image2', photo2);
    // }
    // if (!photo3) {
    //   formData.append('image3', p3); 
    // } else {
    //   formData.append('image3', photo3);
    // }
    // if (!photo4) {
    //   formData.append('image4', p4); 
    // } else {
    //   formData.append('image4', photo4);
    // }
    // if (!photo5) {
    //   formData.append('image5', p5); 
    // } else {
    //   formData.append('image5', photo5);
    // }

    const res = await axios.put(`http://localhost:8000/blogs/${id}`, {title, description});
    window.location.reload(true);
    toast.success(res.data.message, {
      position: 'top-center',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  } catch (error) {
    toast.error(error.response.data.message, {
      position: 'top-center',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};

const deleteBlog = async () => {
  try {
    const res = await axios.delete(`http://localhost:8000/blogs/${id}`);
    console.log(res.data.message);
  } catch (error) {
    console.log(error.response.data.message);
  }
}  


  // const handleFile = (e, fileInput) => {
  //   const file = e.target.files[0]
  //   if(fileInput === 'photo1'){
  //     setPhoto1(file)
  //   }else if(fileInput === 'photo2'){
  //     setPhoto2(file)
  //   }else if(fileInput === 'photo3'){
  //     setPhoto3(file)
  //   }else if(fileInput === 'photo4'){
  //     setPhoto4(file)
  //   }else if(fileInput === 'photo5'){
  //     setPhoto5(file)
  //   }
  // }

  return (
    <div className='px-8 pt-16'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-pop font-semibold text-2xl text-gray-700'>Blog Title: {data[0]?.title}</h1>
        <p className='font-pop text-xl text-gray-700'>Description: {data[0]?.description}</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => setShowModal(true)}>
          Edit Blog
        </button>
        <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={deleteBlog}>
          Delete Blog
        </button>
      </div>
     <div onClick={() => navigate(-1)} className='cursor-pointer font-pop flex items-center gap-x-2 text-lg font-semibold text-gray-700 mb-8'>
                <BsArrowBarLeft/> Go Back to Dashboard
        </div>
      <h1 className='font-pop font-bold text-3xl text-gray-700 text-center'>Blogsite</h1>
      <p className='font-pop text-center text-sm pt-2'><i>swipe it to see more</i></p>

     <div className='w-full px-56 py-16'>
     {data && (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides
          loop
          autoplay={{ delay: 5000 }}
        >
          {data[0]?.photo_1 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_1}`} className='w-96 max-w-full mx-auto' alt="Slide 1" />
              <p className="legend text-center p-2 text-white">
                <span className='bg-black p-1 pl-3 rounded-full w-8 inline-flex h-8'>1</span>
              </p>
            </SwiperSlide>
          )}
          {data[0]?.photo_2 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_2}`} alt="Slide 2" className='w-96 max-w-full mx-auto'/>
              <p className="legend text-center p-2 text-white">
                <span className='bg-black p-1 pl-3 rounded-full w-8 inline-flex h-8'>2</span>
              </p>
            </SwiperSlide>
          )}
          {data[0]?.photo_3 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_3}`} alt="Slide 3" className='w-96 max-w-full mx-auto'/>
              <p className="legend text-center p-2 text-white">
                <span className='bg-black p-1 pl-3 rounded-full w-8 inline-flex h-8'>3</span>
              </p>
            </SwiperSlide>
          )}
          {data[0]?.photo_4 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_4}`} alt="Slide 4" className='w-96 max-w-full mx-auto'/>
              <p className="legend text-center p-2 text-white">
                <span className='bg-black p-1 pl-3 rounded-full w-8 inline-flex h-8'>4</span>
              </p>
            </SwiperSlide>
          )}
          {data[0]?.photo_5 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_5}`} alt="Slide 5" className='w-96 max-w-full mx-auto'/>
              <p className="legend text-center p-2 text-white">
                <span className='bg-black p-1 pl-3 rounded-full w-8 inline-flex h-8'>5</span>
              </p>
            </SwiperSlide>
          )}
        </Swiper>
      )}
     </div>
     <div className='flex flex-col justify-center items-center'>
            {data[0]?.title && (
              <h1 className='font-pop font-semibold text-2xl text-gray-700'>Blog Title: {data[0]?.title}</h1>
            )}
            {data[0]?.description && (
             <>
               <p className='font-pop text-xl text-gray-700'>Description:</p>
                <h1 className='font-pop text-base text-gray-700'>{data[0]?.description}</h1>
             </>
            )}
     </div>

     {showModal && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white w-1/2 rounded-lg'>
            <div className='flex justify-between items-center p-4 border-b'>
              <h2 className='text-lg font-semibold'>Edit Blog</h2>
              <button onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                Close
              </button>
            </div>
            <div className='p-4'>
              <form onSubmit={updateBlog}>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Title:</label>
                  <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Enter title'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Description:</label>
                  <textarea
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Enter description'
                  />
                </div>
                {/* <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Photo 1:</label>
                  <input
                    type='file'
                    name='photo1'
                    onChange={(e) => handleFile(e, 'photo1')}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Photo 2:</label>
                  <input
                    type='file'
                    name='photo2'
                    onChange={(e) => handleFile(e, 'photo2')}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Photo 3:</label>
                  <input
                    type='file'
                    name='photo3'
                    onChange={(e) => handleFile(e, 'photo3')}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Photo 4:</label>
                  <input
                    type='file'
                    name='photo4'
                    onChange={(e) => handleFile(e, 'photo4')}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Photo 5:</label>
                  <input
                    type='file'
                    name='photo5'
                    onChange={(e) => handleFile(e, 'photo5')}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div> */}
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogsite;
