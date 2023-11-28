import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import utilsContext from "./context/utilsContext";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path = "/" element={<Layout />}>
    <Route index element={<Dashboard />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
  </Route>
));


function App()
{
  let [user, setUser] = React.useState(null);   //make the user context such that it always takes its value from localStorage.
  const USER_API_URL = "http://localhost:5000/api/users";

  return (
    <utilsContext.Provider value={[USER_API_URL, user, setUser]}>   {/*user: global state*/}
      <div className="container">
        <RouterProvider router={router} />
        <ToastContainer />   {/*react-toastify package*/}
      </div>
    </utilsContext.Provider>
  )
}

export default App
