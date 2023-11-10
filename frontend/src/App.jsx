import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Dashboard />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
  </>
));

function App() {

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
