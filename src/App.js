import React from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import Main from './components/Main';
import Map from "./components/Map";
export default function App() {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Navigate to="/home"/>}/>
<Route path="/home" element={ <Main/>}/>
<Route path="/tracks/:trackId" element={ <Map/>}/>
    </Routes>
   
    </div>
  )
}
