import React from 'react'
import Login from './Login'
import Home from './Home'
import Students from './Students'
import StudentsDetails from './StudentDetails'
import StudentsAddCert from './StudentAddCert'
import Certificates from './Certificates'
import CreateCertificate from './CreateCertificate'
import EditCertificate from './EditCertificate'
import { Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import RequireAuth from './RequireAuth'
import Unauthorized from './Unauthorized'


function App(){
  return(

      <Routes>
        <Route path='/' element={<Layout/>}> 
        
          <Route path='login' element={<Login/>}/> 
          <Route path='unauthorized' element={<Unauthorized/>}/> 

          {/*rutas protegidas*/}
          <Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
            <Route path='/' element={<Home/>}/> 
            <Route path='home' element={<Home/>}/> 
            <Route path='students' element={<Students/>}/> 
            <Route path='students/details/:id' element={<StudentsDetails/>}/> 
            <Route path='students/addCert/:id' element={<StudentsAddCert/>}/> 
            <Route path='certificates' element={<Certificates/>}/> 
            <Route path='certificates/create' element={<CreateCertificate/>}/> 
            <Route path='certificates/edit/:id' element={<EditCertificate/>}/> 
          </Route>

        </Route>
      </Routes>
  
  )
}

export default App