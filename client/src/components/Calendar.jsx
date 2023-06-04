import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import AdminNavbar from './AdminNavbar';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/appointment/all');
        console.log(response.data);
        const transformedEvents = response.data.map(event => ({
          id: event.id,
          title: event.service,
          start: new Date(event.date).toISOString(), // Convert the date to the correct format
        }));
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // useEffect(() => {
  //   if(!user){
  //     navigate('/admin-login')
  //   }else if(user?.resp[0]?.role === 'user'){
  //     navigate('/')
  //  }
  // }, [user])

  const eventContent = (eventInfo) => {
    return (
      <div className='font-pop text-white bg-primary rounded-lg p-2 flex flex-col flex-wrap'>
        <p className='font-bold'>Agenda:</p>
        <p className='text-xs'>{eventInfo.event.title}</p>
        <p className='font-bold flex items-center gap-x-2'>ID: <p>{eventInfo.event.id}</p></p>
        
      </div>
    );
  };

  return (
    <>
    <div className='flex h-screen sm:flex-row'>
      <div className='mx-10 mt-8 flex-grow'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventContent={eventContent}
          height='100%'
          aspectRatio={1.5}
          eventClassNames={['appointment-cell']} // Add a custom CSS class for appointment cells
        />
      </div>
    </div>
    </>
  );
};

export default Calendar;
