import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  // useEffect(() => {
  //   // Fetch disabled dates from the server
  //   axios
  //     .get('/disabled-dates')
  //     .then((response) => {
  //       setDisabledDates(response.data.disabledDates);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching disabled dates:', error);
  //     });
  // }, []);

  const isDateDisabled = (date) => {
    // Check if the date is present in the disabledDates array
    return disabledDates.some((disabledDate) =>
      isSameDay(disabledDate, date)
    );
  };

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      filterDate={isDateDisabled}
    />
  );
};

export default Calendar;


// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const Calendar = () => {
//     const [selectedDate, setSelectedDate] = useState(null);
  
//     // Function to check if a date should be disabled
//     const isDateEnabled = (date) => {
//         // Define the enabled dates
//         const enabledDates = [
//           new Date(2023, 5, 1), // Example enabled dates
//           new Date(2023, 5, 3),
//         ];
//         // Check if the date is present in the enabledDates array
//         return enabledDates.some((enabledDate) =>
//           isSameDay(enabledDate, date)
//         );
//       };
  
//     // Function to compare two dates and check if they are the same
//     const isSameDay = (date1, date2) =>
//       date1.getDate() === date2.getDate() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getFullYear() === date2.getFullYear();
  
//     return (
// <DatePicker
//   selected={selectedDate}
//   onChange={(date) => setSelectedDate(date)}
//   filterDate={(date) => !isDateEnabled(date)}
// />
//     );
//   };
  
//   export default Calendar;
  