import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../admin/Dashboard/Sidebar'
import Login from '../admin/pages/Login';
import RegistrationForm from '../admin/pages/Register';
import Otp from '../admin/pages/Otp';
import Catogorylist from '../admin/Dashboard/Catogorylist';

const Adminroute = () => {
  return (
<Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<RegistrationForm/>}/>
    <Route path='/Otp' element={<Otp/>}/>
    <Route path='/home' element={<Sidebar/>}/>
    <Route path='/category' element={<Catogorylist/>}/>
    <Route path='*' element={<h1>Client 404 Not Found</h1>} />
  </Routes>  )
}

export default Adminroute