import React from 'react'
import Login from './Login'
import Home from './Home'
import Students from './Students'
import StudentsDetails from './StudentDetails'
import Certificates from './Certificates'
import CreateCertificate from './CreateCertificate'
import EditCertificate from './EditCertificate'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/home' element={<Home/>}> </Route>
        <Route path='/students' element={<Students/>}> </Route>
        <Route path='/students/details/:id' element={<StudentsDetails/>}> </Route>
        <Route path='/certificates' element={<Certificates/>}> </Route>
        <Route path='/certificates/create' element={<CreateCertificate/>}> </Route>
        <Route path='/certificates/edit/:id' element={<EditCertificate/>}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App