import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/appointment');
        setAppointments(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    // Process appointments data to get counts per month and year
    const countsPerMonthYear = {};
  
    appointments.forEach(appointment => {
      const date = new Date(appointment.date);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
  
      const monthYear = `${month} ${year}`;
  
      if (countsPerMonthYear[monthYear]) {
        countsPerMonthYear[monthYear] += 1;
      } else {
        countsPerMonthYear[monthYear] = 1;
      }
    });

    const monthYearLabels = Object.keys(countsPerMonthYear);
    const monthYearData = monthYearLabels.map(monthYear => countsPerMonthYear[monthYear]);

    // Chart configuration
  const chartConfig = {
    type: 'bar',
    data: {
      labels: monthYearLabels,
      datasets: [
        {
          label: 'Appointments per Month/Year',
          data: monthYearData,
          backgroundColor: '#E3CAA5',
          borderColor: '#CEAB93',
          borderWidth: 4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };

    const chartInstance = new Chart(chartRef.current, chartConfig);

    return () => {
      chartInstance.destroy();
    };
  }, [appointments]);

  return (
    <>
      <AdminNavbar />
      <h1 className='text-center font-pop font-bold text-gray-700 text-3xl my-8'>Logs of Appointments</h1>
      <canvas ref={chartRef} />
    </>
  );
};

export default ChartComponent;
