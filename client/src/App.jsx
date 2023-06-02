import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DentistSignup from './pages/DentistSignup';
import DentistLogin from './pages/DentistLogin';
import DentistDashboard from './pages/DentistDashboard';
import DentistProfile from './pages/DentistProfile';
import PatientDashboard from './pages/PatientDashboard';
import PatientProfile from './pages/PatientProfile';
import Login from './pages/Login'
import { Registration } from './pages/Registration'
import Landing from './pages/Landing'
import PendingAppointments from './components/PendingAppointments';
import PatientAppointments from './pages/PatientAppointments';
import ErrorPage from './pages/ErrorPage';
import Supplies from './pages/Supplies';
import SwitchLogin from './pages/SwitchLogin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "login-as",
    element: <SwitchLogin />
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
  // patient
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
    path: "/patient-profile",
    element: <PatientProfile />,
  },
  // admin side
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
