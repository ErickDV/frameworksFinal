import React from 'react'
import Login from './Login'
import Home from './Home'
import Students from './Students'
import Certificates from './Certificates'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/home' element={<Home/>}> </Route>
        <Route path='/students' element={<Students/>}> </Route>
        <Route path='/certificates' element={<Certificates/>}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App