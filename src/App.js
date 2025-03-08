import React from 'react'
import {Routes,Route, Navigate,RouterProvider,
  createBrowserRouter,
  createRoutesFromElements} from "react-router-dom"
import Main from './components/Main';
import Map from "./components/Map";
import axios from 'axios';
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element = {<Main/>} loader = {()=>{
          return axios.get("https://soundtrack.herokuapp.com/tracks/get-tracks")
        }
        }/>
        <Route path="/tracks/:trackId" element={ <Map/>}/>
      </Route>
    )
  )
  return (
    <div>
    {/* <Routes>
    <Route path='/' element={<Navigate to="/home"/>}/>
<Route path="/home" element={ <Main/>}/>
<Route path="/tracks/:trackId" element={ <Map/>}/>
    </Routes> */}
   <RouterProvider router={router} />
    </div>
  )
}
