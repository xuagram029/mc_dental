import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DentistSignup from './pages/DentistSignup';
import DentistLogin from './pages/DentistLogin';
import DentistDashboard from './pages/DentistDashboard';
import DentistProfile from './pages/DentistProfile';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import PatientPassword from './pages/PatientPassword';
import Login from './pages/Login'
import { Registration } from './pages/Registration'
import Landing from './pages/Landing'
import AppointmentBooking from './pages/AppointmentBooking';
import PendingAppointments from './pages/PendingAppointments';
import PatientAppointments from './pages/PatientAppointments';
import ErrorPage from './pages/ErrorPage';
import Supplies from './pages/Supplies';
import PatientProfile from './pages/PatientProfile';
import PatientList from './pages/PatientList';
import Filter from './pages/Filter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/filter",
    element: <Filter />
  },
  {
    path: "/dentist-signup",
    element: <DentistSignup />,
  },
  {
    path: "/dentist-login",
    element: <DentistLogin />,
  },
  {
    path: "/dentist-dashboard",
    element: <DentistDashboard />,
  },
  {
    path: "/dentist-profile",
    element: <DentistProfile />,
  },
  {
    path: "/patient-login",
    element: <PatientLogin />,
  },
  // client
  {
    path: "/appointments/:id",
    element: <PatientAppointments />,
  },
  {
    path: "/patient-dashboard",
    element: <PatientDashboard />,
  },
  {
    path: "/patient-password",
    element: <PatientPassword />,
  },
  {
    path: "/patient-profile",
    element: <PatientProfile />,
  },
  {
    path: "/patient-list",
    element: <PatientList />,
  },
  // patient
  {
    path: "/appointment-booking",
    element: <AppointmentBooking />,
  },
  // admin side
  {
    path: "/patient-appointments",
    element: <PendingAppointments />,
  },
  {
    path: "/supplies",
    element: <Supplies />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Registration />
  },
  {
    path: '*',
    element: <ErrorPage/>
  }
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
