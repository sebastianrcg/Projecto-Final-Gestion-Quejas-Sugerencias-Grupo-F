import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

import RootSinAccesso from "./components/root sin acceso/RootSinAcceso"
import Home from "./pages/home/Home"
import Quejas from "./pages/quejas/Quejas"
import Tracking from "./pages/tracking/Tracking"
import Login from "./pages/login/Login"

import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./protectedRoute/ProtectedRoute"


import HomeApp from "./protectedPages/main/HomeApp"
import Usuarios from "./protectedPages/usuarios/Usuarios"
import RegistrarUsuario from "./protectedPages/nuevoUsuario/RegistrarUsuario"
import QuejasRegistradas from "./protectedPages/quejasRegistradas/QuejasRegistradas"
import VerQueja from "./protectedPages/verQueja/VerQueja"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<RootSinAccesso />}>
        <Route index element={<Home />} />
        <Route path="reportarQueja" element={<Quejas />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/app" element={<ProtectedRoute />}>
        <Route index element={<HomeApp />}/>
        <Route path="usuarios" element={<Usuarios />}/>
        <Route path="usuarios/nuevoUsuario" element={<RegistrarUsuario />} />
        <Route path="quejas" element={<QuejasRegistradas />}/>
        <Route path="quejas/:id" element={<VerQueja />} />
 

      </Route>
    </>
  ))

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
