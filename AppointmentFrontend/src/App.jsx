import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Myappointments from './Pages/Myappointments'
import Appointments from './Pages/Appointments'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='Myappointments/' element={<Myappointments />} />
      <Route path='Appointments/' element={<Appointments />} />
      </Routes>
    </div>
  )
}

export default App
