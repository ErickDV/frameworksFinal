import React from 'react';
import Login from './Login';
import Home from './Home';
import Students from './Students';
import Certificates from './Certificates';
import CreateCertificate from './CreateCertificate';
import EditCertificate from './EditCertificate';
import ErrorBoundary from './ErrorBoundary';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RequireAuth from 'react-auth-kit';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={
            <ErrorBoundary fallback = "error en /"><Login/></ErrorBoundary>}> 
          </Route>

          <Route path='/login' element={
            <ErrorBoundary fallback = "error en /login"><Login/></ErrorBoundary>}> 
          </Route>

          <Route path='/home' element={
            <RequireAuth loginPath="/login"> <ErrorBoundary fallback = "error en /home"><Home/></ErrorBoundary></RequireAuth>}> 
          </Route>

          <Route path='/students' element={
            <RequireAuth loginPath="/login"><ErrorBoundary fallback = "error en /students"> <Students/></ErrorBoundary></RequireAuth>}>
          </Route>
            
          <Route path='/certificates' element={
            <RequireAuth loginPath="/login"> <ErrorBoundary fallback = "error en /certificates"></ErrorBoundary> <Certificates/></RequireAuth>}>
          </Route>

          <Route path='/certificates/create' element={
            <RequireAuth loginPath="/login"><ErrorBoundary fallback = "error en /certificates/create"></ErrorBoundary><CreateCertificate/></RequireAuth>}> 
          </Route>
          
          <Route path='/certificates/edit/:id' element={
            <RequireAuth loginPath="/login"><ErrorBoundary fallback = "error en /certificates/edit/:id"> </ErrorBoundary><EditCertificate/></RequireAuth>}> 
          </Route>

      </Routes>
    </BrowserRouter>
  )
}

