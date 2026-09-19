import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom" 

import RootSinAccesso from "./components/root sin acceso/RootSinAcceso"
import Home from "./pages/home/Home"
import Quejas from "./pages/quejas/Quejas"
import Tracking from "./pages/tracking/Tracking"
import Login from "./pages/login/Login"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<RootSinAccesso />}>
        <Route index element={<Home />}/>
        <Route path="reportarQuejas" element={<Quejas />}/>
        <Route path="tracking" element={<Tracking />}/>
        <Route path="login" element={<Login />}/>

      </Route>
    </>
  ))
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
