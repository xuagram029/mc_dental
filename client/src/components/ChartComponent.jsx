import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

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
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
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

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
