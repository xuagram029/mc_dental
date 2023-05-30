import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DentistSignup from './pages/DentistSignup';
import DentistLogin from './pages/DentistLogin';
import DentistDashboard from './pages/DentistDashboard';
import DentistProfile from './pages/DentistProfile';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import PatientProfile from './pages/PatientProfile';

const router = createBrowserRouter([
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
  {
    path: "/patient-dashboard",
    element: <PatientDashboard />,
  },
  {
    path: "/patient-profile",
    element: <PatientProfile />,
  },
  // {
  //   path: '*',
  //   element: <ErrorPage/>
  // }
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
