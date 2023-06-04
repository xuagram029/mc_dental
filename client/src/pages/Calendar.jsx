import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import AdminNavbar from '../components/AdminNavbar';

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
      <div className='text-white bg-rose-500 rounded-lg p-2 text-center'>
        <p className='font-bold'>Agenda:</p>
        <p>{eventInfo.event.title}</p>
        <p className='font-bold'>ID:</p>
        <p>{eventInfo.event.id}</p>
      </div>
    );
  };

  return (
    <>
      <AdminNavbar />
    <div className='flex h-screen sm:flex-row'>
      <div className='ml-5 flex-grow'>
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
