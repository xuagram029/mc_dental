import React from 'react';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Blogsite = () => {
  const { id } = useParams();
  const url = 'http://localhost:8000/blogs/' + id;
  const { data } = useFetch(url);
  console.log(data);

  return (
    <div>
      <h1>Blogsite</h1>
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
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_1}`} alt="Slide 1" />
              <p className="legend">1</p>
            </SwiperSlide>
          )}
          {data[0]?.photo_2 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_2}`} alt="Slide 2" />
              <p className="legend">2</p>
            </SwiperSlide>
          )}
          {data[0]?.photo_3 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_3}`} alt="Slide 3" />
              <p className="legend">3</p>
            </SwiperSlide>
          )}
          {data[0]?.photo_4 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_4}`} alt="Slide 4" />
              <p className="legend">4</p>
            </SwiperSlide>
          )}
          {data[0]?.photo_5 && (
            <SwiperSlide>
              <img src={`http://localhost:8000/uploads/${data[0]?.photo_5}`} alt="Slide 5" />
              <p className="legend">5</p>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default Blogsite;
