import React from 'react';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {BsArrowBarLeft} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Blogsite = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const url = 'http://localhost:8000/blogs/' + id;
  const { data } = useFetch(url);
  console.log(data);

  return (
    <div className='px-8 pt-16'>

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
    </div>
  );
};

export default Blogsite;
