import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";
import Homelayout from "./layout/Homelayout";
import Home from "./pages/Home"
import Create from "./pages/create";
import Books from "./pages/Books";
import Details from "./pages/details";
import UserAcount from "./pages/UserAcount";
import './App.css'
import './Details.css'
import './Userpage.css'
import { useState } from "react";

function App() {
  const [login ,setlogin] = useState(false)
  const [signup , setsignup] = useState(false)
  const [user,setuser]= useState('')
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Homelayout login={login} setlogin={setlogin} signup={signup} setsignup={setsignup} setuser={setuser} user={user} />} >
          <Route index element={<Home setlogin={setlogin} />} />
          <Route path="/Books" element={<Books user={user}/>} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="/:username" element={<UserAcount user={user}/>} />
      </Route>
    

    )
  )
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
