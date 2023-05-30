import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { Registration } from './pages/Registration'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Registration />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
