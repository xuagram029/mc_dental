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
import PatientAppointments from './pages/PatientAppointments';
import ErrorPage from './pages/ErrorPage';
import SwitchLogin from './pages/SwitchLogin';
import AdminLogin from './pages/AdminLogin';
import AdminManageUser from './pages/AdminManageUser';
import AdminPatientList from './pages/AdminPatientList';
import Message from './components/Message';
import AdminPatientInfo from './pages/AdminPatientInfo';
import AdminDashboard from './pages/AdminDashboard';
import DentistSupplies from './pages/DentistSupplies';
import AdminSupplies from './pages/AdminSupplies';
import DentistPatientInfo from './pages/DentistPatientInfo';
import PatientPassword from './pages/PatientPassword';
import ChartComponent from './components/ChartComponent';
import ClinicServices from './pages/ClinicServices'
import CreateBlog from './components/CreateBlog';
import AppointmentHours from './components/AppointmentHours';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />
  },
  {
    path: "/create-blog",
    element: <CreateBlog />
  },
  {
    path: "/admin-reports",
    element: <ChartComponent />
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
  {
    path: "/dentist-supplies",
    element: <DentistSupplies />
  },
  {
    path: "/dentist-patientinfo",
    element: <DentistPatientInfo />
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
  {
    path: "/patient-password",
    element: <PatientPassword />
  },
  // admin side
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Registration />
  },
  {
    path: "admin-login",
    element: <AdminLogin />
  },
  {
    path: "admin-manageuser",
    element: <AdminManageUser />
  },
  {
    path: "admin-message",
    element: <Message />
  },
  {
    path: "admin-patient-records",
    element: <AdminPatientList />
  },
  {
    path: "admin-patientinfo",
    element: <AdminPatientInfo />
  },
  {
    path: "admin-supplies",
    element: <AdminSupplies />
  },
  {
    path: "clinic-services",
    element: <ClinicServices />
  },
  {
    path: "appointment-hours",
    element: <AppointmentHours />
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