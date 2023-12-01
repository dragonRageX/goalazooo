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
import { loader as requireAuth } from "./pages/Dashboard";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path = "/" element={<Layout />}>
    <Route 
      index 
      element={<Dashboard />}
      loader={requireAuth} 
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>
));


function App()
{
  let [user, setUser] = React.useState((JSON.parse(localStorage.getItem("user"))) || null);   //make the 'user' global context such that it always takes its initial value from localStorage.
  const USER_API_URL = "http://localhost:5000/api/users";
  let [goals, setGoals] = React.useState(null);
  const GOALS_API_URL = "http://localhost:5000/api/goals";

  return (
    <utilsContext.Provider value={[USER_API_URL, user, setUser, goals, setGoals]}>   {/*user: global state*/}
      <div className="container">
        <RouterProvider router={router} />
        <ToastContainer />   {/*react-toastify package*/}
      </div>
    </utilsContext.Provider>
  )
}

export default App
