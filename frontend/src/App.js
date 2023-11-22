import React from 'react'
import Login from './Login'
import Home from './Home'
import Students from './Students'
import StudentsDetails from './StudentDetails'
import StudentsAddCert from './StudentAddCert'
import Certificates from './Certificates'
import CreateCertificate from './CreateCertificate'
import EditCertificate from './EditCertificate'
import {Auth0ProviderWithNavigate} from './auth0Provider'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ErorrBoundary from './ErrorBoundary'

function App(){
  return(
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/login' element={
          <Auth0ProviderWithNavigate><ErorrBoundary fallback= "error en /login"><Login/></ErorrBoundary></Auth0ProviderWithNavigate>
        }> </Route>

        <Route path='/home' element={
          <ErorrBoundary fallback = "error en /home"><Auth0ProviderWithNavigate><Home/></Auth0ProviderWithNavigate></ErorrBoundary>
        }></Route>

        <Route path='/students' element={<Students/>}> </Route>
        <Route path='/students/details/:id' element={<StudentsDetails/>}> </Route>
        <Route path='/students/addCert/:id' element={<StudentsAddCert/>}> </Route>
        <Route path='/certificates' element={<Certificates/>}> </Route>
        <Route path='/certificates/create' element={<CreateCertificate/>}> </Route>
        <Route path='/certificates/edit/:id' element={<EditCertificate/>}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App