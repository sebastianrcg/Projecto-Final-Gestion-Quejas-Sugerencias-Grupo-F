import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom" 

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route></Route>
    </>
  ))
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
